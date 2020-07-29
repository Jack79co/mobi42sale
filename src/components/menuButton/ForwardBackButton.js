import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const ForwardBackButton = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.ForwardBackButton}>
            <Icon size={25} name="md-arrow-back" color="gray" />
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    ForwardBackButton: {
        zIndex: 9,
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ForwardBackButton;