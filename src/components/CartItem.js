import React from 'react';
import { View, Image, StyleSheet, I18nManager } from 'react-native';
import { Text, Left, Right, Button, Card } from "native-base";
import styles, { appFont, appFontBold, screenWidth, AppColor } from '../components/Styles';
import FastImage from 'react-native-fast-image';

const CartItem = (props) => (


    <Card style={Compstyles.Card}>
        <View style={Compstyles.imgView}>
            <FastImage resizeMode={FastImage.resizeMode.cover} style={Compstyles.img} source={{ uri: props.item.image }} />

        </View>
        <View style={Compstyles.itemContainer}>
            <View style={{ flexDirection: 'column', width: "95%", }}>

                <View style={{}}>
                    <Text style={Compstyles.label}>{props.item.name}</Text>
                    <Text style={Compstyles.label}>{props.item.info}</Text>
                </View>


                <View style={{ marginTop: 5 }}>
                    <Text style={Compstyles.label}>{props.item.price} Egp</Text>

                </View>

            </View>



            <View style={Compstyles.btnWrap}>
                <Button onPress={() => props.Increment()} transparent style={Compstyles.btn}>
                    <Image style={Compstyles.addImge} source={require('../images/12.png')} />
                </Button>
                <Text style={Compstyles.quantity}>{props.item.quatity}</Text>
                <Button onPress={() => props.Decrement()} transparent style={Compstyles.btn}>
                    <Image style={Compstyles.addImge} source={require('../images/13.png')} />
                </Button>
            </View>

        </View>

        <View style={Compstyles.trashView}>
            <Button onPress={() => props.delete()} transparent style={Compstyles.trashBtn}>
                <Image style={Compstyles.trashImg} source={require('../images/trash.png')} />
            </Button>
        </View>

    </Card>

);
const Compstyles = StyleSheet.create({
    img: {
        width: "100%", height: "100%", alignSelf: "center", resizeMode: 'cover', borderRadius: 5

    },
    itemContainer: { width: "68%", flexDirection: "column", justifyContent: "flex-start", marginHorizontal: 5 },

    imgView: { alignSelf: "flex-start", justifyContent: "center", width: "22%", height: 100 },

    Card: {
        backgroundColor: "#fff", borderRadius: 5, flexDirection: "row", width: '95%',
        alignSelf: "center", padding: "2%", marginVertical: '1%'
    },

    label: {
        fontFamily: appFontBold, textAlign: "left", textAlignVertical: "center", marginTop: 5,
        marginLeft: 3, color: AppColor, fontSize: screenWidth / 32,
    },

    btnWrap: { width: "100%", flexDirection: "row", justifyContent: 'flex-start', marginTop: '3%' },

    btn: {
        backgroundColor: 'rgba(157, 78, 221, 0.05);', justifyContent: 'center', alignSelf: "center",
        height: 35, width: 35, borderRadius: 5, marginHorizontal: "2%"
    },

    addImge: {
        width: 10, height: 10, resizeMode: "center", alignSelf: "center", marginHorizontal: 1,
        tintColor: '#000'
    },

    quantity: {
        fontFamily: appFont, color: AppColor, textAlign: "center", marginHorizontal: "2%",
        alignSelf: "center"
    },

    trashView: { alignSelf: "flex-start", justifyContent: "center", width: "8%", marginRight: 15 },

    trashBtn: { justifyContent: 'center', alignSelf: "center", height: 35, width: 35, marginHorizontal: 5 },

    trashImg: { width: 20, height: 20, resizeMode: "contain", alignSelf: "center", marginHorizontal: 1, }
});
export default CartItem;