import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Image, Text, FlatList, ActivityIndicator } from 'react-native';
import HeaderComponent from '../header/HeaderComponent';
import { connect } from 'react-redux';






const Brands = (props) => {

    const category_id = props.navigation.getParam('category_id');


    const [accessoriesBrands, setAccessoriesBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const getSubCategory = async () => {
        const url = props.domain + '/api/SubCategories/GetAllSubCategoryByCategoryId/' + category_id;
        await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setAccessoriesBrands(responseJson)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            })
    }


    useEffect(() => {
        getSubCategory()
    }, [])

    return (
        <View style={styles.container}>
            <HeaderComponent navigation={props.navigation} name="md-arrow-back" />
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <Text style={styles.title}>BRANDS</Text>
            </View>

            {isLoading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color="#4dc6e1" />
                </View> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        data={accessoriesBrands}
                        keyExtractor={(x, i) => i.toString()}
                        numColumns={3}
                        renderItem={({ item }) => {
                            return (   
                                <View style={{ marginVertical: 8, marginHorizontal: 8 }}>
                                    <TouchableHighlight underlayColor='#f2f2f2'
                                        onPress={() => props.navigation.navigate('Accessories', {
                                            subCategory_id: item.pk_Subcategories_Id
                                        })}>
                                        <View style={styles.contentWrapper}>
                                            <View style={styles.imageWrapper}>
                                                <Image resizeMode='contain' style={styles.image}
                                                    source={{ uri: props.imagePath + item.ImageUrl }} />
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            )
                        }}
                    />
                </View>}
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        domain: state.domainReducer.domainName,
        imagePath: state.domainReducer.imagePath
    }

}

export default connect(mapStateToProps)(Brands);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontFamily: 'Lobster-Regular',
        fontSize: 30
    },
    contentWrapper: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 100,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2.5,
    },
    imageWrapper: {
        width: 85,
        height: 90
    },
    image: {
        width: null,
        height: null,
        flex: 1
    }

});



