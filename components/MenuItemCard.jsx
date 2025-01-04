import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon library


const MenuItemCard = ({ item, getModalvalue, getSelectedItem}) => {
  //console.log(item); 
  const {name, description, price, image } = item;


  const handleCardClick = () => {
    // console.log(`Item: ${item.name}, Category: ${category}`);
    // // Navigate to the appropriate screen with item.id as a parameter
    // navigation.navigate('BuildOrder', { itemId: item.id, category: category });
    getModalvalue(true)
    getSelectedItem(item)
  };
  
  return (
    <View style={styles.card}>
      {/* Image placeholder */}
      <Image source={{ uri: image }} style={styles.foodImage} />
      <View style={styles.cardContent}>
        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.foodDescription}>{description}</Text>
        <Text style={styles.foodPrice}>Rs: {price}</Text>
        <TouchableOpacity 
        style={styles.addToCartButton}
        onPress={handleCardClick}
        >
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#222', // Dark background for contrast
    borderRadius: 15,         // Rounded corners for a soft look
    marginBottom: 20,
    flexDirection: 'row',
    padding: 15,
    elevation: 8,            // Shadow for a floating effect
    marginHorizontal: 10,
    transform: [{ scale: 1 }],
    transition: 'transform 0.3s ease-in-out',
  },
  foodImage: {
    width: 120,
    height: 120,
    borderRadius: 15,        // Rounded corners for the image
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#FF6347',  // Border around the image for contrast
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  foodName: {
    color: '#FF6347',           // Bright color for food name to stand out
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  foodDescription: {
    color: '#aaa',              // Soft color for description
    fontSize: 14,
    marginVertical: 5,
    lineHeight: 18,
  },
  foodPrice: {
    color: '#fff',              // White for price
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  addToCartButton: {
    backgroundColor: '#FF6347',  // Vibrant button color to grab attention
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,            // Rounded button edges for a modern look
    alignSelf: 'flex-start',
    marginTop: 10,
    elevation: 5,               // Button shadow for a floating effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',              // White text for button
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MenuItemCard;
