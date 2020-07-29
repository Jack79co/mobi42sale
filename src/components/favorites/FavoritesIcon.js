import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';




const FavoritesIcon = (props) => {

    const checkAuth = async (item) => {
        var value = await AsyncStorage.getItem('user');
        if (value !== null) {
            props.navigation.navigate('FavoritesScreen', {
                isFavoritesScreen: true,
            })
        }
        else {
            props.navigation.navigate('AuthStack')
        }

    }



    return (
        <TouchableOpacity onPress={() => checkAuth()}>
            <View style={styles.iconWrapper}>
                <Icon size={25} name="md-heart-empty" color="gray" />
            </View>
        </TouchableOpacity>
    )
}



export default FavoritesIcon;


const styles = StyleSheet.create({
    badge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 25,
        bottom: 20,
        zIndex: 99999,
        borderColor: 'gray',
        borderWidth: .1
    },
    iconWrapper: {
        backgroundColor: '#fff',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22.5,
    }
})

