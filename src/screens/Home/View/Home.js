import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, BackHandler, I18nManager, FlatList } from "react-native";
import { screenWidth, grey, AppColor, DarkGrey, backgroundColor, borderColor, screenHeight, WhiteBlue, Red, White } from "../../../components/Styles";
import { Button, Container, Input, Toast } from 'native-base';
import Loading from '../../../components/Loading'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ItemView from '../../../components/ItemView';
import axios from 'axios';
const controller = new AbortController();
const signal = controller.signal;
export default class Home extends Component {

    constructor(props) {
        super(props)
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            Loading: false,
            refreshing: false,
            SearchTxt: '',
            ItemList: [],
            from: 0,
            to: 10,
            more: true,
            filterOption: null
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



    async GetItemList(from, to, SearchTxt, filterOption) {
      
        this.setState({ Loading: true, from, to })
        let url = ''
        if (filterOption) {
            url = `https://api.edamam.com/search?q=${SearchTxt}&app_id=a79682ea&app_key=5384dabbea00f6143974e7090afabd02&health=${filterOption}&from=${from}&to=${to}`
        } else {
            url = `https://api.edamam.com/search?q=${SearchTxt}&app_id=a79682ea&app_key=5384dabbea00f6143974e7090afabd02&from=${from}&to=${to}`
        }
        axios.get(url, { signal: signal})
            .then((response) => {
                this.setState({ Loading: false, })

                let Data = response.data
                if (response.status == '200') {
                    this.setState({
                        Loading: false,
                        ItemList: to > 10 ? [...this.state.ItemList, ...Data.hits] : Data.hits,
                        more: Data.more
                    })

                } else {
                    this.setState({ Loading: false, })
                    Toast.show({
                        position: "top", type: "success",
                        text: 'Some Thing went wrong', textStyle: { color: White, textAlign: 'center', },
                        duration: 3000,
                        style: { backgroundColor: Red, width: "60%", alignSelf: "center", borderRadius: 10 }
                    })
                }
            });

    }




    HandleFilter(FilterOption) {
        this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        this.setState({ filterOption: FilterOption, ItemList: [] }),
            this.setState({ filterOption: FilterOption }, () =>
                this.GetItemList(0, 10, this.state.SearchTxt, FilterOption)
            );

    }

    onEndReached = ({ }) => {
        if (!this.onEndReachedCalledDuringMomentum) {
            if (this.state.more) {
                this.GetItemList(+this.state.from + 10, +this.state.to + 10, this.state.SearchTxt, this.state.filterOption)
            }
            this.onEndReachedCalledDuringMomentum = true;
        }
    }

    handleInput(text) {
        controller.abort();
        this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        this.setState({ SearchTxt: text, ItemList: [] }, () =>
            setTimeout(() => {
                this.GetItemList(0, 10, this.state.SearchTxt, null)
            }, 1000));

    }



    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>

                <Container>
                    <View style={styles.header}>
                        <Text style={styles.title}>Recipes Search</Text>
                    </View>
                    <View style={styles.input} >
                        <View style={styles.searchContainer}>
                            <Image source={require("../../../images/s.png")} style={{ alignSelf: "center", resizeMode: "contain", width: 25, height: 25, tintColor: White }} />
                        </View>
                        <Input value={this.state.SearchTxt} onChangeText={(text) => this.handleInput(text)}
                            placeholderTextColor={grey} placeholder={'Search'}
                            style={styles.inputText}
                        />
                    </View>

                    <View style={{ paddingHorizontal: "5%" }}>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ maxHeight: screenHeight / 12, marginVertical: '2%', }}>
                            <Button onPress={() => { this.HandleFilter(null) }} style={this.state.filterOption == null ? styles.activeBtn : styles.inactiveBtn}>
                                <Text style={{ alignSelf: "center" }}>All</Text>
                            </Button>

                            <Button onPress={() => this.HandleFilter('low-sugar')} style={this.state.filterOption == 'low-sugar' ? styles.activeBtn : styles.inactiveBtn}>
                                <Text style={{ alignSelf: "center" }}>Low Sugar</Text>
                            </Button>

                            <Button onPress={() => this.HandleFilter('keto-friendly')} style={this.state.filterOption == 'keto-friendly' ? styles.activeBtn : styles.inactiveBtn}>
                                <Text style={{ alignSelf: "center" }}>Keto</Text>
                            </Button>

                            <Button onPress={() => this.HandleFilter('Vegan')} style={this.state.filterOption == 'Vegan' ? styles.activeBtn : styles.inactiveBtn}>
                                <Text style={{ alignSelf: "center" }}>Vegan</Text>
                            </Button>
                        </ScrollView>

                    </View>



                    <View style={styles.container}>
                        {this.state.Loading &&
                            <Loading />
                        }
                        <View style={{ width: "100%", marginTop: "2%" }}>

                            <FlatList
                                ref={(ref) => { this.flatListRef = ref; }}
                                onEndReached={this.onEndReached.bind(this)}
                                onEndReachedThreshold={0.5}
                                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                keyExtractor={(item, index) => index.toString()}
                                data={this.state.ItemList}
                                extraData={this.state}
                                renderItem={({ item, index }) => {
                                    return (
                                        <ItemView key={index} item={item} navigation={()=>this.props.navigation.navigate("RecipesDetails",{item:item})}/>
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
        width: "95%", flexDirection: "row", justifyContent: "flex-start", height: 60, alignContent: 'center',
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
    container: { width: "95%", alignSelf: 'center', flexDirection: "column" },
    inactiveBtn: {
        width: screenWidth / 3, height: 50, alignSelf: 'center', marginVertical: "2%", justifyContent: "center", marginEnd: 10, backgroundColor: backgroundColor, borderRadius: 5, borderColor: grey, borderWidth: 0.5
    },
    activeBtn: {
        width: screenWidth / 3, height: 50, alignSelf: 'center', marginVertical: "2%", justifyContent: "center", marginEnd: 10, backgroundColor: WhiteBlue, borderRadius: 5, borderColor: grey, borderWidth: 0.5
    }

});

