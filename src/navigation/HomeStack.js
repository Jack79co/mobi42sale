import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigationStack from "./TabNavigationStack";
import Mobiles from "../components/mobiles/Mobiles";
import CartScreen from "../components/cart/CartScreen";
import { fromRight, fromBottom } from "react-navigation-transition-config";
import Authentication from '../components/authentication/Authentication';
import Brands from '../components/accessories/Brands';
import Accessories from "../components/accessories/Accessories";
import ItemDetails from "../components/itemDetails/ItemDetails";
import SplashScreen from "../components/splashScreen/SplashScreen";
import FavoritesScreen from "../components/favorites/FavoritesScreen";
import Loading from "../components/loading/Loading";
import DrawerNavigationStack from "./DrawerNavigationStack";



const MainNavigator = createStackNavigator({
  TabNavigator: { screen: DrawerNavigationStack },
  CartScreen: { screen: CartScreen },
  FavoritesScreen: { screen: FavoritesScreen },
  Mobiles: { screen: Mobiles },
  Brands: { screen: Brands },
  Accessories: { screen: Accessories },
  ItemDetails: { screen: ItemDetails },
  AuthStack: { screen: Authentication }

}, {
  transitionConfig: () => fromRight(500),
  headerMode: 'none',
});

const MainStack = createAppContainer(MainNavigator);

const AuthStack = createStackNavigator({
  Authentication: { screen: Authentication },
}, {
  headerMode: 'none',
  initialRouteKey: 'jack'
})

const HomeStack = createAppContainer(
  createSwitchNavigator({
    Splash: SplashScreen,
    //Auth: AuthStack,
    App: MainStack,
    Loading: Loading,
    Auth: AuthStack
  }, {
    transitionConfig: () => fromBottom(500),
    headerMode: 'none',
  })
);

export default HomeStack;