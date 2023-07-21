import React from 'react';
import { View, Image, StyleSheet, } from 'react-native';
import { Text, Left, Right } from "native-base";
import { screenHeight, grey, AppColor } from './Styles';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
const ItemView = (props) => (
    <TouchableOpacity onPress={props.navigation}>
    <View style={Compstyles.container}>
        <Left style={Compstyles.left}>
            <FastImage  resizeMode={FastImage.resizeMode.contain} style={Compstyles.img} source={{uri:props.item.recipe.image}}/>
        </Left>
        <Right style={Compstyles.right}>
            <Text style={Compstyles.label}>{props.item.recipe.label}</Text>
            <Text style={Compstyles.txt}>{props.item.recipe.source}</Text>
        </Right>
    </View>
    </TouchableOpacity>


);
const Compstyles = StyleSheet.create({
    container: { width: "95%", alignSelf: "center", borderWidth: .5, borderColor: grey, height: screenHeight / 5, flexDirection: "row", padding: "2%",marginBottom:'1%' },
    right: { flex: 1, paddingHorizontal: '1%' },
    left: { flex: .5, borderWidth: .5, borderColor: grey, padding: '5%' },
    label: { alignSelf: "flex-start",fontWeight:'500',color:AppColor },
    txt: { alignSelf: "flex-start" ,marginTop:10},
    img:{ width: "100%", height: "90%", alignSelf: "center", resizeMode: "contain"}


});
export default ItemView;