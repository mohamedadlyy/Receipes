import React, { Component } from 'react';
import { View, Text, StyleSheet, BackHandler, I18nManager, FlatList, Image } from "react-native";
import { screenWidth, grey, AppColor, DarkGrey, backgroundColor, borderColor, WhiteBlue, White } from "../../../components/Styles";
import { Container, } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemView from '../../../components/ItemView';
import HomeHeader from '../../../components/HomeHeader';
const Products = require('../../../data/Product.json');
export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Loading: false,
            refreshing: false,
            ItemList: [],
        }
    }


    componentWillMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () => {
            BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp()
                return true;
            });
        })
    }


    componentDidMount() {
        this.getProductList()
    }

    getProductList() {
        this.setState({ ItemList: Products })
    }

    onRefresh() {
        this.getProductList()
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: White }}>

                <Container style={{ backgroundColor: White }}>

                    <HomeHeader navigation={this.props.navigation} title={'Product List'} />



                    <View style={styles.container}>
                        <View style={{ width: "100%", marginVertical: "2%" }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                ListFooterComponent={<View />}
                                ListFooterComponentStyle={{ height: 100 }}
                                ref={(ref) => { this.flatListRef = ref; }}
                                keyExtractor={(item, index) => index.toString()}
                                data={this.state.ItemList}
                                extraData={this.state}
                                onRefresh={() => this.onRefresh()}
                                refreshing={this.state.refreshing}
                                renderItem={({ item, index }) => {
                                    return (
                                        <ItemView key={index} item={item} navigation={() => this.props.navigation.navigate("ProductDetails", { item: item })} />
                                    )
                                }}

                            />
                            {this.state.ItemList.length == 0 &&
                                <View style={{ justifyContent: "center", alignSelf: "center" }}>
                                    <Text style={styles.txt}>No Result Found</Text>
                                </View>
                            }



                        </View>
                    </View>
                </Container>
            </SafeAreaView>


        )

    }
}


const styles = StyleSheet.create({
    header: {
        width: "95%", flexDirection: "row", justifyContent: "space-between", height: 60, alignContent: 'center',
        alignItems: 'center', paddingHorizontal: "5%",
    },
    title: {
        fontSize: screenWidth / 22, color: AppColor
    },
    searchContainer: {
        width: "15%", height: "100%", backgroundColor: AppColor, justifyContent: "center", borderRadius: 3
    },
    input: {
        height: 45, borderWidth: 1, borderRadius: 5, borderColor: borderColor, flexDirection: 'row', justifyContent: 'center',
        width: "90%", marginVertical: 5, backgroundColor: White, alignSelf: 'center'
    },

    inputText: {
        textAlign: I18nManager.isRTL ? 'right' : 'left', color: DarkGrey, width: '100%',
        fontSize: screenWidth / 30, alignSelf: 'center'
    },
    container: { width: "95%", alignSelf: 'center', flexDirection: "column", backgroundColor: '#fff' },
    inactiveBtn: {
        width: screenWidth / 3, height: 50, alignSelf: 'center', marginVertical: "2%", justifyContent: "center", marginEnd: 10, backgroundColor: backgroundColor, borderRadius: 5, borderColor: grey, borderWidth: 0.5
    },
    activeBtn: {
        width: screenWidth / 3, height: 50, alignSelf: 'center', marginVertical: "2%", justifyContent: "center", marginEnd: 10, backgroundColor: WhiteBlue, borderRadius: 5, borderColor: grey, borderWidth: 0.5
    }

});

