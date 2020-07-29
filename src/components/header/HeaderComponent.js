import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header, Left, Body } from 'native-base';
import CartIcon from '../cart/CartIcon';
import FavoritesIcon from '../favorites/FavoritesIcon';
import MenuButton from '../menuButton/MenuButton';
import ForwardBackButton from '../menuButton/ForwardBackButton';





const HeaderComponent = ({ navigation, homePage }) => {



    return (
        <View style={styles.headerView}>

            <Header
                androidStatusBarColor="#fff"
                iosBarStyle = "dark-content"   
                style={styles.headerWrapper}>
                <View style={styles.HomeText}>
                    {homePage ?
                        <MenuButton navigation={navigation} />
                        : <ForwardBackButton navigation={navigation} />

                    }
                </View>
                <Body>
                    <Text style={styles.pageTitle}>Mobi2Sale</Text>
                </Body>
                <Left style={{ flexDirection: 'row', alignItems: 'center', marginRight: 40 }}>

                    <FavoritesIcon navigation={navigation} />
                    {/* cart component */}
                    <CartIcon navigation={navigation} />



                </Left>



            </Header>
        </View>


    )

}



const styles = StyleSheet.create({
    HomeText: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerView: {
        borderWidth: .3,
        borderColor: '#fff',
        marginRight: 15,
        marginLeft: 15,
    },
    headerWrapper:
    {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    backButtonWrapper: {

        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageTitle:
    {
        fontSize: 15,
        color: 'gray',
    },

})

export default HeaderComponent;