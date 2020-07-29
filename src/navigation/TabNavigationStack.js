import React, { Fragment } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../Tabs/Home';




const TabNavigator = createBottomTabNavigator({
  Home: Home,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
    
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === 'Home') {
          iconName = `md-home`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.

        } else if (routeName === 'Receipts') {
          iconName = `md-list-box`;
        }
        else {
          iconName = `md-paper`
        }

        // You can return any component that you like here!
        return (
          <View>
            <IconComponent name={iconName} size={25} color={tintColor} />
          </View>


        )
      },
    }),
    tabBarOptions: {
      activeTintColor: '#00687d',
      inactiveTintColor: 'gray',
      style: {
        marginBottom: 10,
        paddingTop: 10
      }
    },
  });


export default createAppContainer(TabNavigator);