import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';



const Loading = (props) => {

    useEffect(() => {
        loadInitialState();
    }, [])

    const loadInitialState = async () => {

        var value = await AsyncStorage.getItem('user');
        props.setToken(value)
        if (value !== null) {
            props.navigation.navigate('App')

        }
        else {
            props.navigation.navigate('App')
        }
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: token }),
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default connect(null, mapDispatchToProps)(Loading);
