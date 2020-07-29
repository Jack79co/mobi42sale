import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions, StackActions, NavigationEvents } from 'react-navigation';











const Orders = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        handleGetOrders()
    }, [])




    const handleGetOrders = async () => {

        const url = props.domain + '/api/Orders/ViewClientOrders';
        await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': props.token,
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setOrders(responseJson)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            })
    }



    return (

        <View style={{ flex: 1 }}>
            <Header iosBarStyle='light-content' androidStatusBarColor="#4dc6e1" style={styles.headerWrapper}>
                <TouchableOpacity
                    style={styles.backButtonWrapper}
                    onPress={() => props.navigation.dispatch(NavigationActions.back())}>
                    <Icon name='md-arrow-back' size={25} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Your Orders</Text>
            </Header>
            <NavigationEvents onWillFocus={() => handleGetOrders()} />
            {isLoading ?
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" color="#4dc6e1" />
                </View>
                :
                <View style={{ flex: 1, paddingTop: 10 }}>
                    <FlatList
                        style={{ paddingBottom: 110 }}
                        showsVerticalScrollIndicator={false}
                        data={orders}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TouchableHighlight
                                    underlayColor='#c8c8c8'
                                    onPress={() => props.navigation.navigate('OrderDetails',{
                                        orderID: item.OrderId
                                    })}
                                    style={styles.ItemWrapper}>
                                    <View>
                                        <View style={{ marginVertical: 7 }}>
                                            <Text style={styles.title}>Date :- </Text>
                                            <Text>{item.Order_Date}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginVertical: 7, alignItems: 'center' }}>
                                            <Text style={styles.title}>Order Number :- </Text>
                                            <Text>{item.OrderNo}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginVertical: 7, alignItems: 'center' }}>
                                            <Text style={styles.title}>Total Price :- </Text>
                                            <Text>{item.TotalAmount}</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>

                            )
                        }
                        }
                    />
                </View>}
        </View>
    )




}







const mapStateToProps = (state) => {
    return {
        domain: state.domainReducer.domainName,
        token: state.domainReducer.Token
    }

}

export default connect(mapStateToProps)(Orders);

const styles = StyleSheet.create({
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
    ItemWrapper: {
        flexDirection: 'row',
        marginVertical: 6,
        backgroundColor: '#fff',
        borderRadius: 2.5,
        marginHorizontal: 15,
        padding: 15,
        elevation: 3,
    },
    title: {
        fontFamily: 'OpenSans',
        fontSize: 16
    }
});



