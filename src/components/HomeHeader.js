import React from 'react';
import { View, StyleSheet, Image, Text, } from "react-native";
import { Button, } from 'native-base';
import { screenWidth, AppColor} from './Styles';

const HomeHeader = (props) => (
    <View style={styles.header}>
    <Text style={styles.title}>{props.title}</Text>

    <Button onPress={()=>props.navigation.navigate("Cart")} transparent style={styles.btn}>
        <Image style={styles.cartImage}source={require('../images/cart.png')}/>
    </Button>
</View>
)

const styles = StyleSheet.create({
    header: {
        width: "95%", flexDirection: "row", justifyContent: "space-between", height: 60, alignContent: 'center',
        alignItems: 'center', paddingHorizontal: "5%",
    },
    title: {
        fontSize: screenWidth / 22, color: AppColor
    },
    btn:{width:20,height:20,alignSelf:'center',justifyContent:"center"},
    cartImage:{width:20,height:20}
});
export default HomeHeader;


