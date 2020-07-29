import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const MenuButton = (props) => {
    return (
        <TouchableOpacity onPress={() => { props.navigation.toggleDrawer() }} style={styles.MenuButton}>
            <Icon size={25} name="md-menu" color="gray" />
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    MenuButton: {
        zIndex: 9,
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MenuButton;