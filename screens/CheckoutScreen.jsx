import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import useCurrentLocation from '../customHooks/useCurrentLocation';
import GoBackBtn from '../components/GoBackBtn';
import { ActivityIndicator, ProgressBar } from 'react-native-paper';
import PaymentCard from '../components/PaymentCard';
import OrderSummaryCard from '../components/OrderSummaryCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setPendingStatus,setOrderId} from '../features/cart/orderTrackingSlice';
import { FIRESTORE_DB } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const CheckoutScreen = () => {
  const { location, region, locationDetails, errorMsg } = useCurrentLocation();
  const cart = useSelector(state => state.cart.cart);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState();
  const [area, setArea] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [apartmentNo, setApartmentNo] = useState('');
  const [selectedOption, setSelectedOption] = useState('delivery'); // 'delivery' or 'pickup'
  const [isFormValid, setIsFormValid] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const { userCustomer } = useSelector((state) => ({
    userCustomer: state.user.user,
    // isLoading: state.user.isLoading,
  }));

  useEffect(() => {
    // Form validation: Ensure address fields are filled and payment method is selected if delivery is chosen
    const isAddressFilled = area && phoneNo;
    let isPaymentSelected = false;
    if(selectedOption === 'pickup'){
      isPaymentSelected = true
    }
    else if(selectedOption === 'delivery' && selectedPaymentOption){
      isPaymentSelected = true
    }
    const formValid = isAddressFilled && isPaymentSelected ? true: false ;
    console.log('Form is valid:', formValid); // Add this line to debug
    setIsFormValid(formValid);

  }, [area, phoneNo, selectedPaymentOption, selectedOption]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const checkPhoneNumber = () => {
    console.log('Checking phone number', phoneNo);
  
    // Check if phone number starts with '0' or '+92'
    if (phoneNo.startsWith('0') || phoneNo.startsWith('+92')) {
      // Remove the prefix ('0' or '+92') to check the rest of the number
      let numberPart = phoneNo;
  
      if (phoneNo.startsWith('+92')) {
        numberPart = phoneNo.slice(3); // Remove '+92'
      } else {
        numberPart = phoneNo.slice(1); // Remove '0'
      }
  
      // Check if the remaining part of the number is numeric and has exactly 9 digits
      if (numberPart.length === 10 && !isNaN(Number(numberPart))) {
        return true; // Valid phone number
      }
    }
    return false; // Invalid phone number
  };

  const handleAddressChange = (field, value) => {
    if (field === 'area') setArea(value);
    if (field === 'apartmentNo') setApartmentNo(value);
  };

  const userCurrentLocation = () => {
    if (!location || !region || !locationDetails) {
      return <Text>Loading...</Text>;
    }
    return (
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Your Current Location"
          description="Delivery Address"
        />
      </MapView>
    );
  };

  const defaultLocation = () => (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 24.8607,
        longitude: 67.0011,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        coordinate={{ latitude: 24.8607, longitude: 67.0011 }}
        title="Karachi"
        description="Sahil Farm House Karachi"
      />
    </MapView>
  );

  const handleOrderSubmit = async () => {
    console.log('UserId at checkout : ' + userCustomer.user.id);
    setLoading(true);

    if(!checkPhoneNumber()){
      Alert.alert('Error', 'Please enter a valid phone number');
      setLoading(false);
      return;
    }
    try {
      const payload = {
        user_id: userCustomer.user.id, // Fetch userId using Redux
        items: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          ...(item.size && { size: item.size }),
          ...(item.crusts && { crusts: item.crusts }),
          ...(item.stuffed && { stuffed: item.stuffed }),
          ...(item.pieces && { pieces: item.pieces }),
        })),
        totalAmount: totalPrice,
        status: 'pending',
        payment_method: selectedPaymentOption ? selectedPaymentOption : null,
        delivery_address: {
          area: area,
          phone_no: phoneNo,
          apartment_no: apartmentNo,
          latitude: location.latitude,
          longitude: location.longitude,
        },
        date: new Date().toISOString(),
        feedback: "", // Optional feedback
      };
  
      // Reference to the Firestore collection
      const orderRef = collection(FIRESTORE_DB, 'orders');
      
      // Add the order to Firestore (Firestore auto-generates order_id)
      console.log(orderRef,payload)
      const docRef = await addDoc(orderRef, payload);
  
      console.log("Order placed with ID: ", docRef.id); // docRef.id will be the Firestore-generated order_id
  
      // Dispatch action to set order status or navigate based on your app's flow
      dispatch(setPendingStatus());
      dispatch(setOrderId(docRef.id));
      // upon successs navigate to orderPlaced screen
      navigation.navigate('OrderPlaced');

    } catch (error) {

      console.error('Error posting order:', error);

      alert('Error occurred while posting order.');
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <GoBackBtn text={"Checkout"} />
      <View style={styles.progressContainer}>
        <ProgressBar progress={0.75} color="#FF6347" />
      </View>

      {/* Delivery Address */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Icon name="location-outline" size={20} color="#FF6347" />
          <Text style={styles.cardTitle}>Delivery Address</Text>
        </View>
       
        {location ? userCurrentLocation() : defaultLocation()}

        <Text style={styles.addressText}>{locationDetails}</Text>
        <View style={styles.addressForm}>
          <TextInput
            style={styles.input}
            placeholder="Name of Area / Block / HouseNo"
            placeholderTextColor="#aaa"
            value={area}
            onChangeText={(text) => handleAddressChange('area', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Number (+92)"
            placeholderTextColor="#aaa"
            value={phoneNo}
            onChangeText={setPhoneNo}
          />
          <TextInput
            style={styles.input}
            placeholder="Apartment No. (optional)"
            placeholderTextColor="#aaa"
            value={apartmentNo}
            onChangeText={(text) => handleAddressChange('apartmentNo', text)}
          />
        </View>

        {/* Delivery or Pickup Option */}
        <Text style={styles.cardTitle}>Choose Pickup or Delivery</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'delivery' && styles.selectedOption]}
            onPress={() => handleOptionChange('delivery')}
          >
            <Icon name="cart" size={20} color="#333" />
            <Text style={styles.optionText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'pickup' && styles.selectedOption]}
            onPress={() => handleOptionChange('pickup')}
          >
            <Icon name="location-outline" size={20} color="#333" />
            <Text style={styles.optionText}>Pickup</Text>
          </TouchableOpacity>
        </View>

        {/* Show Estimated Delivery only if 'Delivery' is selected */}
        {selectedOption === 'delivery' && (
          <View style={styles.deliveryInfoContainer}>
            <Icon name="bicycle" size={20} color="#FF6347" />
            <Text style={styles.deliveryInfo}>Estimated Delivery: 15-30 mins</Text>
          </View>
        )}
        {/* Payment Options */}
        {selectedOption === 'delivery' && (
          <PaymentCard selectedPaymentOption={selectedPaymentOption} getSelectedPaymentOption={setSelectedPaymentOption} />
        )}

        {/* Order Summary */}
        <OrderSummaryCard />

      </View>


      {/* Total and Place Order Button */}
      {isFormValid ?
      <View style={styles.footer}>
        {loading ? 
        (<ActivityIndicator size="small" color="white" style={{ marginLeft: 10 }} />)
        :
        <View style={styles.footerContainer}>
        <TouchableOpacity
            style={[styles.placeOrderButton, !isFormValid && { backgroundColor: '#aaa' }]} // Disable button if form is not valid
            onPress={handleOrderSubmit} 
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
        }
      </View> 
      : 
      null
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Set background to black
    paddingHorizontal: 10, // Adjust padding for better spacing
  },
  card: {
    backgroundColor: '#333', // Dark gray background for cards
    padding: 16,
    marginBottom: 10, // Increased margin for spacing between cards
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
    marginBottom: 12, // Increased bottom margin for better spacing
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#eee', // Light gray text color
    marginLeft: 8,
  },
  map: {
    height: 180, // Increased height for map view
    borderRadius: 10,
    marginBottom: 10, // Added margin for separation from other components
  },
  addressText: {
    fontSize: 14,
    color: '#bbb',
    marginVertical: 8,
  },
  addressForm: {
    marginTop: 12,
    marginBottom: 20, // Added margin bottom to separate from options section
  },
  input: {
    height: 45, // Increased input height for better usability
    backgroundColor: '#444',
    borderRadius: 6,
    color: '#fff',
    paddingHorizontal: 12,
    marginBottom: 14, // Increased margin for spacing between inputs
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16, // Added margin at the bottom to separate from payment options
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12, // Increased padding for better clickability
    paddingHorizontal: 24,
    backgroundColor: '#555',
    borderRadius: 6,
  },
  selectedOption: {
    backgroundColor: '#FF6347', // Selected option color
  },
  optionText: {
    marginLeft: 10, // Adjusted for better spacing
    color: '#fff',
  },
  deliveryInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Increased spacing
  },
  deliveryInfo: {
    marginLeft: 8,
    color: '#bbb',
  },
  footer: {
    marginTop: 20, // Added margin top for better spacing before footer
    alignItems: 'center',
    paddingBottom: 40,  // Adjusted bottom padding to ensure "Place Order" button isn't cut off
  },
  placeOrderButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 20, // Increased margin top for space above the button
    width: '80%', // Set button width to 80% of the container
    alignItems: 'center', // Ensure the text is centered
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  progressContainer: {
    marginTop: 20,
    marginBottom: 15,
  },
  footerContainer: {
    paddingVertical: 15,
    backgroundColor: 'black',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    marginTop: 'auto',
    marginBottom: 30 // Ensures footer is pinned to the bottom
  },
  totalContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
});

export default CheckoutScreen;


// TODO: 
// add the functionality to post data accordingly to fireBases firestore
// plus brainstorm whether to produce orderId at front end or back end/firebase