import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import PlacedOrderItemCard from '../components/PlacedOrderItemCard';
import FeedbackModal from '../components/FeedbackModal';
import { useOrderFeedbackContext } from '../context/OrderFeedbackContext';
import GoBackBtn from '../components/GoBackBtn';
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';
import { ActivityIndicator } from 'react-native-paper';
const MyOrdersScreen = () => {
  const { isModal, orderID } = useOrderFeedbackContext();
  const user = useSelector((state)=> state.user.user.user) // nice work Ibad extra encapsulation
  const [Orders, setOrders] = useState([]);
  const [loading,setLoading] = useState(true); 
  const [reload,setReload] = useState(false); 
    
  useEffect(() => {
    const fetchOrders = async () => {
      const userId = user.id; 
      const ordersCollection = collection(FIRESTORE_DB, 'orders');
      const ordersQuery = query(
        ordersCollection,
        where('user_id', '==', userId),
        where('status', 'in', ['completed', 'cancelled'])
      );

      try {
        const querySnapshot = await getDocs(ordersQuery);
        const orders = querySnapshot.docs.map((doc)=> { return {... doc.data(), "order_id": doc.id} } );
        console.log(orders);
        const sortedOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders); // Update the state with fetched orders, then sort by date in descending order (most recent first)


      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
      finally{
        // Stop the loading indicator
         setLoading(false);
      }
    };

    if (user.id) {
      fetchOrders();
    }
  }, [reload]);

  const renderOrders = () => {
    return (
      <FlatList
        data={Orders}
        renderItem={({ item }) => <PlacedOrderItemCard data={item} />}
        keyExtractor={(item) => item.order_id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBackBtn />
        <Text style={styles.headerText}>Past Orders</Text>
      </View>

      {loading ? <ActivityIndicator size={50} color='white' style={{flex:1}}/>:renderOrders()}

      {isModal && <FeedbackModal orderId={orderID} setReload={setReload}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Dark background for the screen
    padding: 20,
  },
  header: {
    flexDirection: 'row', // Align GoBack button and text horizontally
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff', // Primary text color
    marginLeft: 10, // Space between the button and the text
  },
});

export default MyOrdersScreen;
