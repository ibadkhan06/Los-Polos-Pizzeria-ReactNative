import { View, Text, TextInput, TouchableOpacity, Pressable, Alert, StyleSheet, Modal, Animated, Image, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useOrderFeedbackContext } from '../context/OrderFeedbackContext';
import { doc, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';
import { ActivityIndicator } from 'react-native-paper';

const FeedbackModal = ({orderId,setReload}) => {

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const { isModal, setIsModal, orderID } = useOrderFeedbackContext();
  const slideAnim = useState(new Animated.Value(300))[0]; // Initial position (below screen)

  useEffect(() => {
    if (isModal) {
      // Slide modal in from the bottom when it's visible
      Animated.spring(slideAnim, {
        toValue: -250, // Position it at the bottom of the screen
        friction: 7,
        tension: 100,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide out when modal is closed
      Animated.spring(slideAnim, {
        toValue: 300, // Position it below the screen
        friction: 7,
        tension: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isModal]);

  const handleFeedbackSubmit = async () => {

    if (feedback.trim().length === 0) {
      Alert.alert('Warning', 'Feedback Description is required', [
        { text: 'OK', style: 'destructive' }
      ]);
      return; // Exit function early
    }
    try {
      // Reference to the Firestore document you want to update
      setLoading(true);
      const docRef = doc(FIRESTORE_DB, 'orders', orderId); // Assuming orderId is available in your state
  
      // Update the feedback field with the value from feedback
      await updateDoc(docRef, {
        feedback: feedback.trim(), // Save the trimmed feedback
      });
  
      // Optionally, you can show a success message or do something after the update
      Alert.alert('Success', 'Your feedback has been submitted successfully.');
  
      // Clear the feedback input field after submission (optional)
      setFeedback('');
      setIsModal(false);
      setReload(prev=> !prev); 
  
    } catch (error) {
      console.error('Error updating feedback: ', error);
      Alert.alert('Error', 'There was an issue submitting your feedback.');
    }
    finally{
      setLoading(false);
    }

  };



  return (
    <Modal visible={isModal} transparent={true} animationType="none">
      <Animated.View
        style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
        {/* Close Button */}
        <Pressable onPress={() => setIsModal(false)}>
          <Text style={styles.closeButton}>X</Text>
        </Pressable>

        <Text style={styles.modalTitle}>Feedback For Order: {orderId}</Text>

          <TextInput
            style={styles.input}
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Your feedback here ..."
          />

          <View style={styles.buttonsContainer}>
            {loading ? 
            <ActivityIndicator size={24} color="white" /> 
            : 
            <TouchableOpacity onPress={handleFeedbackSubmit} style={styles.submitButton}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            }
          </View>

      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 30,
    backgroundColor: '#333333',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0, // Position it at the bottom
  },
  closeButton: {
    fontSize: 30,
    color: '#FF0000',
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 24,                   // Increased font size for a bold look
    fontWeight: '600',              // Semi-bold font weight for better emphasis
    color: 'white',                 // Dark grey color for better readability
    marginBottom: 16,              // Spacing below the title
    textAlign: 'center',           // Center-align the title
  },
  input: {
    height: 100,                    // Set a comfortable height for the input box
    borderColor: '#ccc',           // Light grey border
    borderWidth: 1,                // Thin border
    borderRadius: 5,              // Rounded corners for a sleek, soft look
    marginVertical: 12,            // Vertical spacing between elements
    paddingHorizontal: 20,         // Padding inside the input box
    fontSize: 16,                  // Comfortable font size for typing
    backgroundColor: '#4B4B4B',    // Slightly off-white background for contrast
    shadowColor: '#000',           // Adding a shadow for a floating effect
    shadowOpacity: 0.1,            // Light shadow opacity for depth
    shadowOffset: { width: 0, height: 4 }, // Subtle shadow positioning
    shadowRadius: 8,               // Soft shadow radius
    elevation: 4,                  // Android elevation for a raised effect
  },
  buttonsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  raiseIssueButton: {
    backgroundColor: 'red', // Red background
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  raiseIssueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  issueDescriptionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedbackModal;
