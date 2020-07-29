import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import MenuDrawer from '../components/menuButton/MenuDrawer';
import TabNavigator from '../navigation/TabNavigationStack';
import HeaderComponent from '../components/header/HeaderComponent';
import Logout from '../components/drawerScreens/Logout';
import EditProfile from '../components/drawerScreens/EditProfile';
import Profile from '../components/drawerScreens/Profile';
import { createStackNavigator } from 'react-navigation-stack';
import ChangePassword from '../components/drawerScreens/ChangePassword';
import Order from '../components/drawerScreens/Orders';
import AsyncStorage from '@react-native-community/async-storage';
import OrderDetails from '../components/drawerScreens/OrderDetails';
import Receipts from '../components/drawerScreens/Receipts';
import Invoices from '../components/drawerScreens/Invoices';



var value = AsyncStorage.getItem('user');


const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH * 0.88,
    contentComponent: ({ navigation }) => {
        return (
            <MenuDrawer navigation={navigation} />
        );
    },

}

const StackScreens = createStackNavigator({
    Profile: {
        screen: Profile,
    },
    EditProfile: {
        screen: EditProfile
    },
    ChangePassword: {
        screen: ChangePassword
    }

}, {
    headerMode: 'none',
    initialRouteName: 'Profile'
})

const ordersStack = createStackNavigator({
    Orders: {
        screen: Order
    },
    OrderDetails: {
        screen: OrderDetails
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Orders',
})


const DrawerNavigtor = createDrawerNavigator({
    Tap: {
        screen: TabNavigator,
    },
    Home: {
        screen: HeaderComponent
    },
    Profile: {
        screen: StackScreens,
    },
    Orders: {
        screen: ordersStack
    },
    Receipts: {
        screen: Receipts
    },
    Invoices: {
        screen: Invoices
    },
    SignOut: {
        screen: Logout
    },
},

    DrawerConfig)





export default createAppContainer(DrawerNavigtor);

