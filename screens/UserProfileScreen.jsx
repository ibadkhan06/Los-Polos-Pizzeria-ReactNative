import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have installed vector-icons
import { useDispatch, useSelector } from "react-redux";

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const [profilePicture, setprofilePicture] = useState(null)
  const [reload,setReload] = useState(true);
  const user= useSelector(state=>state.user.user.user)

  useEffect(()=>{
    const FetchUserProfilePicture = async ()=>{
      const picture = await AsyncStorage.getItem(`profilePicture${user.id}`)
      //console.log(picture)
      if(picture){
        setprofilePicture(picture)
      }
    }
    FetchUserProfilePicture()
  },[reload])


  // Handle functions (replace with actual implementations)
  const handleEditProfilePress = () => { navigation.navigate("ViewProfile"); };
  const handleMyOrdersPress = () => { navigation.navigate("MyOrders"); };
  const handleContactUsPress = () => { navigation.navigate("ContactUs"); };
  const handleLogoutPress = () => { navigation.navigate("LogoutUser"); };
  const handleProfilePicturePress = () => { navigation.navigate("Camera",{setReload}); };

  return (
      <View style={styles.container}>
        {/* User Image Icon with Camera Icon */}
        <View style={styles.profileImageContainer}>
          <Pressable onPress={handleProfilePicturePress} style={styles.cameraButton}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            ) : (
              <Icon name="user-circle" size={120} color="#FF6347" />
            )}
          </Pressable>
        </View>
  
        {/* Edit Profile */}
        <TouchableOpacity onPress={handleEditProfilePress} style={styles.button}>
          <View style={styles.buttonContent}>
            <Icon name="edit" size={20} color="#fff" />
            <Text style={styles.buttonText}>View Profile</Text>
          </View>
        </TouchableOpacity>
  
        {/* My Orders */}
        <TouchableOpacity onPress={handleMyOrdersPress} style={styles.button}>
          <View style={styles.buttonContent}>
            <Icon name="shopping-cart" size={20} color="#fff" />
            <Text style={styles.buttonText}>My Orders</Text>
          </View>
        </TouchableOpacity>
  
        {/* Contact Us */}
        <TouchableOpacity onPress={handleContactUsPress} style={styles.button}>
          <View style={styles.buttonContent}>
            <Icon name="phone" size={20} color="#fff" />
            <Text style={styles.buttonText}>Contact Us</Text>
          </View>
        </TouchableOpacity>
  
        {/* Logout */}
        <TouchableOpacity onPress={handleLogoutPress} style={styles.logoutButton}>
          <View style={styles.buttonContent}>
            <Icon name="sign-out" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#FF6347',
    borderRadius: 15,
    padding: 8,
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

export default UserProfileScreen;