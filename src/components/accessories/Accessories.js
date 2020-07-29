import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import HeaderComponent from '../header/HeaderComponent';
import { connect } from 'react-redux';
import Products from '../products/Products';
import { Content } from 'native-base';
import { NavigationEvents } from 'react-navigation';


const Accessories = (props) => {

    const subCategory_id = props.navigation.getParam('subCategory_id');

    const [accessories, setAccessories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [koko, setKoko] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);



    const getItemsBySubCategoryId = async () => {
        const url = props.domain + '/api/Items/GetItemsBySubCategoryId/' + subCategory_id + '/' + pageNumber;
        await fetch(url, {
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
                setAccessories(accessories.concat(responseJson))
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            })
    }


    useEffect(() => {
        getItemsBySubCategoryId()
    }, [koko])

    const handleLoadMore = async () => {
        await setPageNumber(pageNumber + 1)
        koko ? setKoko(false) : setKoko(true) //        
    }

    return (
        

        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation} name="md-arrow-back" />
            <NavigationEvents onWillFocus={() => getItemsBySubCategoryId()} />

            {isLoading ?
                <View style={{ justifyContent: 'center', flex: 1 }}>  
                    <ActivityIndicator size="large" color="#4dc6e1" />
                </View> :
                <Content contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false} style={{ paddingTop: 15 ,flex:1 }}>
                    <Products
                        product={accessories}
                        handleAdd={props.addItemToCart}
                        navigation={props.navigation}
                        handleCheckOutArray={props.addToCheckOutArray}
                        handleLoadMore={handleLoadMore} />
                </Content>}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
});

const mapStateToProps = (state) => {
    return {
        domain: state.domainReducer.domainName,
        imagePath: state.domainReducer.imagePath,
        token: state.domainReducer.Token
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
        addToCheckOutArray: (object) => dispatch({ type: 'CHECK_OUT', payload: object })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accessories);
