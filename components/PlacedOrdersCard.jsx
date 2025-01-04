import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { doc, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig'; 
import { Alert } from 'react-native'; 

// TODO: if paymnet method NULL then PICKUP
const PlacedOrdersCard = ({ forTab, order }) => {

  const [dropdowns, setDropdowns] = useState({}); // Track dropdowns for each order

  const handleOrderCancel = async () => {
    try {
      // Show confirmation dialog using Alert in React Native
      Alert.alert(
        "Confirm Cancellation", // Title
        "Are you sure you want to cancel this order?", // Message
        [
          {
            text: "Cancel", // Button text for cancelling
            onPress: () => console.log("Order cancellation cancelled"), // Action on pressing Cancel
            style: "cancel",
          },
          {
            text: "OK", // Button text for confirming
            onPress: async () => {
              // Firestore logic for updating the order status
              const orderRef = doc(FIRESTORE_DB, 'orders', order.id); // Correct Firestore reference using order.id
              await updateDoc(orderRef, {
                status: 'cancelled', // Update the status to 'cancelled'
              });
              console.log('Order status updated to cancelled');
            },
          },
        ],
        { cancelable: false } // Prevent dismissing the alert by tapping outside
      );
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const handleOrderCompleted = async () => {
    try {
      // Show confirmation dialog using Alert in React Native
      Alert.alert(
        "Confirm Completion", // Title
        "Are you sure you want to mark this order as completed?", // Message
        [
          {
            text: "Cancel", // Button text for cancelling
            onPress: () => console.log("Order completion cancelled"), // Action on pressing Cancel
            style: "cancel",
          },
          {
            text: "OK", // Button text for confirming
            onPress: async () => {
              // Firestore logic for updating the order status
              const orderRef = doc(FIRESTORE_DB, 'orders', order.id); // Correct Firestore reference using order.id
              await updateDoc(orderRef, {
                status: 'completed', // Update the status to 'completed'
              });
              console.log('Order status updated to completed');
            },
          },
        ],
        { cancelable: false } // Prevent dismissing the alert by tapping outside
      );
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };


  const handleDropdownToggle = (orderId) => {
    setDropdowns((prev) => ({
      ...prev,
      [orderId]: !prev[orderId], // Toggle dropdown visibility for each order
    }));
  };

  const MapOrdersItem = (item) => {
    const keys = Object.keys(item); // ["name", "quantity", "size", "stuffed"]
    return (
      <View style={styles.listContainer}>
        <View style={styles.startLine} /> 
        {keys.map((key) => (
          <View key={key} style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.keyText}>{key}: </Text> 
              <Text style={styles.valueText}>{item[key]}</Text> 
            </Text>
          </View>
        ))}
        <View style={styles.endLine} /> 
      </View>
    );
  };

  const PendingOrderCard = () => {
    return (
      <View style={styles.card}>
        <View style={styles.details}>
          <Text style={styles.Id}>OrderId: {order.id}</Text> 
          <Text style={styles.text}>Customer: {order.userName}</Text>
          <Text style={styles.price}>Rs: {order.totalAmount.toFixed(2)}</Text>
          <Text style={styles.text}>Phone#: {order.delivery_address.phone_no}</Text>
          {order.payment_method ? 
          <Text style={styles.text}>Payment Mode: {order.payment_method}</Text>
          :
          <Text style={styles.text}>Order Type: Pickup </Text>
          }
          <TouchableOpacity onPress={() => openGoogleMaps(order.delivery_address.latitude, order.delivery_address.longitude)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' ,marginLeft:1,marginBottom:4,marginTop:2}}>
              <Icon name="map-marker-alt" size={20} color="white" />
              <Text style={ { marginLeft: 5,color: '#bbb' }}>
              Delivery Address: {order.delivery_address.area} {order.delivery_address.apartment_no}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>Order Time: {order.date}</Text>
          <Text style={[
            styles.status,
            order.status === 'pending' 
            ? { color: 'yellow' }
            : { color: 'gray'} 
          ]
          }>
            Status: {order.status}
          </Text>
          
          <Pressable
            style={styles.pressable}
            onPress={() => handleDropdownToggle(order.id)}
          >
            <Icon name="chevron-down" size={20} color="black" /> {/* Icon for dropdown toggle */}
          </Pressable>
          {dropdowns[order.id] && order.items.map(MapOrdersItem)} {/* Show items if dropdown is toggled */}
          

          <View style={styles.container}>
            <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelBtn} onPress={handleOrderCancel}>
                <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Cancel</Text>
                <Icon name="times" size={16} color="white" />
                </View>
            </Pressable>


            <Pressable style={styles.completeBtn} onPress={handleOrderCompleted}>
                <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Complete</Text>
                <Icon name="check" size={16} color="white" />
                </View>
            </Pressable>
            </View>
        </View>
        </View>
      </View>
    );
  };

  // redirect to google map
  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('Error opening Google Maps', err));
  };

  const OtherOrderCard = () => {
    return (
        <View style={styles.card}>
          <View style={styles.details}>
          <Text style={styles.Id}>OrderId: {order.id}</Text> 
          <Text style={styles.text}>Customer: {order.userName}</Text>
          <Text style={styles.price}>Rs: {order.totalAmount.toFixed(2)}</Text>
          <Text style={styles.text}>Phone#: {order.delivery_address.phone_no}</Text>
          {order.payment_method ? 
          <Text style={styles.text}>Payment Mode: {order.payment_method}</Text>
          :
          <Text style={styles.text}>Order Type: Pickup </Text>
          }
          <TouchableOpacity onPress={() => openGoogleMaps(order.delivery_address.latitude, order.delivery_address.longitude)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' ,marginLeft:1,marginBottom:4,marginTop:2}}>
              <Icon name="map-marker-alt" size={20} color="white" />
              <Text style={ { marginLeft: 5,color: '#bbb' }}>
              Delivery Address: {order.delivery_address.area} {order.delivery_address.apartment_no}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>Order Time: {order.date}</Text>
            <Text
            style={[
                styles.status, 
                order.status === 'completed' 
                ? { color: 'green' } 
                : order.status === 'cancelled' 
                ? { color: 'red' } 
                : { color: 'gray' } 
            ]}
            >
            Status: {order.status}
            </Text>
            
            <Pressable
              style={styles.pressable}
              onPress={() => handleDropdownToggle(order.id)}
            >
              <Icon name="chevron-down" size={20} color="black" /> 
            </Pressable>
            {dropdowns[order.id] && order.items.map(MapOrdersItem)} 
          </View>
        </View>
      );
  };

  return (
    <View>
      {forTab === 'pending' ? PendingOrderCard() : OtherOrderCard()}
    </View>
  );
};

export default PlacedOrdersCard;


const styles = {
    container: {
      flex: 1,
      backgroundColor: '#2b2b2b', // Dark background for a sleek modern look
      paddingHorizontal: 15,
      paddingTop: 30, // More top padding
    },
    card: {
      backgroundColor: '#2b2b2b', // Slightly darker card background for a modern feel
      padding: 15, // Reduced padding to make the card more compact
      marginBottom: 18, // Space between cards
      borderRadius: 10, // More subtle rounded corners
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 0.5,
      borderColor: '#333', // Light border for better definition
    },
    details: {
      marginBottom: 12, // Adjusted spacing between details
    },
    Id: {
      fontSize: 18,
      fontWeight: '600', // Slightly lighter weight for a more modern feel
      color: '#fff', 
      marginBottom: 5,
    },
    text: {
      fontSize: 14,
      color: '#bbb', // Subtle gray for text
      marginBottom: 4,
    },
    price: {
      fontSize: 15,
      fontWeight: '500',
      color: '#f8c10c',
      marginBottom: 8,
    },
    Address: {
      fontSize: 13,
      color: '#777', // Lighter color for address
      marginBottom: 6,
    },
    status: {
      fontSize: 14,
      fontWeight: '500',
      color: '#f8c10c',
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      marginVertical: 10,
    },
    cancelBtn: {
      backgroundColor: '#e74c3c', // Red background for cancel button
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%', // To make it fit with the complete button
    },
    completeBtn: {
      backgroundColor: '#27ae60', // Green background for complete button
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%', // To make it fit with the cancel button
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 14,
      marginRight: 8,
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
        paddingHorizontal: 2,
        marginBottom: 10,
        backgroundColor: '#f8c10c', // Gold color to make it stand out
        borderRadius: 6,
        justifyContent: 'center',
        width: 'auto', // Allowing it to be as wide as the content
        maxWidth: 50, // Maximum width for the button (you can adjust the number to fit your needs)
    },
    listContainer: {
        backgroundColor: '#2c2c2c', // Dark background for the item container
        padding: 15,
        marginBottom: 15, // Space between items
        borderRadius: 10, // Rounded corners
        borderWidth: 1,
        borderColor: '#444', // Light border to separate items
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        },
    startLine: {
        height: 2,
        backgroundColor: '#f8c10c', // Orange color for the starting line
        marginBottom: 10,
    },
    endLine: {
        height: 2,
        backgroundColor: '#f8c10c', // Orange color for the ending line
        marginTop: 10,
    },
    listItem: {
        marginBottom: 10, // Space between each item
    },
    listText: {
        fontSize: 16,
        color: 'black', // Light gray color for text
    },
    keyText: {
        fontWeight: 'bold', // Bold for the key
        color: 'orange', // Yellow color for the key
    },
    valueText: {
        color: '#fff', // White color for the value
    },
};
  
