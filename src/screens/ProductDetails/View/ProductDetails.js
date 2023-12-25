import React, { Component } from 'react';
import { View, Text, StyleSheet, BackHandler, Linking } from "react-native";
import { AppColor, Red, screenHeight, White } from "../../../components/Styles";
import { Button, Container, Toast } from 'native-base';
import Header from '../../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';

export default class ProductDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            aciveImage: null
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

  


    async AddToCart() {
        let item = this.props.navigation.getParam("item")
        let CartItems = await AsyncStorage.getItem("CartItems")
        if (CartItems && CartItems.length > 0) {
            let Items = JSON.parse(CartItems)
            const isItemFound = Items.find((element) => element.id == item.id);
            if (isItemFound) {
                //CHANGE QUANTITY OF ITEM IN CART
                item.quatity = +isItemFound.quatity + 1
                const newItems = Items.map(item =>
                    item.id === isItemFound.id
                        ? { ...item, quatity: +item.quatity + 1 }
                        :
                        item

                );
                AsyncStorage.setItem('CartItems', JSON.stringify(newItems))

            }
            else {
                  //ADD NEW PRODUCT TO CART
                item.quatity = '1'
                Items.push(item)
                AsyncStorage.setItem('CartItems', JSON.stringify(Items))
            }
        }
        else {
            //ADD TO CART FIRST TIME
            let Items = []
            item.quatity = '1'
            Items.push(item)
            AsyncStorage.setItem('CartItems', JSON.stringify(Items))
        }
        Toast.show({
            position: "top", type: "success",
            text: 'added to cart successfully', textStyle: { color: White, textAlign: 'center', },
            duration: 3000,
            style: { backgroundColor: 'green', width: "60%", alignSelf: "center", borderRadius: 10 }
        })
    }

    render() {
        let item = this.props.navigation.getParam("item")
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <Container>
                    <Header title={'Recipes Details'} back={() => this.props.navigation.goBack()} navigation={this.props.navigation}/>
                    <ScrollView>

                        <View>
                            <FastImage resizeMode={FastImage.resizeMode.cover} style={styles.img} source={{ uri: this.state.aciveImage ? this.state.aciveImage : item.image }} />
                            <View style={styles.imagesContainer}>
                                {item.images && item.images.length > 0 ?
                                    item.images.map((image, key) => {
                                        return (
                                            <TouchableOpacity key={key} onPress={() => { this.setState({ aciveImage: image }) }}>
                                                <FastImage resizeMode={FastImage.resizeMode.cover} style={styles.imgView} source={{ uri: image }} />
                                            </TouchableOpacity>
                                        )
                                    })
                                    :
                                    <></>
                                }
                            </View>
                            <View style={styles.DetailsWrap}>
                                <Text style={styles.title}>{item.name}</Text>

                                <View style={{ marginVertical: '1%' }}>
                                    <Text style={styles.desc}>{item.info}</Text>
                                </View>

                                <View style={{ marginVertical: '4%' }}>
                                    <Text style={styles.title}>Description : </Text>
                                    <Text style={styles.desc}>{item.detail}</Text>
                                </View>


                                <View style={{ marginVertical: '4%' }}>
                                    <Text style={styles.title}>Price : </Text>
                                    <Text style={styles.desc}>{item.price} EGP</Text>
                                </View>

                                <Button onPress={() => this.AddToCart()} style={styles.btn}>
                                    <Text style={styles.btnTxt}>Add To Cart</Text>
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
        width: "100%", height: screenHeight / 4, alignSelf: "center", resizeMode: "contain"
    },
    DetailsWrap: { marginTop: '5%', paddingHorizontal: "3%" },
    label: { textAlign: "left", fontWeight: '900' },
    title: { textAlign: "left", fontWeight: '700' },
    desc: { textAlign: "left", },
    btn: {
        width: "70%", height: 60, borderWidth: .5, borderColor: AppColor,
        backgroundColor: AppColor, alignSelf: "center", justifyContent: "center", marginTop: "5%", borderRadius: 10
    },
    btnTxt: { textAlign: "center", fontWeight: 'bold', color: White },
    imgView: {
        width: 60, height: 60, alignSelf: "center", resizeMode: "contain", marginHorizontal: '1%', borderRadius: 5, borderWidth: 1, borderColor: "transparent"
    },
    imagesContainer: { flexDirection: "row", width: "70%", alignSelf: "center", justifyContent: 'center', marginVertical: "1%" }

});

