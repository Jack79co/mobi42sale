import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Picker, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Content, Item, Button } from 'native-base';
import HeaderComponent from '../header/HeaderComponent';
import { connect } from 'react-redux';
import Products from '../products/Products';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from 'native-base';




const Mobiles = (props) => {

    const [modalVisible, setModalVisable] = useState(false);
    const [allItems_Mobiles, setAllItems_Mobiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [brands, setBrands] = useState('');
    const [koko, setKoko] = useState(true);

    const [pageNumber, setPageNumber] = useState(1);




    const getAllItems_Mobiles = () => {
        const url = props.domain + '/api/Items/GetIAllItemsInMobileCategory/' + pageNumber + brands;
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': props.token,
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.map(element => {
                    element.isCart = false
                })
                setAllItems_Mobiles(allItems_Mobiles.concat(responseJson))
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        getAllItems_Mobiles()
    }, [brands, koko])

    //for filter brands
    const filterBrands = (filter) => {
        setBrands(filter)
        setModalVisable(false)
    }


    const handleLoadMore = async () => {
        await setPageNumber(pageNumber + 1)
        koko ? setKoko(false) : setKoko(true)
    }


    
    return (
        
        <View style={{ flex: 1, backgroundColor: '#f5f5f5', }}>
            <HeaderComponent navigation={props.navigation} name="md-arrow-back" />
            {isLoading ?
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" color="#4dc6e1" />
                </View>
                :
                <Content contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false} style={{ paddingTop: 15, flex: 1 }}>

                    <Products
                        product={allItems_Mobiles}
                        handleAdd={props.addItemToCart}
                        navigation={props.navigation}
                        handleAddFav={props.addItemToFavorites}
                        handleCheckOutArray={props.addToCheckOutArray}
                        handleLoadMore={handleLoadMore}
                    />
                </Content>
            }
            {/* ----------------------filter button--------------------------- */}
            <TouchableOpacity
                onPress={() => setModalVisable(true)}
                style={styles.FloatingButtonWrapper}>
                <Icon size={25} color='#fff' name='md-funnel' />
            </TouchableOpacity>
            {/* ----------------------------------------------------------------- */}
            {/* ------------------open modal------------------------------ */}

            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisable(false)}
            >
                <View>
                    <Header androidStatusBarColor="#fff"
                        iosBarStyle="dark-content"
                        style={styles.headerWrapper}>
                        <TouchableOpacity
                            style={styles.backButtonWrapper}
                            onPress={() => setModalVisable(false)}>
                            <Icon name='md-arrow-back' size={26} color='#fff' />
                        </TouchableOpacity>
                        <Text style={styles.pageTitle}>Choose which brand</Text>
                    </Header>

                    <View style={{ paddingTop: 20 }}>
                        {/* All  */}
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={() => filterBrands('')}
                                style={styles.ButtonItSelf} block >
                                <Text style={styles.ButtonText}>All</Text>
                            </Button>
                        </View>
                        {/* Huawei */}
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={() => filterBrands('?filter=11')}
                                style={styles.ButtonItSelf} block >
                                <Text style={styles.ButtonText}>Huawei</Text>
                            </Button>
                        </View>
                        {/* Samsung */}
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={() => filterBrands('?filter=s')}
                                style={styles.ButtonItSelf} block >
                                <Text style={styles.ButtonText}>Samsung</Text>
                            </Button>
                        </View>
                        {/* iphone */}
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={() => filterBrands('?filter=i')}
                                style={styles.ButtonItSelf} block >
                                <Text style={styles.ButtonText}>Iphone</Text>
                            </Button>
                        </View>

                    </View>



                </View>

            </Modal>

            {/* -------------------------------close modal------------------------- */}

        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
        addToCheckOutArray: (object) => dispatch({ type: 'CHECK_OUT', payload: object }),
    }
}
const mapStateToProps = (state) => {
    return {
        domain: state.domainReducer.domainName,
        imagePath: state.domainReducer.imagePath,
        cartItems: state.cartItems,
        token: state.domainReducer.Token
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Mobiles);

const styles = StyleSheet.create({
    FloatingButtonWrapper: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#4dc6e1',
        borderRadius: 30,
        elevation: 8
    },
    // modal style
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
        borderRadius: 30,
    },
    pageTitle:
    {
        fontSize: 17,
        alignSelf: 'center',
        fontFamily: 'OpenSans',
        color: '#fff',
        marginLeft: 20,
    },
    buttonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        marginTop: 15
    },
    ButtonText: {
        fontFamily: 'OpenSans',
        fontSize: 19,
        color: '#fff',
    },
    ButtonItSelf: {
        backgroundColor: '#212221',
        borderRadius: 20,
    },
})


