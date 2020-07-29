import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import HeaderComponent from '../header/HeaderComponent';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';


const Screen_Width = Dimensions.get('window').width;
const Screen_Height = Dimensions.get('window').height;



const ItemDetails = (props) => {

    const item_id = props.navigation.getParam('item_id');
    const itemName = props.navigation.getParam('itemName');
    const itemDesc = props.navigation.getParam('itemDesc');
    const itemColor = props.navigation.getParam('itemColor');
    const itemPrice = props.navigation.getParam('itemPrice');
    const item = props.navigation.getParam('item');

    const isCartScreen = props.navigation.getParam('isCartScreen');

    const [itemDetails, setItemsDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [inCart, setInCart] = useState(props.navigation.getParam('inCart'))


    const getItemDetails = async () => {
        const url = props.domain + '/api/Items/GetItemDetailsByItemID/' + item_id;
        await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setItemsDetails(responseJson)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            })
    }


    useEffect(() => {
        getItemDetails()
    }, [])


    const addItemToCartAndToCheckOutArray = (item) => {
        setInCart(true)
        let ITEM = { "fk_Items_Id": item.pk_Items_Id, "Quantity": item.InitialQuantity ,"IsInOffer" : item.IsInOffer ,"OfferId" : item.OfferId ,  "OfferPercentage" : item.OfferPctg }
        props.addToCheckOutArray(ITEM)
        props.addItemToCart(item)
    }


    return (
        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation} name="md-arrow-back" />
            {/* <NavigationEvents onWillFocus={() => inCart} />   */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 5 }}>

                <View style={styles.whiteHolder}>
                    <View style={styles.imageWrapper}>
                        {isLoading ?
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <ActivityIndicator size='small' color='#4dc6e1' />
                            </View> :
                            <Image style={styles.itemImage} resizeMode='contain'
                                source={{ uri: props.imagePath + itemDetails.MainImageUrl }} />}
                    </View>
                    <View style={styles.grayLine}></View>
                    <View style={styles.itemDetails}>
                        <Text>{itemName}</Text>
                        <Text style={styles.itemPrice}>{itemPrice} KWD</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                            <Text style={{ fontWeight: '700' }}>Color :- </Text>
                            <Text>{itemColor}</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.descriptionWrapper}>
                    <View style={{ marginHorizontal: 15, }}>
                        <Text style={styles.descriptionTitle}>Description :-</Text>
                        <Text style={styles.description}>{itemDesc}</Text>

                    </View>
                </View>
            </ScrollView>
            {isCartScreen ? null :
                <View style={styles.checkoutFooter}>
                    <View style={styles.footer}>
                        {props.cartItems.some(i => i.pk_Items_Id === item_id ) ?

                            <Button style={styles.AddToCart} block >
                                <Text style={styles.AddToCartText}>ITEM IN CART NOW</Text>
                            </Button>
                            : <Button onPress={() => addItemToCartAndToCheckOutArray(item)} style={styles.AddToCart} block >
                                <Text style={styles.AddToCartText}>ADD TO CART</Text>
                            </Button>}

                    </View>
                </View>}

        </View>
    );
};
const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
        domain: state.domainReducer.domainName,
        imagePath: state.domainReducer.imagePath
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
        addToCheckOutArray: (object) => dispatch({ type: 'CHECK_OUT', payload: object })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    whiteHolder: {
        width: Screen_Width,
        backgroundColor: '#fff',
        elevation: 2,
        paddingBottom: 15
    },
    imageWrapper: {
        width: 200,
        height: 200,
        marginTop: 25,
        alignSelf: 'center'
    },
    itemImage: {
        width: null, height: null, flex: 1
    },
    itemDetails: {
        marginHorizontal: 15,
        justifyContent: 'flex-end',
    },
    itemPrice: {
        marginTop: 12,
        fontWeight: '700'
    },
    grayLine:
    {
        backgroundColor: '#a9a9a9',
        width: Screen_Width,
        height: .4,
        marginTop: 25,
        marginBottom: 8,
    },
    colorsWrapper: {
        marginHorizontal: 15,
    },
    colorTitle: {
        fontWeight: '700',
        fontSize: 16,
    },
    descriptionWrapper: {
        width: Screen_Width,
        backgroundColor: '#fff',
        elevation: 2,
        marginTop: 10,
        marginBottom: 100,
        paddingBottom: 10
    },
    descriptionTitle: {
        fontWeight: '700',
        marginTop: 7
    },
    description: {
        marginTop: 15
    },
    checkoutFooter: {
        width: Screen_Width,
        height: 70,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 0,
        borderTopColor: '#E6E6FF',
        borderTopWidth: .7,
        justifyContent: 'center',
        elevation: 10,
    },
    AddToCartText: {
        fontFamily: 'OpenSans',
        fontSize: 19,
        color: '#fff',
    },
    footer: {
        alignItems: 'center',
        marginHorizontal: 15,
        justifyContent: 'center',
    },
    AddToCart: {
        backgroundColor: '#212221',
        borderRadius: 3,
    },
});


