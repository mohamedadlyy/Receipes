import React, { Component } from 'react';
import { I18nManager,  View, Text } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { Container } from 'native-base';


export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: '',

    }
  }

  async componentDidMount() {
    this.props.navigation.navigate('Home')
  }


  // LoadInitialState = async () => {
  //   let lan = await AsyncStorage.getItem('lan')
  //   if (lan != null) {
  //       this.props.navigation.navigate('Home')
  //   } else {
  //     AsyncStorage.setItem('lan', 'en')
  //     I18nManager.forceRTL(false);
  //     I18nManager.allowRTL(false);
  //     RNRestart.Restart();
  //       this.props.navigation.navigate('Home')

  //   }


  // }

  render() {
    return (
      <Container style={{ justifyContent: "center" }}>
        <View>
            <Text style={{ textAlign: "center", color: "#000",}}>task</Text>
        </View>
      </Container>
    )
  }
}

