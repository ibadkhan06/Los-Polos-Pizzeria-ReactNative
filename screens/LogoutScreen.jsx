import React from "react";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { logout } from "../features/userauthSlice"; // Redux slice
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig"; // Import your Firebase config

const LogoutScreen = async () => {
  const dispatch = useDispatch();
    try {
      // Firebase logout
      await signOut(FIREBASE_AUTH);

      // Dispatch logout action to Redux
      dispatch(logout());

    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }

};

export default LogoutScreen;
