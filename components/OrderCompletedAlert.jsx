import React, { useEffect } from 'react';
import { Alert, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const OrderCompletedAlert = () => {
  useEffect(()=>{
    Alert.alert(
        '🎉 Order Completed! 🎉',
        'Thank you for your patience. Your order has been completed and is on its way. Enjoy your meal!',
        [
          { text: 'Track Order', onPress: () => console.log('Track Order Pressed') },
          { text: 'OK', style: 'cancel', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: true } // Dismiss with touch outside or back button
    );
  },[]) 


  return (
    <></>
  );
};


export default OrderCompletedAlert;
