import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const OrderSummaryCard = () => {
    const cart = useSelector(state => state.cart.cart)
    const totalPrice = useSelector(state => state.cart.totalPrice)

    const renderBillingSummaryItems = () => {
        return cart.map(
            (cartItem) => (
                <View key={cartItem.uniqueKey} style={styles.summaryItemRow}>
                    <Text style={styles.summaryItemName}>{cartItem.name}</Text>
                    <Text style={styles.summaryItemQuantity}>x{cartItem.quantity}</Text>
                    <Text style={styles.summaryItemPrice}>Rs: {(cartItem.quantity * cartItem.price).toFixed(2)}</Text>
                </View>
            ))
    }

    return (
        <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Item</Text>
                <Text style={styles.tableHeaderText}>Quantity</Text>
                <Text style={styles.tableHeaderText}>Price</Text>
            </View>
            {cart.length > 0 ? renderBillingSummaryItems() : null}
            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>{totalPrice ? `Rs: ${totalPrice.toFixed(2)}` : "Rs: 0"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    summaryContainer: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#2c2c2c', // Dark background for the summary card
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff', // White for title
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#444',
        paddingBottom: 10,
        marginBottom: 10,
    },
    tableHeaderText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        width: '30%', // Ensure each column has enough space
        textAlign: 'left',
    },
    summaryItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    summaryItemName: {
        fontSize: 16,
        color: '#fff',
        width: '40%', // Set item name column width
    },
    summaryItemQuantity: {
        fontSize: 16,
        color: '#bbb',
        width: '30%', // Set quantity column width
        textAlign: 'center',
    },
    summaryItemPrice: {
        fontSize: 16,
        color: '#FF6347', // Accent color for price
        fontWeight: '700',
        width: '30%', // Set price column width
        textAlign: 'right',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 2,
        borderTopColor: '#444',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FF6347', // Use accent color for total price
    },
})

export default OrderSummaryCard;
