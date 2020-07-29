import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';




const CartIcon = (props) => {



    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('CartScreen', {
            isCartScreen: true
        })}>
            <View style={styles.badge}>
                <Text style={{ color: '#fff' }}>{props.cartItems.length}</Text>
            </View>
            <View style={styles.iconWrapper}>
                <Icon size={25} name="md-cart" color="gray" />
            </View>
        </TouchableOpacity>
    )
}


const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems
    }
}

export default connect(mapStateToProps)(CartIcon);


const styles = StyleSheet.create({
    badge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 35,
        bottom: 20,
        zIndex: 99999,
        borderColor: 'gray',
        borderWidth: .1
    },
    iconWrapper: {
        backgroundColor: 'transparent',  
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22.5,
        marginLeft: 10
    }
})

