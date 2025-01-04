import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const ActivitySpinner = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" /> 
          <Text>Loading...</Text>
        </View>
      );
}

export default ActivitySpinner;