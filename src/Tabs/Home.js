import React, { Component } from 'react';
import { Text, View, StatusBar, StyleSheet, Image, TouchableWithoutFeedback, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';
import HotOffers from '../components/hotOffers/HotOffers';
import HeaderComponent from '../components/header/HeaderComponent';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import messaging, { firebase } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';








class Home extends Component {

    state = {
        categories: [],
        isLoading: true,
    }


    


    /////////////////////////////////////////////////////////////////////////////////////
    getCategories() {
        const url = this.props.domain + '/api/Categories/GetAllCategories';
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    categories: responseJson,
                })
            })

            .catch(error => {
                console.error(error);  
            })
    }
    /////////////////////////////////////////////////////////////////////////////////////
    componentDidMount() {
        this.getCategories()
        this.checkPermission();
        this.createNotificationListeners();
          
    }

    componentWillMount() {
        this.notificationListener;
        this.notificationOpenedListener;
    }


    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }


    async getToken() {

        let fcmToken = await AsyncStorage.getItem('fcmToken');
        this.props.setFcmToken(fcmToken)
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }


    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }


    async createNotificationListeners() {
        this.notificationListener = firebase.messaging().onMessage(onMessageReceived);


        function onMessageReceived(message) {
            Alert.alert(
                message.notification.title,
                message.notification.body,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }



        this.notificationOpenedListener = firebase.messaging().onNotificationOpenedApp((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            console.log(
                'Notification caused app to open from background state:',
                notificationOpen.notification,
            );
        });


        const notificationOpen = await firebase.messaging().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;

        }

        messageListener = firebase.messaging().setBackgroundMessageHandler((message) => {

            console.log(JSON.stringify(message));
        });


    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                {/* header component */}
                <HeaderComponent navigation={this.props.navigation} homePage={true} />
                <Content showsVerticalScrollIndicator={false}>

                    {/* hot offers component */}
                    {/* <HotOffers images={images} /> */}
                    <Image style={{ width: "100%", height: 120, marginTop: 30, justifyContent: 'space-evenly' }} source={require('../assets/1.jpg')} />


                    <View style={styles.categoriesWrapper}>
                        <TouchableWithoutFeedback onPress={() => navigate('Mobiles')}>
                            <View style={styles.specificCategoryWrapper}>
                                {this.state.isLoading ?
                                    <View>
                                        <ActivityIndicator />
                                    </View> :
                                    <View style={{ marginTop: -10 }}>
                                        <Text style={styles.categoryName}>{this.state.categories[0].Name}</Text>
                                        <View style={styles.categoryImageWrapper}>
                                            <Image resizeMode="contain" style={styles.categoryImage}
                                                source={{ uri: this.props.imagePath + '/' + this.state.categories[0].ImageUrl }} />
                                        </View>
                                    </View>
                                }
                            </View>

                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigate('Brands', {
                            category_id: this.state.categories[1].pk_Categories_Id
                        })}>
                            <View style={styles.specificCategoryWrapper}>
                                {this.state.isLoading ?
                                    <View>
                                        <ActivityIndicator />
                                    </View> :
                                    <View style={{ marginTop: -10 }}>
                                        <Text style={styles.categoryName}>{this.state.categories[1].Name}</Text>
                                        <View style={styles.categoryImageWrapper}>
                                            <Image resizeMode="contain" style={styles.categoryImage}
                                                source={{ uri: this.props.imagePath + '/' + this.state.categories[1].ImageUrl }} />
                                        </View>
                                    </View>}

                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View >


                        {/* <Text style={{ color: 'gray', fontSize: 14, marginLeft: 20, }}>Best Sellers</Text>
                        <BestSellers /> */}
                    </View>

                </Content>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        domain: state.domainReducer.domainName,
        imagePath: state.domainReducer.imagePath
    }

}

 const mapDispatchToProps = (dispatch) => {
    return {
        setFcmToken: (Ftoken) => dispatch({ type: 'SET_FCM_TOKEN', payload: Ftoken }),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    categoryName:
    {
        alignSelf: 'center',
        marginTop: 10,
        fontFamily: 'OpenSans',
        fontSize: 16
    },
    categoriesWrapper: {
        marginVertical: 25,
        flexDirection: 'row',
        marginHorizontal: 15,
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center'
    },
    specificCategoryWrapper:
    {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
        width: 160,
        height: 190,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryImageWrapper: {
        width: 120,
        height: 120,
        marginTop: 10
    },
    categoryImage:
    {
        width: null,
        height: null,
        flex: 1
    },
})











