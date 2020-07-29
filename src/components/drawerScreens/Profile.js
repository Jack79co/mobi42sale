import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Body, Left } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions, StackActions, NavigationEvents } from 'react-navigation';







const Profile = (props) => {

    const [clientDetails, setClientDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        viewProfile() 
        
    }, [])
   

    const viewProfile = async () => {

        const url = props.domain + '/api/Clients/ClientViewProfile';
        await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': props.token,
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setClientDetails(responseJson)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            })
    }

    // const loadInitialState = async () => {

    //     var value = await AsyncStorage.getItem('user');
    //     if (value !== null) {
    //         viewProfile()
    //         setIsLoading(false)
    //     }
    //     else props.navigation.navigate('AuthStack')
    // }
    


    return (

        <View style={{ flex: 1 }}>
            <Header iosBarStyle='light-content' androidStatusBarColor="#4dc6e1" style={styles.headerWrapper}>
                <TouchableOpacity
                    style={styles.backButtonWrapper}
                    onPress={() => props.navigation.navigate('Tap')}>
                    <Icon name='md-arrow-back' size={25} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Your Profile</Text>
                <Body />
                <Left>
                    <TouchableOpacity style={styles.editBtn} onPress={() => props.navigation.navigate('EditProfile')}>
                        <Icon name='md-create' size={25} color='#fff' />
                    </TouchableOpacity>
                </Left>
            </Header>
            <NavigationEvents onWillFocus={() => viewProfile()} />

            {isLoading ?
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" color="#4dc6e1" />
                </View> :
                <View style={{ marginLeft: 20, marginTop: 7 }}>
                    <View style={styles.wrapper}>
                        <Text style={styles.Text}>Name :- </Text>
                        <Text>{clientDetails.Name}</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.Text}>Manager Name :- </Text>
                        <Text>{clientDetails.ManagerName}</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.Text}>Email :- </Text>
                        <Text>{clientDetails.Email}</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.Text}>Mobile1 :- </Text>
                        <Text>{clientDetails.Mobile1}</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.Text}>Mobile2 :- </Text>
                        <Text>{clientDetails.Mobile2}</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.Text}>Phone :- </Text>
                        <Text>{clientDetails.Phone}</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.Text}>Fax :- </Text>
                        <Text>{clientDetails.Fax}</Text>
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.Text}>Adress :- </Text>
                        <Text>{clientDetails.Address}</Text>
                    </View>
                </View>}









        </View >
    );
};

const mapStateToProps = (state) => {
    return {
        domain: state.domainReducer.domainName,
        imagePath: state.domainReducer.imagePath,
        token: state.domainReducer.Token
    }

}

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 15,
    },
    Text: {
        fontSize: 16,
        fontFamily: 'OpenSans'
    },
    headerWrapper:
    {
        backgroundColor: '#4dc6e1',
        justifyContent: 'flex-start',
        elevation: 10,
        alignItems: 'center'
    },
    backButtonWrapper: {
        marginTop: 4,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#4dc6e1',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#4dc6e1',
        borderRadius: 20,
    },
    pageTitle:
    {
        fontSize: 17,
        alignSelf: 'center',
        fontFamily: 'OpenSans',
        color: '#fff',
        marginLeft: 20,
    },
    editBtn: {
        marginTop: 4,
        marginLeft: 0,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#4dc6e1',
        borderRadius: 20,
        alignSelf: 'center'
    }
});



