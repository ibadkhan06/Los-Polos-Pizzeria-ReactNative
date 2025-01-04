import { View, Text, TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
const PaymentCard = ({selectedPaymentOption,getSelectedPaymentOption}) => {
  return (
    <View style={styles.card}>
        <View style={styles.row}>
        <Icon name="card-outline" size={20} color="#FF6347" />
        <Text style={styles.cardTitle}>Payment Option</Text>
        </View>
        <View style={styles.paymentOptionsContainer}>
        <TouchableOpacity
            style={[styles.optionButton, selectedPaymentOption === 'cash' && styles.selectedOption]}
            onPress={() => getSelectedPaymentOption('cash')}
        >
            <Icon name="cash-outline" size={20} color="#333" />
            <Text style={styles.optionText}>Cash on Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.optionButton, selectedPaymentOption === 'card' && styles.selectedOption]}
            onPress={() => getSelectedPaymentOption('card')}
        >
            <Icon name="card" size={20} color="#333" />
            <Text style={styles.optionText}>Card on Delivery</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    card: {
    backgroundColor: '#333', // Dark gray background for cards
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    },
    row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    },
    optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#444', // Dark gray background for option buttons
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    },
    optionText: {
    color: '#eee', // Light gray text for options
    marginLeft: 8,
    },
    selectedOption: {
    backgroundColor: '#FF6347', // Highlight option with theme color
    },
    paymentOptionsContainer: {
    marginTop: 10,
    },
})
export default PaymentCard