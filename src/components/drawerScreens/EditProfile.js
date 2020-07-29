import React, { Component, useCallback } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Form, Item, Label, Input, Button, Header } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';




class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            email: "",
            managerName: "",
            mobile1: "",
            mobile2: "",
            phone: "",
            fax: "",
            token: null,
        };
    }


    componentDidMount() {
        this.loadInitialState()
    }
    loadInitialState = async () => {

        var value = await AsyncStorage.getItem('user');
        this.setState({
            token: value
        })

    }





    handleEditProfile = async () => {

        const url = this.props.domain + '/api/Clients/ClientEditProfile';
        await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': this.props.token,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Name: this.state.userName,
                Email: this.state.email,
                ManagerName: this.state.managerName,
                Mobile1: this.state.mobile1,
                Mobile2: this.state.mobile2,
                Phone: this.state.phone,
                Fax: this.state.fax
            })
        })
            .then((response) => {
                if (response.status == 200) {
                    Toast.show('profile change successfully !', Toast.SHORT);
                    this.props.navigation.dispatch(NavigationActions.back());
                    return response.json()
                }
                else {
                    alert("Something went wrong check and try again")
                    return response.json()
                }
            })

            .then((responseData) => {
                console.log(
                    "Response Body -> " + JSON.stringify(responseData))

            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header iosBarStyle='light-content' androidStatusBarColor="#4dc6e1" style={styles.headerWrapper}>
                    <TouchableOpacity
                        style={styles.backButtonWrapper}
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name='md-arrow-back' size={25} color='#fff' />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Edit profile</Text>
                </Header>

                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container} keyboardShouldPersistTaps={"always"}>

                    <View style={{ flex: 1 }}>

                        <Form style={{ paddingTop: 25 }}>
                            <Item style={{ marginTop: 15 }} stackedLabel>
                                <Label style={styles.Label}>Username</Label>
                                <View style={styles.InputWrapper}>
                                    <Input
                                        ref="userName"
                                        style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                        placeholder='Type your username'
                                        onChangeText={(userName) => this.setState({ userName: userName })}
                                        value={this.state.userName}
                                    />
                                </View>
                            </Item>



                            <Item style={{ marginTop: 15 }} stackedLabel>
                                <Label style={styles.Label}>Email</Label>
                                <View style={styles.InputWrapper}>
                                    <Input
                                        ref="email"
                                        style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                        placeholder='Type your email'
                                        onChangeText={(email) => this.setState({ email: email })}
                                        value={this.state.email}
                                    />
                                </View>

                            </Item>



                            <Item style={{ marginTop: 15 }} stackedLabel>
                                <Label style={styles.Label}>Manager Name</Label>
                                <View style={styles.InputWrapper}>
                                    <Input
                                        style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                        placeholder='Type your Manager Name'
                                        onChangeText={(managerName) => this.setState({ managerName: managerName })}
                                        value={this.state.managerName}
                                    />
                                </View>

                            </Item>


                            <Item style={{ marginTop: 15 }} stackedLabel>
                                <Label style={styles.Label}>Mobile1</Label>
                                <View style={styles.InputWrapper}>
                                    <Input
                                        style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                        placeholder='Type your mobile1'
                                        onChangeText={(mobile1) => this.setState({ mobile1: mobile1 })}
                                        value={this.state.mobile1}
                                    />
                                </View>

                            </Item>


                            <Item style={{ marginTop: 15 }} stackedLabel>
                                <Label style={styles.Label}>Mobile2(optional)</Label>
                                <View style={styles.InputWrapper}>
                                    <Input
                                        style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                        placeholder='Type your mobile2'
                                        onChangeText={(mobile2) => this.setState({ mobile2: mobile2 })}
                                        value={this.state.mobile2}
                                    />
                                </View>

                            </Item>

                            <Item style={{ marginTop: 15 }} stackedLabel>
                                <Label style={styles.Label}>Phone</Label>
                                <View style={styles.InputWrapper}>
                                    <Input
                                        style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                        placeholder='Type your phone'
                                        onChangeText={(phone) => this.setState({ phone: phone })}
                                        value={this.state.phone}
                                    />
                                </View>

                            </Item>


                            <Item style={{ marginTop: 15 }} stackedLabel>
                                <Label style={styles.Label}>Fax</Label>
                                <View style={styles.InputWrapper}>
                                    <Input
                                        style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                        placeholder='Type your fax'
                                        onChangeText={(fax) => this.setState({ fax: fax })}
                                        value={this.state.fax}
                                    />
                                </View>

                            </Item>



                        </Form>

                        <View style={{ paddingTop: 25 }}>
                            <Button
                                onPress={() => this.handleEditProfile()}
                                style={styles.LoginButton}>
                                <Text style={styles.ButtonText}>Submit</Text>
                            </Button>
                        </View>
                        <TouchableHighlight
                            underlayColor='#c8c8c8'
                            style={styles.changePasswordWrapper}
                            onPress={() => this.props.navigation.navigate('ChangePassword')}>
                            <Text>Change Your Password</Text>
                        </TouchableHighlight>

                    </View>

                </KeyboardAwareScrollView>

            </View>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        domain: state.domainReducer.domainName,
        token: state.domainReducer.Token
    }

}

export default connect(mapStateToProps)(EditProfile);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
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
    changePasswordWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 7,
        backgroundColor: 'transparent',
        marginHorizontal: 50
    },
    errorMessage: {
        marginLeft: 15,
        color: 'red',
        fontFamily: 'OpenSans'
    }
})