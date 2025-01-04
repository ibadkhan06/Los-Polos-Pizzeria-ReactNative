import { View, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SecondaryLayoutScreen = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  </SafeAreaView>
  )
}

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

export default SecondaryLayoutScreen