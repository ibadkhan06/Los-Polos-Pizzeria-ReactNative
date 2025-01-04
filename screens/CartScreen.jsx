import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import CartItemCard from '../components/CartItemCard';
import { Ionicons } from '@expo/vector-icons'; // For empty cart icon

const CartScreen= ({navigation}) => {
  const cartItems = useSelector(state => state.cart.cart);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  console.log( useSelector(state=> state.orderTracker.status) );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#fff" />
          <Text style={styles.emptyMessage}>Your cart is empty</Text>
          <Text style={styles.emptySubMessage}>Add some items to your cart to get started!</Text>
        </View>
      ) : (
        <View style={styles.cartContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Render cart items */}
            {cartItems.map(item => (
              <CartItemCard key={item.uniqueKey} item={item} />
            ))}
          </ScrollView>

          {/* Display total price and Proceed to Checkout Button */}
          <View style={styles.footerContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total charge Rs: {totalPrice.toFixed(2)}</Text>
            </View>

            <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#111',
    paddingBottom: 70,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 15,
    marginTop: 30,
  },
  emptyMessage: {
    color: '#fff',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
  },
  emptySubMessage: {
    color: '#bbb',
    fontSize: 16,
    marginTop: 10,
  },
  cartContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 200, // Ensures there's enough padding at the bottom of scrollable content
  },
  footerContainer: {
    paddingVertical: 15,
    backgroundColor: '#222',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    marginTop: 'auto', // Ensures footer is pinned to the bottom
  },
  totalContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  totalText: {
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
