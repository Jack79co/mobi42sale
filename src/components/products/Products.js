import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TouchableHighlight, TextInput, Animated, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';










const Products = (props) => {





    const [isCart, setIsCart] = useState(false);
    const [isFav, setIsFav] = useState(false);



    // for change the design 
    useEffect(() => {
        setIsCart(props.cart)
        setIsFav(props.fav)
    }, [])
    //








    /////////////////////////////add to fav api//////////////////////////////
    const AddToFavorites = async (item) => {
        const url = props.domain + '/api/Favorites/AddOrRemoveFavorite';
        await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': props.token,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ItemID: item.pk_Items_Id
            })
        })
            .then((response) => response.status)
            .then((responseData) => {
                console.log(
                    "Response Body -> " + JSON.stringify(responseData))
            })
            .catch((error) => {
                console.error(error);
            })
    }

    /////////////////////////////////////////////////////////////////////
    /////////////////////////////delete from fav api//////////////////////////////
    const RemoveFromFavorites = async (itemID) => {
        const url = props.domain + '/api/Favorites/AddOrRemoveFavorite';
        await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': props.token,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ItemID: itemID
            })
        })
            .then((response) => response.status)
            .then((responseData) => {
                console.log(
                    "Response Body -> " + JSON.stringify(responseData))
            })
            .catch((error) => {
                console.error(error);
            })
    }

    /////////////////////////////////////////////////////////////////////




    // *************************redirect to login then add to fav AND DELETE FROM FAV****************************/
    const addFavAndLogin = async (item) => { //there was 2 params (onSelect, id) in the last one
        var value = await AsyncStorage.getItem('user');
        if (value !== null) {

            props.addToFav(item)
            AddToFavorites(item)
        }
        else {
            props.navigation.navigate('AuthStack')
        }

    }

  

    const handleDeleteFromFavAndChangeIcon = (item) => {
        isFav ? props.refreshFav() : null

        props.deleteFavFromDesign(item)
        RemoveFromFavorites(item.pk_Items_Id)
    }
        // *******************************************************************************/

        const handleAddItemAndFillArray = async (item) => {
            item.isCart = true
            let ITEM = { "fk_Items_Id": item.pk_Items_Id, "Quantity": item.InitialQuantity, "IsInOffer": item.IsInOffer, "OfferId": item.OfferId, "OfferPercentage": item.OfferPctg }
            props.handleCheckOutArray(ITEM)
            await props.handleAdd(item)
        }


        const DeleteAndUpdate = (item, itemID) => {
            item.isCart = false
            props.handleDelete(item, itemID)
            props.handleDeleteFromCheckOutArray(item, itemID)
            props.handleDeleteFromCheckOutArray(item, itemID)
            props.updateQuantity()
            item.InitialQuantity = "1"
        }



        return (
            <View>
                <FlatList
                    style={{ paddingBottom: 500 }}
                    showsVerticalScrollIndicator={false}
                    data={props.product}
                    keyExtractor={(x, i) => i.toString()}
                    keyboardShouldPersistTaps="always"
                    onEndReached={() => props.handleLoadMore()}
                    onEndReachedThreshold={1}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableHighlight
                                onPress={() => props.navigation.navigate('ItemDetails', {
                                    item_id: item.pk_Items_Id,
                                    inCart: item.isCart,
                                    itemImage: props.imagePath + item.CoverImageUrl,
                                    itemName: item.Name,
                                    itemPrice: item.IsInOffer ? item.OfferPrice : item.WholesalePrice,
                                    itemColor: item.Color,
                                    itemDesc: item.Description,
                                    isCartScreen: isCart,
                                    isFavoritesScreen: isFav,
                                    item: item
                                })}
                                underlayColor='#c8c8c8'
                                style={styles.ItemWrapper}>
                                <View style={{ flexDirection: 'row' }}>
                                    {item.IsInOffer ?
                                        <View style={{
                                            backgroundColor: "brown",
                                            width: 63,
                                            height: 20,
                                            position: 'absolute',
                                            left: -20,
                                            top: 115,
                                        }}>
                                            <Text style={{ color: "#fff", fontFamily: 'OpenSans', marginLeft: 5 }}>{Math.round(item.OfferPctg * 100)}% off</Text>
                                        </View> : null}

                                    <Image style={styles.MobileImageStyle} source={{ uri: props.imagePath + item.CoverImageUrl }} />
                                    <View style={styles.MobileDetails}>
                                        <Text style={styles.MobileName}>{item.Name} </Text>
                                        <Text style={styles.MobilePrice}>{item.IsInOffer ? item.OfferPrice : item.WholesalePrice} KWD</Text>

                                        {isCart &&
                                            <View style={{ paddingTop: 10 }}>
                                                <Text style={styles.titles}>Qty : </Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <View>
                                                        <TextInput
                                                            style={styles.QTYinpt}
                                                            keyboardType='numeric'
                                                            maxLength={6}
                                                            defaultValue={item.InitialQuantity === "" ? "1" : item.InitialQuantity}
                                                            onChangeText={(value) => item.InitialQuantity = value}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: 20 }}>
                                                        <TouchableOpacity
                                                            style={styles.removeBtn}
                                                            onPress={() => DeleteAndUpdate(item, item.pk_Items_Id)}>
                                                            <Text style={styles.removeText}>Remove</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                                <TouchableHighlight
                                                    underlayColor="#212221"
                                                    activeOpacity={1}
                                                    style={styles.updateQuantityBtn}
                                                    onPress={() => props.updateQuantity()}>
                                                    <Text style={styles.updateQuantityBtnTxt}>Update</Text>
                                                </TouchableHighlight>

                                            </View>}
                                        {isFav &&
                                            <View style={{ paddingTop: 10 }}>
                                                <TouchableOpacity
                                                    style={styles.removeBtn}
                                                    onPress={() => handleDeleteFromFavAndChangeIcon(item)}>
                                                    <Text style={styles.removeText}>Remove from favorite</Text>
                                                </TouchableOpacity>
                                            </View>}

                                        {!isFav && !isCart && <View style={{ flexDirection: 'row', paddingTop: 15, }}>


                                            {props.favItems.some(i => i.pk_Items_Id === item.pk_Items_Id) ?
                                                <TouchableOpacity onPress={() => handleDeleteFromFavAndChangeIcon(item)}>
                                                    <View style={styles.iconWrapper}>
                                                        <Icon size={25} name={"md-heart"} color={"red"} />
                                                    </View>
                                                </TouchableOpacity> :
                                                <TouchableOpacity onPress={() => addFavAndLogin(item)}>
                                                    <View style={styles.iconWrapper}>
                                                        <Icon size={25} name={"md-heart-empty"} color={"gray"} />
                                                    </View>
                                                </TouchableOpacity>}

                                            {props.cartItems.some(i => i.pk_Items_Id === item.pk_Items_Id) ?
                                                <TouchableOpacity onPress={() => Toast.show('this item already in the cart !', Toast.BOTTOM)}>
                                                    <View style={styles.iconWrapper}>
                                                        <Icon size={25} name="md-cart" color="#00b200" />
                                                    </View>
                                                </TouchableOpacity> :
                                                <TouchableOpacity onPress={() => handleAddItemAndFillArray(item)}>
                                                    <View style={styles.iconWrapper}>
                                                        <Icon size={25} name="md-cart" color="gray" />
                                                    </View>
                                                </TouchableOpacity>}

                                        </View>}
                                    </View>
                                </View>
                            </TouchableHighlight>

                        )
                    }
                    }

                />


            </View>
        );
    };


    const mapStateToProps = (state) => {
        return {
            cartItems: state.cartItems,
            favItems: state.favItems,
            domain: state.domainReducer.domainName,
            imagePath: state.domainReducer.imagePath,
            checkOutArray: state.checkOutArray,
            token: state.domainReducer.Token,
            _quantity: state._quantity
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
            addToFav: (item) => dispatch({ type: 'ADD_TO_FAV', payload: item }),
            deleteFavFromDesign: (item) => dispatch({ type: 'REMOVE_FROM_FAV', payload: item }),
            setQuantity: (QTY) => dispatch({ type: 'SET_QUANTITY', payload: QTY }),
        }
    }



    export default connect(mapStateToProps, mapDispatchToProps, null)(Products);



    const styles = StyleSheet.create({
        ItemWrapper: {
            flexDirection: 'row',
            margin: 5,
            backgroundColor: '#fff',
            borderRadius: 2.5,
            marginLeft: 10,
            marginRight: 10,
            padding: 20,
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
        },
        MobilePrice: {
            marginVertical: 5
        },
        QTYinpt: {
            backgroundColor: '#E8E8E8',
            borderRadius: 8,
            width: 70
        },
        titles: {
            fontFamily: 'OpenSans',
            fontWeight: '700'
        },
        removeBtn: {
            padding: 10,
            borderRadius: 8,
            backgroundColor: '#4dc6e1',
            elevation: 6,
        },
        removeText: {
            fontFamily: 'OpenSans',
            fontWeight: '700',
            color: '#fff'
        },
        updateQuantityBtn: {
            width: 70,
            height: 40,
            borderRadius: 8,
            elevation: 6,
            marginTop: 8,
            backgroundColor: '#d6bb11',
            justifyContent: 'center',
            alignItems: 'center'
        },
        updateQuantityBtnTxt: {
            color: '#fff',
            fontFamily: "OpenSans"
        },
        addBtnfromFav: {
            marginTop: 10,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            backgroundColor: '#212221',
        },
        iconWrapper: {
            backgroundColor: 'transparent',
            width: 45,
            height: 45,
            borderRadius: 22.5,
            justifyContent: 'center',
            alignItems: 'center'
        }
    });

