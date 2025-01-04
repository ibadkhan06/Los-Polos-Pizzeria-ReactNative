import { View, Text ,StyleSheet,TextInput,ScrollView} from 'react-native'
import React, { useEffect,useState } from 'react'
import GoBackBtn from '../components/GoBackBtn'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native-paper';
import { collection, doc, getDoc, query } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window'); // Get screen dimensions
const ViewProfileScreen = () => {
  const user = useSelector(state => state.user.user.user);
  const [extraDetails,setExtraDetails] = useState(null);
  const [loading,setLoading] = useState(true);
 

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to Date
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Karachi', // Adjust the timezone if necessary
    }).format(date);
  };




  useEffect(() => {
    // Fetch user data from Firebase or wherever you store it
    const FetchUserExtraDetails = async() =>{
      try {
        console.log(user)
        const usersCollection = collection(FIRESTORE_DB, 'users');
        const userDocRef =  doc(usersCollection,user.id);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData= userDoc.data();
          console.log(userDoc.data());
          const createdAtTimestamp = userData.createdAt;
          const lastLoginTimestamp = userData.lastLogin;
          
          // Format both timestamps
          const formattedCreatedAtDate = formatTimestamp(createdAtTimestamp);
          const formattedLastLoginDate = formatTimestamp(lastLoginTimestamp);
          
          // Update state with formatted dates
          setExtraDetails({
            createdAt: formattedCreatedAtDate,
            lastLogin: formattedLastLoginDate,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        
      }finally {
        setLoading(false);
      }
    }

    FetchUserExtraDetails();
  }, [])

  return (
    <ScrollView style={styles.container}>
      {/* Inline GoBack button with text */}
      <View style={styles.header}>
        <GoBackBtn />
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Show loading indicator while fetching data */}
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={50} color='white' />
        </View>
      )}

      {/* Display user data once it's available */}
      {!loading && user && (
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <View style={styles.labelContainer}>
            <Icon name="user" size={20} color="orange" style={styles.icon} />
              <Text style={styles.label}>ID</Text>
            </View>
            <TextInput
                value={user.id}
                editable={false}
                style={styles.inputField}
            />
          </View>

          <View style={styles.userInfo}>
            <View style={styles.labelContainer}>
            <Icon name="user-circle" size={20} color="orange" style={styles.icon} />
              <Text style={styles.label}>Username</Text>
            </View>
            <TextInput
                value={user.name}
                editable={false}
                style={styles.inputField}
            />
          </View>

          <View style={styles.userInfo}>
            <View style={styles.labelContainer}>
            <Icon name="envelope" size={20} color="orange" style={styles.icon} />
              <Text style={styles.label}>Email</Text>
            </View>
            <TextInput
                value={user.email}
                editable={false}
                style={styles.inputField}
            />
          </View>
        </View>
      )}
        {extraDetails && (  
          <>        
          <View style={styles.userInfo}>
            <View style={styles.labelContainer}>
            <Icon name="calendar" size={20} color="orange" style={styles.icon} />
              <Text style={styles.label}>createdAt</Text>
            </View>
            <TextInput
                value={extraDetails.createdAt}
                editable={false}
                style={styles.inputField}
            />
          </View>
          <View style={styles.userInfo}>
          <View style={styles.labelContainer}>
          <Icon name="history" size={20} color="orange" style={styles.icon} />
            <Text style={styles.label}>LastLogin</Text>
          </View>
          <TextInput
              value={extraDetails.lastLogin}
              editable={false}
              style={styles.inputField}
          />
        </View>
        </>
      )}

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Dark background for the screen
    padding: 20,
    paddingBottom: height * 0.1,
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
  loaderContainer: {
    flex: 1, // Ensure it takes up the whole screen while loading
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    marginTop: 20,
  },
  userInfo: {
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: 'row', // This makes the icon and label appear on the same line
    alignItems: 'center', // This vertically centers the icon and label
    marginBottom: 5, // Adds some spacing between the label and the TextInput
  },
  icon: {
    marginRight: 10, // Adds space between the icon and label
  },
  label: {
    fontSize: 18,
    color: '#fff', // Label text color
    fontWeight: '500',
  },
  inputField: {
    backgroundColor: '#333', // Dark background for input field
    color: '#fff', // White text color
    fontSize: 16,
    height: 40, // Set height of the input field
    width: '100%', // Set width to 100% to make it take full available space
    marginTop: 5, // Adds space between the label and the TextInput field
    paddingLeft: 10, // Padding for text inside the input field
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#555', // Border color for input fields
    textAlign: 'left', // Align text to the left
  },
});

export default ViewProfileScreen;