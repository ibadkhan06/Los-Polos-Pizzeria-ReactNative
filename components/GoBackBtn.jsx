import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const GoBackBtn = ({ text }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()} style={styles.pressable}>
                <Icon name="arrow-back" size={24} color="white" />
                <Text style={styles.headerTitle}>{text}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', // Aligns children horizontally
        alignItems: 'center', // Centers items vertically
        marginBottom: 10,
    },
    pressable: {
        flexDirection: 'row', // Ensures the arrow and text are placed next to each other
        alignItems: 'center', // Vertically centers the arrow and text
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10, // Adds space between the arrow and text
        color: 'white',
    },
});

export default GoBackBtn;
