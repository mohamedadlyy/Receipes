import React, { Component } from 'react';
import {  View, Text } from "react-native";
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

