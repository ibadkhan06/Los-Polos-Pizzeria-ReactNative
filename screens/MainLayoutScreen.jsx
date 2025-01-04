import { View, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'


// this component defines the Main layout of the app where each screen is renderd inside the header and tab section
const MainLayoutScreen = ({ children }) => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header /> 
          <View style={styles.content}>{children}</View>
        </View>
      </SafeAreaView>
    );
  };
  
const styles = StyleSheet.create({
safeArea: {
    flex: 1,
    backgroundColor: '#000', // Ensure background color is set properly
},
container: {
    flex: 1,
},
content: {
    flex: 1,
    padding: 10,
},
});
export default MainLayoutScreen;
