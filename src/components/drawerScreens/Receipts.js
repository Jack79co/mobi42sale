import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions, StackActions, NavigationEvents } from 'react-navigation';












const Receipts = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [Receipts, setReceipts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [update, setUpdate] = useState(true);

    useEffect(() => {
        handleGetReceipts()
    }, [update])



    const handleLoadMore = () => {
        setPageNumber(pageNumber + 1)
        update ? setUpdate(false) : setUpdate(true)

    }



    const handleGetReceipts = async () => {

        const url = props.domain + '/api/Clients/GetAllClientReceipts/' + pageNumber;
        await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': props.token,
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setReceipts(Receipts.concat(responseJson))
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
                <Text style={styles.pageTitle}>Your Receipts</Text>
            </Header>
            <NavigationEvents onWillFocus={() => handleGetReceipts()} />
            {isLoading ?
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" color="#4dc6e1" />
                </View>
                :
                <View style={{ flex: 1, paddingTop: 10 }}>
                    <FlatList
                        style={{ paddingBottom: 110 }}
                        showsVerticalScrollIndicator={false}
                        onEndReached={() => handleLoadMore()}
                        onEndReachedThreshold={0.5}
                        data={Receipts}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.ItemWrapper}>
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.title}>Sales name :- </Text>
                                            <Text>{item.SalesmanName}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginVertical: 4, alignItems: 'center' }}>
                                            <Text style={styles.title}>Invoice Number :- </Text>
                                            <Text>{item.InvoiceNo}</Text>
                                        </View>
                                        <View style={{ marginVertical: 4 }}>
                                            <Text style={styles.title}>Payment date :- </Text>
                                            <Text>{item.PaymentDate}</Text>
                                        </View>
                                        <View style={{ marginVertical: 4, flexDirection: 'row', }}>
                                            <Text style={styles.title}>Amount :- </Text>
                                            <Text>{item.Amount}</Text>
                                        </View>

                                    </View>
                                </View>

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

export default connect(mapStateToProps)(Receipts);

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
        fontSize: 12
    }
});



