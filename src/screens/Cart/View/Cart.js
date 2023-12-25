import React, { Component } from 'react';
import { View, Text, StyleSheet, BackHandler, } from "react-native";
import { appFont, AppColor, appFontBold, placeHolder, appFontSemiBold, } from "../../../components/Styles";
import { Button, Container, Toast } from 'native-base';
import { ScrollView, } from 'react-native-gesture-handler';
import CartItem from '../../../components/CartItem';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../../components/Header';

export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Loading: false,
            cartItem: [],
            cart: '',
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
    componentDidMount() {
        this.getCartItem()
        const { navigation } = this.props;
        navigation.addListener('willFocus', () => {
        })
    }

    async getCartItem() {
        let cartItem = await AsyncStorage.getItem("CartItems")
        this.setState({ cartItem: cartItem ? JSON.parse(cartItem) : [] })
    }

    deletItem(item) {
        let CartItems = this.state.cartItem
        const SelectedItem = CartItems.findIndex((Cartitem) => Cartitem.id === item.id);
        if (SelectedItem > -1) {
            CartItems.splice(SelectedItem, 1);
        }
        if(CartItems && CartItems.length > 0){
            this.setState({ cartItem:CartItems })
            AsyncStorage.setItem('CartItems', JSON.stringify(CartItems))
        }else{
            this.setState({ cartItem:[] })
            AsyncStorage.removeItem('CartItems')
        }
       

    }

    Increment(item) {
        let Items = this.state.cartItem
        const isItemFound = Items.find((element) => element.id == item.id);
        if (isItemFound) {
            //CHANGE QUANTITY OF ITEM IN CART
            const newItems = Items.map(item =>
                item.id === isItemFound.id
                    ? { ...item, quatity: +item.quatity + 1 }
                    :
                    item

            );
            this.setState({ cartItem: newItems })
            AsyncStorage.setItem('CartItems', JSON.stringify(newItems))

        }

    }

    Decrement(item) {
        let Items = this.state.cartItem
        const isItemFound = Items.find((element) => element.id == item.id);
        if (isItemFound) {
            //CHANGE QUANTITY OF ITEM IN CART
            const newItems = Items.map(item =>
                item.id === isItemFound.id
                    ? item.quatity > 1 ? { ...item, quatity: +item.quatity - 1 } :  this.deletItem(item)
                    :
                    item

            );
            if( item.quatity > 1){

            this.setState({ cartItem: newItems })
            AsyncStorage.setItem('CartItems', JSON.stringify(newItems))
        }

        }

    }

    checkOut() {
        AsyncStorage.removeItem('CartItems')
        Toast.show({
            position: "top", type: "success",
            text: 'Order Created Successfully', textStyle: { color: White, textAlign: 'center', },
            duration: 3000,
            style: { backgroundColor: 'green', width: "60%", alignSelf: "center", borderRadius: 10 }
        })
        this.props.navigation.navigate("Home")
    }

    Calctotal() {
        let subtotal = 0;
        if (this.state.cartItem && this.state.cartItem.length > 0) {
            this.state.cartItem.map((item) => {

                subtotal += +item.price * item.quatity
            })
        }

        return subtotal
    }

    render() {
        return (
            <Container style={{ backgroundColor: "#fbfbfb" }}>
            
                <Header title={'Cart'} back={() => this.props.navigation.goBack()} navigation={this.props.navigation} />
                {this.state.cartItem && this.state.cartItem.length > 0 ?
            <>
                <ScrollView showsVerticalScrollIndicator={false} >
                   
                            <Text style={styles.title}>Product</Text>
                            {this.state.cartItem.map((item, key) => {
                                return (
                                    <CartItem key={key} item={item} delete={() => this.deletItem(item)} Increment={() => this.Increment(item)} Decrement={() => this.Decrement(item)} />

                                )
                            })
                       }



                </ScrollView>

                <View style={{ justifyContent: "center", marginTop: '2%' }}>

                    <View style={styles.summaryContainer}>

                        <View style={styles.dataContainer}>
                            <Text style={styles.titleTxt}>SubTotal</Text>
                            <Text style={styles.titleTxt}>{this.Calctotal().toFixed(2)} Egp</Text>
                        </View>

                        <View style={styles.horiontalView}></View>

                        <View style={styles.dataContainer}>
                            <Text style={styles.titleTxt}>Delivery Fess</Text>
                            <Text style={styles.titleTxt}>50 Egp</Text>
                        </View>


                        <View style={styles.horiontalView}></View>

                        <View style={styles.dataContainer}>
                            <Text style={styles.titleTxt}>Total</Text>
                            <Text style={styles.descTxt}>{(this.Calctotal() + 50).toFixed(2)} Egp</Text>
                        </View>

                        <Button onPress={() => this.checkOut()} style={styles.checkoutBtn}>
                            <Text style={styles.btnTxt}>Order Now</Text>

                        </Button>

                    </View>

                </View>
            </>   
:
<>
<Text style={{textAlign:"center",marginTop:"20%"}}>Cart is empty</Text>
</>
    }

            </Container>

        )
    }
}


const styles = StyleSheet.create({

    summaryContainer: {
        flexDirection: 'column', width: "100%", alignSelf: 'center',
        backgroundColor: "#FFF", borderRadius: 5, padding: "2%"
    },

    dataContainer: { width: "95%", flexDirection: "row", justifyContent: "space-between" },

    checkoutBtn: {
        width: "90%", alignSelf: "center", justifyContent: "center",
        borderRadius: 5, backgroundColor: AppColor, marginVertical: "5%"
    },

    horiontalView: {
        height: 1, width: '95%', marginVertical: '2%', backgroundColor: '#C4C4C4', alignSelf: 'center'
    },
    btnTxt: { fontFamily: appFontSemiBold, textAlign: "center", color: "#fff" },

    titleTxt: { fontFamily: appFont, textAlign: "left", marginLeft: '5%', color: placeHolder },

    descTxt: { fontFamily: appFontSemiBold, textAlign: "left", marginLeft: '5%', },
    title: { fontFamily: appFontBold, textAlign: "left", marginLeft: "5%", marginVertical: "2%", color: AppColor }
});

