import React, { Component } from 'react';
import {  View, Text, StyleSheet, BackHandler, Linking } from "react-native";
import { AppColor, Red, screenHeight, White } from "../../../components/Styles";
import { Button, Container,  Toast } from 'native-base';
import Header from '../../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

export default class RecipesDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentWillMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () => {
            BackHandler.addEventListener('hardwareBackPress', () => {
                this.props.navigation.goBack()
                return true;
            });
        })
    }



    handlelink = (link) => {
        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            } else {
                Toast.show({
                    position: "top", type: "success",
                    text: 'sorry link is not supported', textStyle: { color: White, textAlign: 'center', },
                    duration: 3000,
                    style: { backgroundColor: Red, width: "60%", alignSelf: "center", borderRadius: 10 }
                })
            }
        });
    };

    render() {
        let item = this.props.navigation.getParam("item")
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <Container>

                    <Header title={'Recipes Details'} back={() => this.props.navigation.goBack()} />
                    <ScrollView>

                        <View>
                            <FastImage resizeMode={FastImage.resizeMode.cover} style={styles.img} source={{ uri: item.recipe.image }} />
                            <View style={styles.DetailsWrap}>
                                <Text style={styles.label}>{item.recipe.label}</Text>

                                <View style={{ marginVertical: '4%' }}>
                                    <Text style={styles.title}>Calories / Total Weight : </Text>
                                    <Text style={styles.desc}>{item.recipe.calories} / {item.recipe.totalWeight}</Text>
                                </View>

                                <View style={{ marginVertical: '4%' }}>
                                    <Text style={styles.title}>Total Time</Text>
                                    <Text style={styles.desc}>{item.recipe.totalTime}</Text>
                                </View>

                                <Button onPress={() => this.handlelink(item.recipe.url)} style={styles.btn}>
                                    <Text style={styles.btnTxt}>Recipe Website</Text>
                                </Button>

                            </View>
                        </View>


                    </ScrollView>

                </Container>
            </SafeAreaView>


        )

    }
}


const styles = StyleSheet.create({
    img: {
        width: "100%", height: screenHeight / 3, alignSelf: "center", resizeMode: "contain"
    },
    DetailsWrap: { marginTop: '5%', paddingHorizontal: "3%" },
    label: { textAlign: "left", fontWeight: '900' },
    title: { textAlign: "left", fontWeight: '700' },
    desc: { textAlign: "left", },
    btn: {
        width: "50%", height: 60, borderWidth: .5, borderColor: AppColor,
        backgroundColor: AppColor, alignSelf: "center", justifyContent: "center", marginTop: "5%"
    },
    btnTxt: { textAlign: "center", fontWeight: 'bold', color: White }


});

