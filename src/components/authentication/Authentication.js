import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar, Modal, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, View, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation';





class Authentication extends Component {
    state = {
        username: "",
        password: "",
        errorMessage: null,
        loading: true,
        passwordVisibility: true,
        icon: "md-eye",
        isModalVisible: false,
    }


    async getFavorites() {
        const url = this.props.domain + '/api/Favorites/GetAllFavoritesToClient/1';
        await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': this.props.token,
                "Content-Type": "application/json"
            },
        })
            .then((response) =>
                response.json())

            .then((responseJson) => {

                responseJson.map(item => {
                    this.props.addToFav(item)
                })

            })
            .catch(error => {
                console.error(error);
            })
    }





    postFcmToken() {
        const url = this.props.domain + '/api/Notifications/SaveDeviceToken';

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': this.props.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                DeviceToken: this.props.fcmToken
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //  
            })

            .catch(error => {
                console.error(error);
            })
    }


    //////////////////////////handle login///////////////////////////////////////

    openModalAndLogin = async () => {
        this.setState({ isModalVisible: true })
        this.handleLogin()
    }

    handleLogin = async () => {
        const url = this.props.domain + '/token';
        let details = {
            'username': this.state.username,
            'email': this.state.username,
            'password': this.state.password,
            'grant_type': 'password'
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);

        }
        formBody = formBody.join("&");

        await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody

        }).then(res => {
            if (res.status === 200) {
                return (res.json())

            } else {
                return this.setState({
                    errorMessage: "Invalid username or password.",
                    isModalVisible: false
                })
            }
        })
            .then((responseData) => {
                // console.log("Response" + JSON.stringify("bearer " + responseData.access_token))  
                if (responseData) {
                    AsyncStorage.setItem("user", responseData.access_token);
                    this.props.navigation.dispatch(NavigationActions.back());
                    this.setState({ isModalVisible: false })


                    this.props.setToken(responseData.access_token)
                    this.postFcmToken()
                    this.getFavorites()

                } else null

            })
            .catch((error) => {
                console.error(error);
            });
    }
    /////////////////////////////////////////////////////////////////




    handleShowHidePassword() {
        this.setState(prevState => ({
            icon: prevState.icon === "md-eye-off" ? "md-eye" : "md-eye-off",
            passwordVisibility: !prevState.passwordVisibility
        }))
    }


    render() {
        return (
            <View style={{ flex: 1 }}>


                <Modal animationType="fade" transparent={true}
                    visible={this.state.isModalVisible}>
                    <View style={styles.modalWrapper}>
                        <ActivityIndicator size="large" color="#4dc6e1" />      
                    </View>
                </Modal>



                <Header iosBarStyle='dark-content' androidStatusBarColor="#fff" style={styles.headerWrapper}>
                    <TouchableOpacity
                        style={styles.backButtonWrapper}
                        onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                        <Icon name='md-arrow-back' size={25} color='black' />
                    </TouchableOpacity>
                </Header>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container} keyboardShouldPersistTaps={"always"}>
                    <StatusBar backgroundColor="#fff" barStyle="dark-content" />


                    <View style={{ flex: 1 }}>  



                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 200, height: 200 }} source={require('../../assets/logo.png')} />
                        </View>


                        <Form style={{ paddingTop: 25 }} >
                            <Item style={{ marginTop: 15 }} stackedLabel>
                                <Label style={styles.Label}>Username</Label>
                                <View style={styles.InputWrapper}>
                                    <Icon size={22} name='md-person' />
                                    <Input
                                        style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                        placeholder='Type your username'
                                        onChangeText={(username) => this.setState({ username: username })}
                                        value={this.state.email}
                                    />
                                </View>

                            </Item>
                            <Item style={{ marginTop: 15 }} stackedLabel>
                                <Label style={styles.Label}>Password</Label>
                                <View style={styles.InputWrapper}>
                                    <Icon size={22} name='md-lock' />
                                    <Input
                                        style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                        placeholder='Type your password'
                                        onChangeText={(password) => this.setState({ password: password })}
                                        value={this.state.password}
                                        secureTextEntry={this.state.passwordVisibility}
                                    />
                                    <TouchableWithoutFeedback onPress={() => this.handleShowHidePassword()} style={styles.eyeIcon}>
                                        <Icon name={this.state.icon} size={22} color="gray" />
                                    </TouchableWithoutFeedback>

                                </View>
                            </Item>
                            <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: 'gray', fontSize: 14 }}>Forgot password?</Text>
                            </TouchableOpacity>
                        </Form>

                        <View style={{ paddingTop: 25 }}>
                            <Button
                                onPress={() => this.openModalAndLogin()}
                                style={styles.LoginButton}>
                                <Text style={styles.ButtonText}>Login</Text>
                            </Button>
                        </View>
                        <Text style={{ paddingTop: 10, color: 'red', alignSelf: 'center' }}>{this.state.errorMessage}</Text>


                    </View>

                </KeyboardAwareScrollView>
            </View>



        );
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.domainReducer.Token,
        domain: state.domainReducer.domainName,
        fcmToken: state.domainReducer.fcmToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: token }),
        addToFav: (item) => dispatch({ type: 'ADD_TO_FAV', payload: item }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

const styles = StyleSheet.create({
    headerWrapper:
    {
        elevation: 0,
        borderBottomColor: 'transparent',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: "transparent"
    },
    backButtonWrapper: {
        marginTop: 4,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: 'transparent',
        borderRadius: 30,

    },
    container: {
        flex: 1,
        padding: 25,
    },
    welcomeText: {
        fontFamily: 'OpenSans',
        fontSize: 30,
        marginTop: 20,
    },
    welcomingSentence: {
        color: 'gray',
        fontSize: 14,
        paddingTop: 8
    },
    salesmanIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40
    },
    Label: {
        color: 'black',
        fontFamily: 'Opensans',
        fontSize: 16
    },
    InputWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 0,
        marginLeft: 0,
        backgroundColor: '#4dc6e1',
        height: 50,
        borderRadius: 5,
    },
    ButtonText: {
        fontFamily: 'Opensans',
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    },
    SignUpWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    SignUpQuestionText: {
        color: 'gray',
        fontSize: 14,
    },
    SignUpText: {
        color: '#4dc6e1',
        fontSize: 15
    },
    errorMessage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        textAlign: 'center'
    },
    eyeIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalWrapper: {
        backgroundColor: "#000000aa",
        position: "absolute",
        top: "50%",
        left: "40%",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 10
    },
});







