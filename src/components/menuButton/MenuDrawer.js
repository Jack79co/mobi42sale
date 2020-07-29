import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';








const MenuDrawer = (props) => {

    useEffect(() => {
        loadInitialState()
    }, [])

    const [PageNameProfileOrAuth, setPageNameProfileOrAuth] = useState('');
    const [PageNameOrdersOrAuth, setPageNameOrdersOrAuth] = useState('');
    const [PageNameReceiptsOrAuth, setPageNameReceiptsOrAuth] = useState('');
    const [PageNameInvoicesOrAuth, setPageNameInvoicesOrAuth] = useState('');


    const navLink = (nav, icon, text) => {
        return (
            <TouchableOpacity style={styles.DrawerDetailsWrapper}
                onPress={() => { props.navigation.navigate(nav) }} >
                <Icon style={{ textAlign: "center", width: 90, marginBottom: 35 }} size={22} name={icon} />
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }


    const loadInitialState = async () => {
        var value = await AsyncStorage.getItem('user');
        if (value !== null) {
            setPageNameProfileOrAuth('Profile')
            setPageNameOrdersOrAuth('Orders')
            setPageNameReceiptsOrAuth('Receipts')
            setPageNameInvoicesOrAuth('Invoices')  
        }
        else {
            setPageNameProfileOrAuth('AuthStack')
            setPageNameOrdersOrAuth('AuthStack')
            setPageNameReceiptsOrAuth('AuthStack')
            setPageNameInvoicesOrAuth('AuthStack')
        }
    }


    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={() => loadInitialState()} />
            <View style={styles.bottomLinks}>
                {navLink(PageNameProfileOrAuth, 'md-person', 'Profile')}
                {navLink(PageNameOrdersOrAuth, 'md-clipboard', 'Orders')}
                {navLink(PageNameReceiptsOrAuth, 'md-cash', 'Receipts')}  
                {navLink(PageNameInvoicesOrAuth, 'md-paper', 'Invoices')}
                {navLink('SignOut', 'md-log-out', 'Logout')}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    bottomLinks: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 400,
    },
    DrawerDetailsWrapper: {
        flexDirection: 'row',
        paddingTop: 15
    },
    link: {
        fontSize: 15,
        fontFamily: 'Opensans',
        paddingTop: 2.5,
    },
})


export default MenuDrawer;