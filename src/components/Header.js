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
    </View>
)

const styles = StyleSheet.create({
    container: {
        width: "100%", flexDirection: "row", justifyContent: 'flex-start',
        alignSelf: 'center', height: screenHeight / 9, backgroundColor: White
    },
    btnView:{width: "25%", alignSelf: 'center' },
    btn: {
        alignSelf: "flex-start", width: 30, height: 30, justifyContent: "center", marginLeft: '3%'
    },
    img: {
        width: "90%", height: "90%", resizeMode: "contain", alignSelf: "center", tintColor: black

    },
    txtView: {
        width: "50%", alignSelf: 'center', justifyContent: 'center'
    },
    title: {
        color: black, textAlign: 'center'
    },
});
export default Header;


