import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.header}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} // Replace with your logo file path
          style={styles.logo}
        />
      </View>

      {/* Header Title */}
      <Text style={styles.headerText}>LosPolosPizzeria</Text>

      {/* Placeholder for future icon or additional elements */}
      <View style={styles.rightIconContainer}>
        {/* Add any icon or action button if needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#FF6347', // Elegant, modern background color
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1, // A more subtle bottom border for refinement
    borderBottomColor: 'rgba(0,0,0,0.1)', // Light border for a clean look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // Floating shadow effect
    borderRadius: 8, // Very subtle curve for the header
  },
  logoContainer: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8, // Subtle rounded corners for the logo container
    elevation: 6, // Light shadow to add depth to the logo
  },
  logo: {
    width: 35, // Reduced height for a slightly shorter logo
    height: 35,
    borderRadius: 8, // Smooth round edges
  },
  headerText: {
    color: '#fff', // Clean white text color for modern feel
    fontSize: 24,
    fontWeight: '600', // Lighter weight for elegance
    textAlign: 'center',
    letterSpacing: 1.5, // Increased letter spacing for refinement
    marginLeft: 15, // Added margin between the logo and the title for balance
  },
  rightIconContainer: {
    width: 40, // Space for any future icon or buttons
    height: 40,
  },
});

export default Header;
