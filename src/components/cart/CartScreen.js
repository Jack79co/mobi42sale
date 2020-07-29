import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Header, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Products from '../../components/products/Products';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';



const WIDTH_SCREEN = Dimensions.get('window').width;

const CartScreen = (props) => {

    let [totalPrice, SetTotalPrice] = useState(0);
    let [totalCost, SetTotalCost] = useState(0)
    const [update, setUpdate] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    // loop to get total amount
    useEffect(() => {
        props.cartItems.map((item) => {
            return (
                SetTotalPrice(totalPrice += ((item.IsInOffer ? item.OfferPrice : item.WholesalePrice) * (Number(item.InitialQuantity)))),
                SetTotalCost(totalCost += ((item.SupplyPrice) * (Number(item.InitialQuantity)))),
                makeObjForCheckOut(item)
            )

        })
    }, [update])
    //finish the loop

    //to change the inside layout design when it's come to the cart
    const isCartScreen = props.navigation.getParam('isCartScreen');



    ///////////////////////////////CHECKOUT//////////////////////////////////////
    const handleCheckOut = async () => {
        var value = await AsyncStorage.getItem('user');
        if (value !== null) {
            setIsLoading(true)
            const url = props.domain + '/api/Orders/AddOrder';
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': props.token,
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    TotalAmount: totalPrice,
                    TotalCost: totalCost,
                    OrderDetails: props.checkOutArray
                })
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert('success')
                        props.EmptyArrays()
                        props.cartItems.map(item => {
                            item.InitialQuantity = "1"
                        })
                        setIsLoading(false)
                        return response.json()

                    }
                    else if (response.status == 406) {
                        setIsLoading(false)
                        return response.json()

                    }
                    else {
                        Toast.show('an error has occurred. please contact technical support', Toast.SHORT)
                        setIsLoading(false)
                        return response.json()
                    }

                })
                .then((responseData) => {
                    alert(JSON.stringify(responseData.Message))

                })
                .catch((error) => {
                    console.error(error);

                })
        }
        else {
            props.navigation.navigate('AuthStack')
        }

    }
    //////////////////////////////////////////////////////////////////////////////



    /////////////////////update quantity///////////////////////
    const updateQuantity = () => {
        SetTotalPrice(0)
        SetTotalCost(0)
        update ? setUpdate(false) : setUpdate(true)
    }
    ///////////////////////////////////////////////////////////



    //////////////////////ADD TO CHECKOUT ARRAY////////////////  
    const makeObjForCheckOut = (item) => {
        let ITEM = { "fk_Items_Id": item.pk_Items_Id, "Quantity": item.InitialQuantity, "IsInOffer": item.IsInOffer, "OfferId": item.OfferId, "OfferPercentage": item.OfferPctg }
        function update(ID, quantity) {
            for (var i = 0; i < props.checkOutArray.length; i++) {
                if (props.checkOutArray[i].fk_Items_Id === ID) {
                    props.checkOutArray[i].Quantity = quantity
                    break;
                }
            }
        }
        update(ITEM.fk_Items_Id, item.InitialQuantity)

    }
    ///////////////////////////////////////////////////////////

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
                <Text style={styles.pageTitle}>Your cart</Text>
            </Header>
            {/* for checkout loading */}
            {isLoading ?
                <View style={{
                    justifyContent: 'center',
                    zIndex: 99999,
                    position: 'absolute',
                    alignItems: 'center',
                    backgroundColor: 'rgba(52, 52, 52, 0.5)',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}>
                    <ActivityIndicator size="large" color="#4dc6e1" />
                </View> : null}

            {/* END */}
            <View style={styles.productView}>
                {props.cartItems.length > 0 ?
                    <View style={{ paddingBottom: 125 }}>
                        <Products
                            product={props.cartItems}
                            cart={isCartScreen}
                            navigation={props.navigation}
                            handleDelete={props.deleteItemFromCart}
                            handleDeleteFromCheckOutArray={props.deleteItemFromCheckOutArr}
                            updateQuantity={updateQuantity}
                            handleLoadMore={handleLoadMore}
                        />
                    </View>
                    :
                    <View style={styles.emptyCart}>
                        <Icon name="md-cart" size={150} color="#A9A9A9" />
                        <Text style={styles.emptyCartText}>YOUR CART IS EMPTY </Text>
                    </View>
                }

            </View>
            {
                props.cartItems.length > 0 ?
                    <View style={styles.checkoutFooter}>
                        <View style={styles.footer}>
                            <Text style={styles.totalAmount}> {totalPrice} KWD</Text>
                            <Button
                                onPress={() => handleCheckOut()}
                                style={styles.checkOutBTN} block>
                                <Text style={styles.checkoutText}>CHECKOUT</Text>
                            </Button>

                        </View>
                    </View> : null
            }


        </View >
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
        checkOutArray: state.checkOutArray,
        change: state.totalPrice.change,
        domain: state.domainReducer.domainName,
        imagePath: state.domainReducer.imagePath,
        token: state.domainReducer.Token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItemFromCart: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
        deleteItemFromCheckOutArr: (product) => dispatch({ type: 'REMOVE_FROM_CHECKOUT_ARRAY', payload: product }),
        EmptyArrays: () => dispatch({ type: "EMPTY_ARRAYS" }),
        addToCheckOutArray: (object) => dispatch({ type: 'CHECK_OUT', payload: object }),
        EmptyCheckOutArray: () => dispatch({ type: "EMPTY_CHECKOUT_ONLY" })
    }
}


export default connect(mapStateToProps, mapDispatchToProps, null)(CartScreen);

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


