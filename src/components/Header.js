import React from 'react';
import { View, StyleSheet, Image, Text, } from "react-native";
import { Button, } from 'native-base';
import { White,  screenHeight ,black} from './Styles';

const Header = (props) => (
    <View style={styles.container}>
        {props.back &&
            <View style={styles.btnView}>
                <Button transparent onPress={() => props.back()} style={styles.btn}>
                    <Image source={require("../images/back.png")} style={styles.img} />
                </Button>
            </View>
        }

        <View style={styles.txtView}>
            <Text style={styles.title}>{props.title}</Text>
        </View>

        <Button onPress={()=>props.navigation.navigate("Cart")} transparent style={styles.btn}>
        <Image style={styles.cartImage}source={require('../images/cart.png')}/>
    </Button>
    </View>
)

const styles = StyleSheet.create({
    container: {
        width: "100%", flexDirection: "row", justifyContent: 'space-between',
        alignSelf: 'center', height: screenHeight / 9, backgroundColor: White,paddingHorizontal:"5%",alignContent:"center",alignItems:"center"
    },
    btnView:{ alignSelf: 'center',justifyContent:"center",marginTop:"1%" },
    btn: {
        alignSelf: "center", width: 30, height: 30, justifyContent: "center"
    },
    img: {
        width: 15, height:15, resizeMode: "contain", alignSelf: "center", tintColor: black

    },
    txtView: {
         alignSelf: 'center', justifyContent: 'center'
    },
    title: {
        color: black, textAlign: 'center',textAlignVertical:"center"
    },
    btn:{width:20,height:20,alignSelf:'center',justifyContent:"center"},
    cartImage:{width:20,height:20,alignSelf:"center",resizeMode:"contain"}
});
export default Header;


