Los Polos Pizzeria - Food Ordering Application
Overview
Los Polos Pizzeria is a mobile food ordering application developed using React Native that allows users to browse menus, place orders, and track their order status in real-time. The app is designed to enhance the customer experience by offering a seamless interface for ordering food from a local pizzeria and provides the restaurant owner with an admin panel for managing orders effectively.

Features
Browse Menus: Users can explore various food categories, view items, and see detailed information about each product.
Place Orders: Users can add items to their cart, specify quantities, and place orders seamlessly.
Real-time Order Tracking: Users can track their order status in real-time, including updates on order completion and cancellations.
View Past Orders: Users can view a history of their past orders for convenience.
Feedback & Communication: Users can send feedback and contact the restaurant owner directly via WhatsApp.
Push Notifications: Real-time notifications inform users about order status updates, such as completion or cancellation.
Admin Panel: Restaurant owners can approve or reject orders, helping streamline the order management process.
Tech Stack
Frontend: React Native, Redux, Context API
Backend: Firebase Firestore
Notifications: Expo-Notifications
State Management: Redux (Global State), Context API (Local State)
Installation
Prerequisites
Node.js: Make sure you have Node.js installed. You can download it here.
Expo CLI: Install Expo CLI globally by running the following command:
bash
Copy code
npm install -g expo-cli
Steps to Run the Application
Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/los-polos-pizzeria.git
Install Dependencies Navigate to the project directory and install the dependencies:

bash
Copy code
cd los-polos-pizzeria
npm install
Start the Development Server Run the following command to start the Expo development server:

bash
Copy code
expo start
Open the App You can open the app on your mobile device using the Expo Go app, or you can run it in an Android or iOS emulator.

Firebase Setup
Create Firebase Project

Go to Firebase Console, and create a new Firebase project.
Configure Firestore

Enable Firestore and set up collections for storing user data, order details, and feedback.
Set Up Firebase Authentication (Optional)

For user authentication, configure Firebase Authentication (email/password or other methods as per your app's requirement).
Integrate Firebase SDK

Add the Firebase configuration to your app:
Install Firebase SDK:

bash
Copy code
npm install firebase
Initialize Firebase in your project:

javascript
Copy code
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
Features Implementation Details
State Management
Global State: Redux is used for managing global state like user authentication status, current order details, and menu items.
Local State: Context API is used to handle local states such as managing the shopping cart or feedback form.
Push Notifications
The app uses expo-notifications to send push notifications to users regarding their order updates (completion or cancellation).

To set up notifications:

bash
Copy code
npm install expo-notifications
Admin Panel
The admin panel allows restaurant owners to approve or reject orders. It is designed to be simple yet efficient, providing all the necessary functionalities for effective order management.

WhatsApp Communication
The app integrates WhatsApp API, allowing users to contact the restaurant owner directly from the app. This helps enhance communication and customer service.

Contributing
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
