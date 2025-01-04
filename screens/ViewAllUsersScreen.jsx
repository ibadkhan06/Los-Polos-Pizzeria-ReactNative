import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet,ActivityIndicator } from "react-native";
import Fuse from 'fuse.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window'); // Get screen dimensions
const ViewAllUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayedUsers, setDisplayedUsers] = useState(users);

  useEffect(() => {
    const FetchAllUsers = async()=>{
        const usersCollection = collection(FIRESTORE_DB,'users')
        const usersQuery = query(usersCollection, where('isAdmin','==',false));
        try {
            const querySnapshot = await getDocs(usersQuery);
            const users = querySnapshot.docs.map((doc) => {
              const userData = doc.data();
        
              const createdAtFormatted = userData.createdAt
                ? new Date(userData.createdAt.seconds * 1000).toLocaleString() // Convert Firestore Timestamp to JavaScript Date
                : '';
              const lastLoginFormatted = userData.lastLogin
                ? new Date(userData.lastLogin.seconds * 1000).toLocaleString() // Convert Firestore Timestamp to JavaScript Date
                : '';
        
              return {
                ...userData,
                createdAt: createdAtFormatted,
                lastLogin: lastLoginFormatted,
              };
            });
        
            setUsers(users);
        }  
        catch (error) {
            console.error("Error fetching orders: ", error);
        }
        finally{
            setLoading(false);
        }
    }

    FetchAllUsers();
  },[])

  useEffect(() => {
    if (search) {
      // Fuse.js search configuration
      const fuse = new Fuse(users, {
        keys: ['name', 'email',"createdAt","lastLogin"],
        includeScore: true,
      });

      // Perform the search and update the displayed users
      const results = fuse.search(search);
      const filteredUsers = results.map(result => result.item);
      setDisplayedUsers(filteredUsers);
    } else {
      setDisplayedUsers(users);  // Reset to all users if search is cleared
    }
  }, [search , users]);

  const renderUsers = ({ item }) => (
    <View style={styles.adminCard}>
      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{item.name}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{item.email}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Created At</Text>
        <Text style={styles.value}>{item.createdAt}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Last Login</Text>
        <Text style={styles.value}>{item.lastLogin}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
        {loading ? 
        <ActivityIndicator size={50} color='white' style={{flex:1}}/>
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
            <FlatList
            data={displayedUsers}
            keyExtractor={(item) => item.id}
            renderItem={renderUsers}
            ListEmptyComponent={<Text style={styles.emptyText}>No Users Found</Text>}
            />
        </>
        }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
    paddingBottom: height * 0.1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  adminCard: {
    backgroundColor: "#1e1e1e",
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
  },
  field: {
    marginBottom: 6,
  },
  label: {
    fontSize: 10,
    color: "#aaa",
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#2a2a2a",
    padding: 6,
    borderRadius: 6,
  },
  searchInput: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flex: 1,
  },
  emptyText: {
    marginTop:100,
    color: '#bbb',  // Light gray for empty text
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ViewAllUsersScreen;
