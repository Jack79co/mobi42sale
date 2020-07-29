import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, StatusBar } from 'react-native'

const DEVICE_WIDTH = Dimensions.get("window").width;


const HotOffers = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { images } = props;
    return (
        <View style={{ height: "100%", width: "100%" }}>
            <StatusBar barStyle="light-content" backgroundColor="gray" />
            <ScrollView horizontal pagingEnabled>
                {images.map(image => (
                    <Image
                        key={image}
                        source={image}
                        style={styles.backgroundImage}
                    />
                ))}
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: DEVICE_WIDTH,
        height: "22%",

    }

})
export default HotOffers
