import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,ActivityIndicator } from 'react-native';
import PlacedOrdersCard from '../components/PlacedOrdersCard';
import { collection, query, where, getDocs, orderBy, getDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';


// home screen for admin shows both tab pending orders and other orders
const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'completed'
  const [pendingOrders, setPendingOrders] = useState([]);
  const [otherOrders, setOtherOrders] = useState([]);
  const [pendingOrdersLoading, setPendingOrdersLoading] = useState(true);
  const [otherOrdersLoading,setOtherOrdersLoading] = useState(true);


  useEffect(() =>{

    // fetch all the completed/cancelled orders
    const fetchOtherOrders = async () => {
        try {
            // Fetch orders where status is 'pending' and order by date
            const ordersQuery = query(
              collection(FIRESTORE_DB, 'orders'),
              where('status', '!=', 'pending'), // Filter for non-pending orders (completed/cancelled)
              orderBy('date', 'desc') // Order by 'date' field in descending order (most recent first)
            );
            
            const querySnapshot = await getDocs(ordersQuery);
            
            // Iterate through orders and fetch user name for each order
            const ordersList = [];
            for (const docSnap of querySnapshot.docs) {
              const orderData = docSnap.data();
              const userId = orderData.user_id;
              
              // Fetch user details from the users collection using the user_id
              const userDoc = await getDoc(doc(FIRESTORE_DB, 'users', userId));
              const userData = userDoc.exists() ? userDoc.data() : null;
              
              // Add order and user name together
              ordersList.push({
                ...orderData,
                id: docSnap.id, // Add order ID
                userName: userData ? userData.name : 'Unknown', // Only the user name
              });
            }
            
            console.log("Completed/Cancelled Orders ", ordersList);
            setOtherOrders(ordersList); // Set the fetched orders into state

        } catch (error) {
          console.error('Error fetching completed or cancelled orders:', error);
        } finally {
            setOtherOrdersLoading(false);
        }
    };
    
    // fetch all the pending Orders
    const fetchPendingOrders = async () => {
        try {
          const ordersQuery = query(
            collection(FIRESTORE_DB, 'orders'),
            where('status', '==', 'pending'), // Filter for pending orders
            orderBy('date', 'desc') // Order by 'date' field in descending order (most recent first)
          );
          
          const querySnapshot = await getDocs(ordersQuery);
            // Iterate through orders and fetch user name for each order
            const ordersList = [];
            for (const docSnap of querySnapshot.docs) {
            const orderData = docSnap.data();
            const userId = orderData.user_id;
            
            // Fetch user details from the users collection using the user_id
            const userDoc = await getDoc(doc(FIRESTORE_DB, 'users', userId));
            const userData = userDoc.exists() ? userDoc.data() : null;
            
            // Add order and user name together
            ordersList.push({
                ...orderData,
                id: docSnap.id, // Add order ID
                userName: userData ? userData.name : 'Unknown', // Only the user name
            });
            }
         // console.log("PendingOrders ",ordersList);
          setPendingOrders(ordersList); // Set the fetched orders into state

        } catch (error) {
          console.error('Error fetching pending orders:', error);
        } finally {
            setPendingOrdersLoading(false);
        }
    };
  
    
    fetchOtherOrders();

    const intervalId = setInterval(() => {
        fetchPendingOrders();
    }, 5000); // Poll every 5 seconds
    
      return () => clearInterval(intervalId); // Cleanup interval on component unmount
  },[activeTab])

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'pending' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('pending')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'pending' && styles.activeTabText,
            ]}
          >
            Pending Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'completed' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}
          >
            Other Orders
          </Text>
        </TouchableOpacity>
      </View>
  
      {/* Render Pending Orders */}
      {activeTab === 'pending' ? (
          pendingOrdersLoading ? (
            <ActivityIndicator size="large" color="white" style={{flex:1}} />
          ) : (
            <FlatList
              data={pendingOrders}
              renderItem={({ item }) => <PlacedOrdersCard forTab={activeTab} order={item} />}
              ListEmptyComponent={<Text style={styles.emptyText}>No orders to display</Text>}
              keyExtractor={(item) => item.id}
            />
          )
        ) 
        : 
        null
      }
  
      {/* Render Other Orders */}
      {activeTab === 'completed' ? (
        otherOrdersLoading ? (
          <ActivityIndicator size="large" color="white" style={{flex:1}} />
        ) : (
          <FlatList
            data={otherOrders}
            renderItem={({ item }) => <PlacedOrdersCard forTab={activeTab} order={item} />}
            ListEmptyComponent={<Text style={styles.emptyText}>No orders to display</Text>}
            keyExtractor={(item) => item.id}
          />
        )
      ) 
      : 
      null
      }
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#111',  // Dark background color
      paddingBottom: 70,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',  // White text for header
      marginBottom: 20,
      textAlign: 'center',
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      backgroundColor: '#333',  // Dark gray background for tabs
    },
    activeTab: {
      backgroundColor: '#FF6347',  // Active tab color
    },
    tabText: {
      color: '#fff',  // White text for tab labels
      fontSize: 16,
    },
    activeTabText: {
      fontWeight: 'bold',
    },
    emptyText: {
      color: '#bbb',  // Light gray for empty text
      textAlign: 'center',
      fontSize: 16,
    },
});
  

export default OrdersScreen;
