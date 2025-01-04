import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Image, Alert,ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userauthSlice"; // Redux slice
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Ensure you have installed vector-icons
import AsyncStorage from '@react-native-async-storage/async-storage';
const AdminProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState(null);
  const [reload, setReload] = useState(true);
  const user= useSelector(state=>state.user.user.user)
 

  const logoutUser = async () => {
    try {
      console.log('logged out');
      // Firebase logout
      await signOut(FIREBASE_AUTH);

      // Dispatch logout action to Redux
      dispatch(logout());

      Alert.alert("Logged out", "You have successfully logged out.");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };
  useEffect(()=>{

    const FetchUserProfilePicture = async ()=>{
      const picture = await AsyncStorage.getItem(`profilePicture${user.id}`)
      if(picture){
        setProfilePicture(picture)
      }
    }

    FetchUserProfilePicture()
  },[reload])

  const handleProfilePicturePress = () => {
    navigation.navigate("Camera",{setReload});
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Image Icon with Camera Icon */}
      <View style={styles.profileImageContainer}>
        <Pressable onPress={handleProfilePicturePress} style={styles.cameraButton}>
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={styles.profileImage}
            />
          ) : (
            <Icon name="user-circle" size={120} color="#FF6347" />
          )}
        </Pressable>
      </View>



      {/* View All Users */}
      <TouchableOpacity onPress={() => navigation.navigate("ViewAllUsers")} style={styles.button}>
        <View style={styles.buttonContent}>
          <Icon name="list" size={20} color="#fff" />
          <Text style={styles.buttonText}>View All Users</Text>
        </View>
      </TouchableOpacity>

      {/* View All Users */}
      <TouchableOpacity onPress={() => navigation.navigate("FeedbacksScreen ")} style={styles.button}>
        <View style={styles.buttonContent}>
          <Icon name="comment" size={20} color="#fff" />
          <Text style={styles.buttonText}>View User Feedbacks</Text>
        </View>
      </TouchableOpacity>

      {/* Manage Orders */}
      <TouchableOpacity onPress={() => navigation.navigate("Orders")} style={styles.button}>
        <View style={styles.buttonContent}>
          <Icon name="shopping-cart" size={20} color="#fff" />
          <Text style={styles.buttonText}>Manage Orders</Text>
        </View>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity onPress={logoutUser} style={styles.logoutButton}>
        <View style={styles.buttonContent}>
          <Icon name="sign-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#1a1a1a', // Darker sleek background
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF6347',
    resizeMode: 'cover',
  },
  cameraButton: {
    position: 'relative',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 16,
    marginBottom: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4, // Subtle shadow for depth
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 16,
    marginTop: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '600',
  },
});

export default AdminProfileScreen;
