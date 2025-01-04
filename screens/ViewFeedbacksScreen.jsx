import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fuse from 'fuse.js';
import GoBackBtn from '../components/GoBackBtn';
import { ActivityIndicator } from 'react-native-paper';

const ViewFeedbacksScreen = () => {
  // populated with dummy data as of now replace with your own and make the cards more beautiful
  const [feedbacks, setFeedBacks] = useState([  
    { orderId: "sdas1", name: "Ahsan", feedback: "Great service!" },
    { orderId: "sdas2", name: "Sarah", feedback: "Very satisfied with the product." },
    { orderId: "sdas3", name: "Ali", feedback: "The delivery was fast and efficient." },
    { orderId: "sdas4", name: "Nina", feedback: "Excellent customer support." },
    { orderId: "sdas5", name: "Tariq", feedback: "Good quality, but could improve packaging." },
    { orderId: "sdas6", name: "Zara", feedback: "The product exceeded my expectations!" },
    { orderId: "sdas7", name: "Imran", feedback: "Nice product, but delivery was delayed." },
    { orderId: "sdas8", name: "Fatima", feedback: "Amazing experience, will shop again." },
    { orderId: "sdas9", name: "Omar", feedback: "The product was as described." },
    { orderId: "sdas10", name: "Rida", feedback: "Everything was perfect, no complaints." }]
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayedFeedBacks, setDisplayedFeedBacks] = useState(feedbacks);

  useEffect(() => {
    const FetchAllFeedBacks = async () => {
      try {
        // logic to fetch {orderId, name, feedbacks} from the firestore
        // setFeedBacks(data)
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    }

    FetchAllFeedBacks();
  }, []);

  useEffect(() => {
    if (search) {
      // Fuse.js search configuration
      const fuse = new Fuse(feedbacks, {
        keys: ['name',"orderId"],
        includeScore: true,
      });

      // Perform the search and update the displayed feedbacks
      const results = fuse.search(search);
      const filteredFeedbacks = results.map(result => result.item);
      setDisplayedFeedBacks(filteredFeedbacks);
    } else {
      setDisplayedFeedBacks(feedbacks);  // Reset to all feedbacks if search is cleared
    }
  }, [search, feedbacks]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBackBtn />
        <Text style={styles.headerText}>Feedbacks</Text>
      </View>
      {loading ? 
        <ActivityIndicator style={{ flex: 1 }} size={50} color='white' />
        :
        <>
          <View style={styles.header}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search..."
              placeholderTextColor="#888"
              style={styles.searchInput}
            />
          </View>

          {/* Render the feedbacks using FlatList */}
          <FlatList
            data={displayedFeedBacks}
            keyExtractor={(item) => item.orderId}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.subText}>Order ID: {item.orderId}</Text>
                <Text style={styles.cardValue}>{item.feedback}</Text>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No Feedbacks Found</Text>}
          />
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#111', // Dark background for a sleek look
  },
  header: {
    flexDirection: 'row', // Align GoBack button and text horizontally
    alignItems: 'center',
    marginBottom: 35,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white', // Add a splash of color for contrast
    marginLeft: 12, // Space between the button and the text
  },
  searchInput: {
    width: '100%',
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 6,
    color: 'white',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#333',
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  subText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  cardValue: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default ViewFeedbacksScreen;
