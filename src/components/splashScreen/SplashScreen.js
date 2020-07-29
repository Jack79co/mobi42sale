import React from 'react';
import { View, Text, StatusBar, Image } from 'react-native';

class SplashScreen extends React.Component {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                1500
            )
        )
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.props.navigation.navigate('App');  
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <View style={styles.logoWrapper}>
                    <Image
                        resizeMode='contain'
                        source={require('../../assets/logo.png')}
                        style={styles.logo}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBF3FA'
    },
    logoWrapper: {
        width: 180,
        height: 180
    },
    logo: {
        width: null,
        height: null,
        flex: 1
    }
}

export default SplashScreen;
// import React, { Component } from 'react';
// import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';

// const SplashScreen = () => {
//     return (

//     );
// };


// const styles = StyleSheet.create({

// });


// export default SplashScreen;
