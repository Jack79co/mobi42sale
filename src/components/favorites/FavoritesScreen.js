import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Header, Button, Content, Body, Left } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Products from '../products/Products';
import CartIcon from '../cart/CartIcon';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';


const WIDTH_SCREEN = Dimensions.get('window').width;

const FavoritesScreen = (props) => {

    const isFavoritesScreen = props.navigation.getParam('isFavoritesScreen');


    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [recall, setRecall] = useState(true)




    useEffect(() => {
        getFavorites()
    }, [recall])


    const getFavorites = async () => {
        const url = props.domain + '/api/Favorites/GetAllFavoritesToClient/1';
        await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': props.token,
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {

                setFavorites(responseJson)
                if (responseJson.length === 0) {
                    setIsEmpty(true)
                    setIsLoading(false)
                }
                else setIsLoading(false)

            })
            .catch(error => {
                console.error(error);
            })
    }



    const refreshFav = () => {
        recall ? setRecall(false) : setRecall(true)
    }



    const handleLoadMore = () => {
        null
    }


    return (
        <View style={styles.container}>
            <Header iosBarStyle='light-content' androidStatusBarColor="#4dc6e1" style={styles.headerWrapper}>
                <TouchableOpacity
                    style={styles.backButtonWrapper}
                    onPress={() => props.navigation.goBack()}>
                    <Icon name='md-arrow-back' size={25} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Your favorites</Text>
                <Body></Body>
                <Left style={{ marginRight: 20 }}>
                    <CartIcon navigation={props.navigation} />
                </Left>

            </Header>
            {isLoading ?
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <ActivityIndicator size='large' color='#4dc6e1' />
                </View> : isEmpty ? <View style={styles.emptyCart}>
                    <Icon name="md-heart-empty" size={150} color="#A9A9A9" />
                    <Text style={styles.emptyCartText}>YOUR FAVORITE LIST IS EMPTY</Text>
                </View> :
                    <Content contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false} style={{ paddingTop: 10 }}>
                        <Products
                            product={favorites}
                            navigation={props.navigation}
                            fav={isFavoritesScreen}
                            handleCheckOutArray={props.addToCheckOutArray}
                            handleLoadMore={handleLoadMore}
                            refreshFav={refreshFav} />
                    </Content>
            }


        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        domain: state.domainReducer.domainName,
        imagePath: state.domainReducer.imagePath,
        token: state.domainReducer.Token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItemFromFav: (product) => dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product }),
        addToCheckOutArray: (object) => dispatch({ type: 'CHECK_OUT', payload: object })
    }
}


export default connect(mapStateToProps, mapDispatchToProps, null)(FavoritesScreen);

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
    emptyCart: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    emptyCartText: {
        fontSize: 20,
        fontFamily: "OpenSans",
    },
    checkoutFooter: {
        width: WIDTH_SCREEN,
        height: 70,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 0,
        borderTopColor: '#E6E6FF',
        borderTopWidth: .7,
        justifyContent: 'center',
        elevation: 10
    },
    checkoutText: {
        fontFamily: 'OpenSans',
        fontSize: 19,
        color: '#fff',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 18
    },
    checkOutBTN: {
        backgroundColor: '#212221',
        padding: 20,
        paddingHorizontal: 50,
        borderRadius: 3
    },
    totalAmount: {
        fontFamily: 'OpenSans',
        fontWeight: '800',
        fontSize: 14
    },


});


