import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../features/userauthSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH,FIRESTORE_DB } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

// add the loading functionality to the button
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Handle login function
  const handleLogin = async () => {

    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {

      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userRef = doc(FIRESTORE_DB, "users", user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Dispatch the user data (including isAdmin, name, etc.) to Redux
        dispatch(login({
          user: {
            id: user.uid,
            name: userData.name,
            email: userData.email,
            isAdmin: userData.isAdmin || false,
          },
        }));
        console.log('User Admin Status:', userData.isAdmin);

      } else {
        Alert.alert("Error", "User data not found in Firestore");
        // dispatch(setLoading(false));
      }
    } catch (error) {
      console.error(error);

      // Handle specific Firebase Authentication errors
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Login Failed', 'The email address is not valid.');
      } else if (error.code === 'auth/user-disabled') {
        Alert.alert('Login Failed', 'This user account has been disabled.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Login Failed', 'No user found with this email address.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Login Failed', 'Incorrect password. Please try again.');
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert('Login Failed', 'Network error. Please check your internet connection.');
      } else {
        Alert.alert('Login Failed', 'An unknown error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? 
      <ActivityIndicator color="blue"/>
      :
      <>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>
      </>
      }
      

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "black",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    color: "white",
  },
  input: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#4B4B4B",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    fontSize: 16,
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: 16,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#666",
  },
  link: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "600",
  },
});

export default LoginScreen;
