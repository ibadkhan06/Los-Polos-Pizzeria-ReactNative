import React, {useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image,Text,Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system'; // Import expo-file-system
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useSelector } from 'react-redux';

const CameraScreen = ({navigation,route}) => {
    
    const [snapshot,setSnapshot] = useState();
    const cameraRef= useRef(null);
    const [facing,setFacing] = useState("back");
    const {setReload} = route.params
    const user= useSelector(state=>state.user.user.user)
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }
  
    if (!permission.granted ) {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>
            We need your permission to show the camera
          </Text>
          <Button
            onPress={requestPermission}
            title="Grant Permission"
            color="#FF5733" // Orange color for button
          />
          <TouchableOpacity style={styles.goBackButton} onPress={()=> navigation.goBack()}>
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // taking picture is async operation
    const takePicture = async () => {
        if(cameraRef.current){
            try {
                const picture = await cameraRef.current.takePictureAsync();
                setSnapshot(picture.uri);
            } catch (error) {
                console.log('Failed to take picture');
            }
        }
    }
    // saves image to Async Storage
    const saveImage = async () => {
        try {
          console.log('Saving image');
          
          // Convert the image URI to Base64
          const base64Image = await FileSystem.readAsStringAsync(snapshot, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const formattedImage = base64Image.startsWith('data:image/')
          ? base64Image
          : `data:image/png;base64,${base64Image}`;
      
          // Save Base64 string to AsyncStorage
          await AsyncStorage.setItem(`profilePicture${user.id}`, formattedImage);
          console.log('Image saved to AsyncStorage');
      
          // Go back after saving
          setReload(prev => !prev)
          navigation.goBack();
        } catch (error) {
          console.log('Error saving image:', error);
        }
    };

    function toggleCameraFacing() {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    // renders a camera screen
    const Camera = () => {
        return (
          <CameraView key={facing} facing={facing} ref={cameraRef} style={{ flex: 1 }}>
            {/* Capture Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <MaterialIcons name="camera-alt" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraFacing}>
                <MaterialIcons name="camera-front" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
            {/* Exit Button */}
            <View style={styles.exitbutton}>
              <TouchableOpacity
                onPress={() => {
                  setSnapshot(null);
                  navigation.goBack();
                }}
              >
                <MaterialIcons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </CameraView>
        );
    };


    // renders the Image options save or reset
    const imageOptions = () => {
        console.log("Image-> "+snapshot);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image 
            source={{ uri: snapshot }} 
            style={{ width: '100%', height: '100%' }} 
            resizeMode="contain" 
            />
                <View style={styles.buttonContainerPicture}>
                <TouchableOpacity style={styles.saveButton} onPress={saveImage}>
                    <MaterialIcons name="save-alt" size={30} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => setSnapshot(null)}>
                    <MaterialIcons name="undo" size={30} color="#fff" />
                </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            {snapshot ? imageOptions(): Camera() }
        </View>
      );
}


const styles = StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      bottom: 20,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    captureButton: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#ff5722',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      marginBottom: 30,
    },
    toggleButton: {
      width: 40,
      height: 40,
      borderRadius: 30,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', // Position it at the right of the parent container
      left: 130, // Align to the right
      top: 10,
    },
    
    exitbutton: {
      position: 'absolute',
      top: 20,
      left: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: 10,
      borderRadius: 25,
    },
    buttonContainerPicture: {
        position: 'absolute',
        bottom: 100, // Place buttons at the bottom
        left: 0,
        right: 0,
        flexDirection: 'row', // Align buttons in a row
        justifyContent: 'space-between', // Space them out, Save on left, Cancel on right
        paddingHorizontal: 40, // Padding to give space between edges
        alignItems: 'center', // Vertically center the buttons
    },
    saveButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f44336',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePreview: {
      flex: 1,
      resizeMode: 'contain',
      margin: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000', // Black background for the overall screen
      padding: 20,
    },
    message: {
      fontSize: 18,
      fontWeight: '600',
      color: '#fff', // White text for the message
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 24,
    },
    goBackButton: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#FF5733', // Orange color for the go back button
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    goBackText: {
      color: '#fff', // White text for the button
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default CameraScreen;