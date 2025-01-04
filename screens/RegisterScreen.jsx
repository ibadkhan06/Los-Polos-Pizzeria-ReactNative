import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert, StyleSheet, Image, Platform } from "react-native";
import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
import { login } from '../features/userauthSlice'
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { 
  createUserWithEmailAndPassword 
  
} from "firebase/auth";

import { doc, setDoc, Timestamp } from "firebase/firestore";


// Configure WebBrowser
// WebBrowser.maybeCompleteAuthSession();

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);


  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   webClientId: '1024529639763-dtjndg231hlsb9hpmf4jl8fvr8jvca2s.apps.googleusercontent.com',
  //   redirectUri: 'https://auth.expo.io/@ibad69/mobproject',
  //   scopes: ['profile', 'email']
  // });

  // Validate Inputs
  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter an email address");
      return false;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return false;
    }
    return true;
  };

  // Handle Email Registration
  const handleRegister = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH, 
        email.trim(), 
        password
      );
      
      const userRef = doc(FIRESTORE_DB, "users", userCredential.user.uid);
      const userData = {
        name: name.trim(),
        email: email.trim(),
        isAdmin: email.trim().endsWith("@admin.com"),
        createdAt: Timestamp.fromDate(new Date()),
        lastLogin: Timestamp.fromDate(new Date()),
      };

      await setDoc(userRef, userData);
      
      dispatch(login({
        user: {
          id: userCredential.user.uid,
          name: name.trim(),
          email: email.trim(),
          isAdmin:userData.isAdmin
        },
      }));
      
      Alert.alert("Success", "Registration successful!");
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In
  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await promptAsync();
  //     if (result.type === 'success') {
  //       const { authentication } = result;
  //       const credential = GoogleAuthProvider.credential(
  //         authentication?.idToken,
  //         authentication?.accessToken
  //       );
        
  //       const userCredential = await signInWithCredential(FIREBASE_AUTH, credential);
        
  //       const userData = {
  //         name: userCredential.user.displayName || name,
  //         email: userCredential.user.email || email,
  //         createdAt: Timestamp.fromDate(new Date()),
  //         lastLogin: Timestamp.fromDate(new Date())
  //       };

  //       await setDoc(
  //         doc(FIRESTORE_DB, 'users', userCredential.user.uid), 
  //         userData
  //       );
  //       dispatch(login({
  //         user: {
  //           id: userCredential.user.uid,
  //           name: name.trim(),
  //           email: email.trim(),
  //         },
  //       }));
        
  //       Alert.alert('Success', 'Google Sign-In Successful');
  //     }
  //   } catch (error) {
  //     console.error('Google Sign-In Error:', error);
  //     Alert.alert('Error', 'Google Sign-In Failed');
  //   }
  // };

  // Handle Firebase Errors
  const handleFirebaseError = (error) => {
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert("Error", "This email is already registered.");
          break;
        case 'auth/invalid-email':
          Alert.alert("Error", "Please enter a valid email address.");
          break;
        case 'auth/weak-password':
          Alert.alert("Error", "Password is too weak.");
          break;
        default:
          Alert.alert("Error", "Registration failed. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#fff"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

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

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Registering..." : "Register"}
        </Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* <TouchableOpacity 
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
      >
        <Image 
          source={require('../assets/google-icon.png')} 
          style={styles.googleIcon} 
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity> */}

<View style={styles.footer}>
  <Text style={styles.footerText}>
    Already have an account?{" "}
  </Text>
  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
    <Text style={styles.link}>Login here</Text>
  </TouchableOpacity>
</View>
    </View>
  );
};

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
    color: "#fff",
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
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e1e1e1",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#999",
  },
  googleButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row", // Arrange items in a row
    alignItems: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  link: {
    color: "#007BFF",
    fontWeight: "600",
  },
});

export default Register;




// The promptAsync() function returns a result with a type property, 
// which indicates whether the sign-in was successful ('success') or canceled ('cancel'). If the type is 'success', 
// it means the sign-in succeeded, and the result contains an authentication object with idToken and accessToken. 
// These tokens are used to create a Firebase credential with GoogleAuthProvider.credential(). 
// Then, signInWithCredential() signs the user into Firebase using this credential, returning a userCredential object with user information.