import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Header } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';


const OrderDetails = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [ordersDetails, setOrdersDetails] = useState([]);


    const orderID = props.navigation.getParam('orderID');




    useEffect(() => {
        getOrderDetails()
    }, [])

    const getOrderDetails = async () => {
        const url = props.domain + '/api/Orders/ViewClientOrderDetails/' + orderID;
        await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': props.token,
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setOrdersDetails(responseJson)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (

        <View style={styles.container}>
            <Header iosBarStyle='light-content' androidStatusBarColor="#4dc6e1" style={styles.headerWrapper}>
                <TouchableOpacity
                    style={styles.backButtonWrapper}
                    onPress={() => props.navigation.goBack()}>
                    <Icon name='md-arrow-back' size={25} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>OrderDetails</Text>
            </Header>


            {isLoading ?
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" color="#4dc6e1" />
                </View> :

                <FlatList
                    style={{ paddingBottom: 110 }}
                    showsVerticalScrollIndicator={false}
                    data={ordersDetails}
                    keyExtractor={(x, i) => i.toString()}
                    keyboardShouldPersistTaps="always"
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.ItemWrapper}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={styles.MobileImageStyle} source={{ uri: props.imagePath + item.CoverImageUrl }} />
                                    <View style={styles.MobileDetails}>
                                        <Text style={styles.MobileName}>Name: {item.Name}</Text>
                                        <Text style={styles.MobilePrice}>Price: {item.WholesalePrice} KWD</Text>
                                        <Text style={styles.Quantity}>Quantity: {item.Quantity}</Text>

                                    </View>
                                </View>
                            </View>


                        )
                    }
                    }
                />}
        </View>

    );
};


const mapStateToProps = (state) => {
    return {
        domain: state.domainReducer.domainName,
        token: state.domainReducer.Token,
        imagePath: state.domainReducer.imagePath,
    }

}

export default connect(mapStateToProps)(OrderDetails);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerWrapper:
    {
        backgroundColor: '#4dc6e1',
        justifyContent: 'flex-start',
        elevation: 10,
        alignItems: 'center',
        marginBottom: 15
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
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 2.5,
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        elevation: 3,
    },
    MobileDetails: {
        marginLeft: 15
    },
    MobileImageStyle: {
        width: 55,
        height: 130,
        resizeMode: 'center',
        marginHorizontal: 15,
    },
    MobileName: {
        maxWidth: 200,
        fontFamily: "OpenSans"
    },
    MobilePrice: {
        marginTop: 5,
        fontFamily: "OpenSans"
    },
    Quantity : {
        marginTop: 30,
        fontFamily: "OpenSans"
    }
});










