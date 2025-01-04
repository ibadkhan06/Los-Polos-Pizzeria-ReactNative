import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useOrderFeedbackContext } from '../context/OrderFeedbackContext'
import { formatDate } from '../utils/formatDate';

// this componet is used in feedback functionality
const PlacedOrderItemCard = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false); // State to toggle extra details
  const { setIsModal, setOrderID } = useOrderFeedbackContext(); // Context to manage modal state

  const toggleDetails = () => setShowDetails((prevState) => !prevState); // Toggle function
  


  return (
    <View style={styles.cardContainer}>
      <View style={styles.orderHeader}>
        <Icon name="shopping-bag" size={20} color="#4F8EF7" style={styles.icon} />
        <Text style={styles.orderIdText}>OrderID: {data.order_id}</Text>
      </View>

      <View style={styles.itemsContainer}>
        {data.items.map((item, idx) => (
          <View key={idx} style={styles.itemDetails}>
            <TouchableOpacity onPress={toggleDetails} style={styles.toggleDetailsButton}>
              <Icon name="chevron-down" size={16} color="#4F8EF7" style={styles.icon} />
              <Text style={styles.itemNameText}>{item.name}</Text>
            </TouchableOpacity>
            {showDetails && (
              <View style={styles.extraDetails}>
                {Object.entries(item).map(([key, value], subIdx) => (
                  key !== 'name' && value ? (
                    <View key={subIdx} style={styles.detailRow}>
                      <Icon name="info-circle" size={14} color="#4F8EF7" style={styles.icon} />
                      <Text style={styles.itemText}>{`${key}: ${value}`}</Text>
                    </View>
                  ) : null
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      <Text style={styles.totalAmountText}>Total: ${data.totalAmount.toFixed(2)}</Text>
      <Text style={styles.createdAtText}>createdAt: {formatDate(data.date)}</Text>
      <Text style={[
        styles.statusText,
        {
          color: data.status === 'completed'
            ? 'green'
            : data.status === 'pending'
            ? 'orange'
            : data.status === 'cancelled'
            ? 'red'
            : '#333', // Default color if status doesn't match
        },
      ]}>
        Status: {data.status}
      </Text>
      
      {data.feedback ? <View style={{paddingTop:10}}><Text style={styles.itemText}>Feedback: {data.feedback}</Text></View>: null}
      
      

      {data.status === 'completed' && !data.feedback && (
        <TouchableOpacity
          style={styles.rateReviewButton}
          onPress={() => {
            setIsModal(true);
            setOrderID(data.order_id);
          }}
        >
          <Text style={styles.buttonText}>Rate & Review</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    width: '100%',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderIdText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginLeft: 8,
  },
  createdAtText:{
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  icon: {
    marginRight: 8,
  },
  itemsContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  itemDetails: {
    marginBottom: 16,
  },
  itemNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  toggleDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  extraDetails: {
    marginLeft: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemText: {
    fontSize: 14,
    color: '#fff',
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  rateReviewButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default PlacedOrderItemCard;
