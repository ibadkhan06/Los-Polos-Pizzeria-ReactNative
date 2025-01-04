import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icon use
import GoBackBtn from '../components/GoBackBtn';

const ContactUsScreen = () => {
  // Social media links
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't open URL", err));
  };

  return (
    <View style={styles.container}>
      {/* Inline GoBack button with text */}
      <View style={styles.header}>
        <GoBackBtn />
        <Text style={styles.headerText}>Contact Us</Text>
      </View>
  
      <View style={styles.contactInfo}>
        <View style={styles.contactRow}>
          <Icon name='envelope' size={20} color="white" style={styles.contactIcon} />
          <Text style={styles.contactLabel}>Email:</Text>
        </View>
        <Text style={styles.contactValue}>losPolosPizzeria@gmail.com</Text>
      </View>

      <View style={styles.contactInfo}>
        <View style={styles.contactRow}>
          <Icon name='phone' size={20} color="white" style={styles.contactIcon} />
          <Text style={styles.contactLabel}>Phone:</Text>
        </View>
        <Text style={styles.contactValue}>(+92) 310-1234567</Text>
      </View>

      <View style={styles.contactInfo}>
        <View style={styles.contactRow}>
          <Icon name='map-marker' size={20} color="white" style={styles.contactIcon} />
          <Text style={styles.contactLabel}>Address:</Text>
        </View>
        <Text style={styles.contactValue}>Pizzeria Bella, Plot No. 24, Block 5, Clifton, Karachi, Sindh, Pakistan</Text>
      </View>
  
      <View style={styles.socialMediaContainer}>
        <Text style={styles.socialMediaText}>Follow Us On:</Text>
  
        <TouchableOpacity onPress={() => openLink('https://www.facebook.com/yourpage')} style={styles.socialMediaLink}>
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png' }} style={styles.socialIcon} />
          <Text style={styles.socialMediaText}>Facebook</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => openLink('https://www.instagram.com/bella_italia_pizzeria/')} style={styles.socialMediaLink}>
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png' }} style={styles.socialIcon} />
          <Text style={styles.socialMediaText}>Instagram</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => openLink('https://twitter.com/yourpage')} style={styles.socialMediaLink}>
          <Icon name="twitter" size={30} color="#1DA1F2" style={styles.socialIcon} />
          <Text style={styles.socialMediaText}>Twitter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#111', // Dark background for a sleek look
  },
  header: {
    flexDirection: 'row', // Align GoBack button and text horizontally
    alignItems: 'center',
    marginBottom: 35,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white', // Add a splash of color for contrast
    marginLeft: 12, // Space between the button and the text
  },
  contactInfo: {
    marginVertical: 15,
  },
  contactRow: {
    flexDirection: 'row',  // Align icon and text in a row
    alignItems: 'center',  // Vertically center the items
    marginBottom: 5,  // Add some spacing between the icon/text and the value
  },
  contactIcon: {
    marginRight: 10,  // Space between the icon and the label
  },
  contactLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  contactValue: {
    fontSize: 16,
    color: '#f2f2f2',
    marginTop: 5,
  },
  socialMediaContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  socialMediaText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  socialMediaLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingVertical: 8,
    borderRadius: 5,
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  button: {
    backgroundColor: '#FF6347', // Bold color for action buttons
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ContactUsScreen;
