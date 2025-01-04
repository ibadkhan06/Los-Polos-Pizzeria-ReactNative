import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CreateItemScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Item Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CreateItemScreen;
