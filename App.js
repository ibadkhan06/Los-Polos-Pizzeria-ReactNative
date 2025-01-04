import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'; 
import { useSelector } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen'; 
import UserProfileScreen from './screens/UserProfileScreen';
import MainLayoutScreen from './screens/MainLayoutScreen';
import OrderPlacedScreen from './screens/OrderPlacedScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import ViewProfileScreen from './screens/ViewProfileScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import LogoutScreen from './screens/LogoutScreen';
import LoginScreen from './screens/LoginScreen';
import { OrderFeedbackProvider } from './context/OrderFeedbackContext';
import OrdersScreen from './screens/OrdersScreen';
import AdminProfileScreen from './screens/AdminProfileScreen';
import CameraScreen from './screens/CameraScreen';
import { useNavigation } from '@react-navigation/native';
import ViewFeedbacksScreen from './screens/ViewFeedbacksScreen';
import ViewAllUsersScreen from './screens/ViewAllUsersScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserProfileStack = () => {
  return (
    <OrderFeedbackProvider>
      <Stack.Navigator
        screenOptions={({ route }) => {
          console.log("StackNav "+JSON.stringify(route, null, 2)); // Log the full route object in a readable format
          return {
            tabBarStyle: {
              display: route.name === 'Camera' ? 'none' : 'flex', // Hide on Camera
            }
          };
        }}
      >
        <Stack.Screen name="ProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ViewProfile" component={ViewProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyOrders" component={MyOrdersScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false  }} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LogoutUser" component={LogoutScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </OrderFeedbackProvider>
  );
};

const AdminProfileStack = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name='AdminProfile' component={AdminProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false  }} />
      <Stack.Screen name="FeedbacksScreen " component={ViewFeedbacksScreen } options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}


const AdminAppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Orders"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#111", // Black tab bar
          height: 55, // Consistent height
          position: "absolute",
          borderTopWidth: 0,
          paddingHorizontal: 20,

        },
        tabBarShowLabel: false, // Hide tab labels
        headerShown: false, // Header is custom
      }}
    >
      {/* Home Screen */}
      <Tab.Screen
        name="Orders"
        options={{
          tabBarIcon: ({ color }) => (
            <FontIcon name="clipboard-list" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#666",
          headerShown: false
        }}
      >
        {() => (
          <MainLayoutScreen>
            <OrdersScreen />
          </MainLayoutScreen>
        )}
      </Tab.Screen>

      {/* MenuManagement Screen */}
      <Tab.Screen
        name="ViewAllUsers"
        options={{
          tabBarIcon: ({ color }) => (
            <FontIcon name="users" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#666",
          headerShown: false
        }}
      >
        {() => (
          <MainLayoutScreen>
            <ViewAllUsersScreen/>
          </MainLayoutScreen>
        )}
      </Tab.Screen>

      {/*AdminProfile Screen*/}
      <Tab.Screen
        name="AdminProfileStack"
        options={{
          tabBarIcon: ({ color }) => (
            <FontIcon name="cog" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#666",
          headerShown: false
        }}
      >
        {() => (
          <MainLayoutScreen>
            <AdminProfileStack />
          </MainLayoutScreen>
        )
        }
      </Tab.Screen>
      
    </Tab.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};


const UserAppNavigation = ({route}) => {
  const orderStatus = useSelector(state=>state.orderTracker.status)
  console.log(route);
  console.log(orderStatus)
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        console.log(JSON.stringify(route.name, null, 2)) // Log the route object to the console

        return {
          tabBarStyle: {
            backgroundColor: "#111", // Black tab bar
            height: 50, // Consistent height
            position: "absolute",
            borderTopWidth: 0,
            paddingHorizontal: 20, // Add padding for space on sides
            // Conditionally hide tab bar on Camera screen
            display: route.name === 'Camera' ? 'none' : 'flex', // Hide on Camera
          },
          tabBarShowLabel: false, // Hide tab labels
          headerShown: false, // Header is custom
          tabBarVisible: route.name === 'Camera' ? false : true, //
        };
      }}
    >
      {/* Home Screen */}
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#666",
          headerShown: false
        }}
      >
        {() => (
          <MainLayoutScreen>
            <HomeScreen />
          </MainLayoutScreen>
        )}
      </Tab.Screen>

      {/* Cart Screen change name to cart stack to avoid warning */}
      <Tab.Screen
        name="CartStack"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.cartButtonWrapper, focused && styles.cartButtonWrapperActive]}
            >
              <Icon
                name="cart-outline"
                size={28}
                color="#fff"
                style={focused ? styles.iconGlow : {}}
              />
            </View>
          ),
        }}
      >  
        {() => {
          // Render OrderPlacedScreen or CartStack based on orderStatus
          if (orderStatus === "pending") {
            return (
              <MainLayoutScreen>
                <OrderPlacedScreen />
              </MainLayoutScreen>
            );
          }
          return (
            <MainLayoutScreen>
              <CartStack />
            </MainLayoutScreen>
          );
        }}

      </Tab.Screen>

      {/* Profile Screen */}
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#666",
        }}
      >
        {() => (
          <MainLayoutScreen>
            <UserProfileStack />
          </MainLayoutScreen>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Login Screen */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      {/* Register Screen */}
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }} 
      />
      

    </Stack.Navigator>
  );
};

// Notifcation Configurations
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  // notifications permission handled here
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Notification permissions not granted!');
      }
    };
    requestPermissions();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppWrapper />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
 }
 
 const AppWrapper = () => {
  
  // Access user state from Redux
  const { useradmin } = useSelector((state) => ({
    useradmin: state.user.user,
  }));
  
  // Check if the user is authenticated and is an admin
  const isAuthenticated = !!useradmin;
  console.log("isAuthenticated:",isAuthenticated);

  const isAdmin = isAuthenticated && useradmin.user.isAdmin === true;;
  console.log("admin status:",isAdmin);

  // If user is not authenticated, show AuthStackNavigator
  if (!isAuthenticated) {
    return <AuthStackNavigator />;
  }
  // If user is authenticated and is an admin, show AdminStackNavigator
  if (isAdmin) {
    return <AdminAppNavigator />;
  }
  // If user is authenticated but not an admin, show UserAppNavigation
  return <UserAppNavigation />;

};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },

  // Cart Button Styling
  cartButtonWrapper: {
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: "50%", // Center the button horizontally
    marginLeft: -30, // Offset to truly center (width/2)
    zIndex: 10,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  cartButtonWrapperActive: {
    shadowColor: "#4CAF50",
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  iconGlow: {
    textShadowColor: "#4CAF50",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});


