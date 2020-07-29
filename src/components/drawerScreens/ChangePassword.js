import React, { Component, useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Form, Item, Label, Input, Button, Header } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';




const ChangePassword = (props) => {

    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();


    const handleChangePassword = () => {

        const url = props.domain + '/api/Account/ChangePassword';
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': props.token,
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                OldPassword: oldPassword,
                NewPassword: newPassword,
                ConfirmPassword: confirmPassword,
            })
        })
            .then((response) => {
                if(response.status == 200){
                    Toast.show('password change successfully !', Toast.SHORT);
                    props.navigation.dispatch(NavigationActions.back());
                    return response.status
                }
                else {
                    alert("Something went wrong check and try again")
                    return response.status
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


    return (
        <View style={styles.container}>
            <Header iosBarStyle='light-content' androidStatusBarColor="#4dc6e1" style={styles.headerWrapper}>
                <TouchableOpacity
                    style={styles.backButtonWrapper}
                    onPress={() => props.navigation.goBack()}>
                    <Icon name='md-arrow-back' size={25} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Change Password</Text>
            </Header>

            <View style={{ flex: 1 }}>

                <Form style={{ paddingTop: 25 }}>
                    <Item style={{ marginTop: 15 }} stackedLabel>
                        <Label style={styles.Label}>Old Password</Label>
                        <View style={styles.InputWrapper}>
                            <Input
                                style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                placeholder='Type your old password'
                                onChangeText={(oldPassword) => setOldPassword(oldPassword)}
                                value={oldPassword}
                            />
                        </View>

                    </Item>
                    <Item style={{ marginTop: 15 }} stackedLabel>
                        <Label style={styles.Label}>New Password</Label>
                        <View style={styles.InputWrapper}>
                            <Input
                                style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                placeholder='Type your new password'
                                onChangeText={(newPassword) => setNewPassword(newPassword)}
                                value={newPassword}
                            />
                        </View>

                    </Item>
                    <Item style={{ marginTop: 15 }} stackedLabel>
                        <Label style={styles.Label}>Confirm Password</Label>
                        <View style={styles.InputWrapper}>
                            <Input
                                style={{ fontSize: 16, fontFamily: 'Opensans' }}
                                placeholder='Confirm your new password'
                                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                                value={confirmPassword}
                            />
                        </View>

                    </Item>
                </Form>
                <View style={{ paddingTop: 25 }}>
                    <Button
                        onPress={() => handleChangePassword()}
                        style={styles.LoginButton}>
                        <Text style={styles.ButtonText}>Save</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};


const mapStateToProps = (state) => {
    return {
        domain: state.domainReducer.domainName,
        imagePath: state.domainReducer.imagePath,
        token: state.domainReducer.Token
    }

}

export default connect(mapStateToProps)(ChangePassword);

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    LoginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
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
});



