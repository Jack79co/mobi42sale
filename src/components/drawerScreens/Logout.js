import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import messaging, { firebase } from '@react-native-firebase/messaging';



const Logout = (props) => {
    useEffect(() => {
        setTimeout(() => {
            loadInitialState()
            props.RemoveAllFav()
        }, 1000);

    }, [])

    const loadInitialState = async () => {

        var value = await AsyncStorage.removeItem('user');
        firebase.messaging().deleteToken();    
        if (value === null) {
            props.navigation.navigate('Loading')
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
            <ActivityIndicator size='large' />
        </View>
    )
};




const mapStateToProps = (state) => {
    return {
        favItems: state.favItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        RemoveAllFav: () => dispatch({ type: 'EMPTY_FAV' })
    }
}
export default connect(mapStateToProps, mapDispatchToProps, null)(Logout);



