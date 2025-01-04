import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet,Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetOrderStatus } from '../features/cart/orderTrackingSlice';
import { emptyCart } from '../features/cart/cartSlice';

const OrderStatusModal = ({ visible, onClose, orderStatus }) => {
    const order = useSelector(state=> state.orderTracker)
    const dispatch = useDispatch()
    console.log("InModal status"+orderStatus)
    const closeModalwithStateReset=()=>{
        console.log(`OrderInRedux: ${order}`)
        onClose()
        dispatch(resetOrderStatus())
        dispatch(emptyCart())
    }
    const handleSupportRedirect = () => {
      const phoneNumber = '+923212474392'; // Your team number
      const message = encodeURIComponent(`Hello, I need assistance with regarding My order ID->${order.orderId}`); // Pre-filled message
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  
      Linking.openURL(whatsappUrl).catch(err => 
          console.error('Failed to open WhatsApp:', err)
      );
    };
    const SuccessAlert = () => (
        <View style={styles.alertContainer}>
            <Text style={styles.title}> Order Completed! 🎉</Text>
            <View style={styles.animationContainer}>
                <LottieView
                    source={require('../assets/eatingAnimation.json')} // Replace with your Lottie JSON file
                    autoPlay
                    loop
                    style={styles.lottieAnimation}
                />
            </View>
            <Text style={styles.enjoyMealText}>🎉 Bon appétit! Don't forget to drop some love with your feedback before you head out! 🍽️✨</Text>
        </View>
    );

    const FailureAlert = () => (
        <View style={styles.alertContainer}>
            <Text style={styles.title}> Order Cancelled  ⚠️</Text>
            <View style={styles.animationContainer}>
                <LottieView
                    source={require('../assets/sorryAnimation.json')} // Replace with your Lottie JSON file
                    autoPlay
                    loop
                    style={styles.lottieAnimation}
                />
            </View>
            <Text style={styles.enjoyMealText}>Oops! Your order has been canceled. For queries Contact our Customer support team😊</Text>
            <TouchableOpacity onPress={handleSupportRedirect} style={styles.supportButton}>
                <Text style={styles.supportButtonText}>Contact Support</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackdrop}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModalwithStateReset}>
                        <Text style={styles.closeButtonText}>❌</Text>
                    </TouchableOpacity>
                    {orderStatus === 'completed' ? <SuccessAlert /> : orderStatus === 'cancelled' ? <FailureAlert /> : null}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: '85%',
        height: '75%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5, // Adds shadow for Android
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        backgroundColor: 'oreange',
        borderRadius: 20,
    },
    closeButtonText: {
        fontSize: 20,
        color: 'white',
    },
    alertContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
        fontFamily: 'Arial', // Optional: Make it sleeker
    },
    enjoyMealText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#444',
        marginTop: 20,
        fontFamily: 'Arial', // Optional: Make it sleeker
    },
    subText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
    },
    animationContainer: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    lottieAnimation: {
        width: '100%',
        height: '100%',
    },
    supportButton: {
        backgroundColor: '#0066cc',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 20,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    supportButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default OrderStatusModal;
