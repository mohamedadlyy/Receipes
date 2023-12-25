import React from 'react';
import 'react-native-gesture-handler';
import Home from './src/screens/Home/View/Home';
import ProductDetails from './src/screens/ProductDetails/View/ProductDetails';
import Cart from './src/screens/Cart/View/Cart';
import SplashScreen from './src/screens/SplashScreen';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { Root } from 'native-base';
const AppStackNavigator = createStackNavigator({
  Splash: SplashScreen,
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      gestureEnabled: false

    }
  },
  ProductDetails: {
    screen: ProductDetails,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      gestureEnabled: false

    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      gestureEnabled: false

    }
  },
  


},
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      header: null
    },
  },
);

const App = () => {

  const AppContainer = createAppContainer(AppStackNavigator);
  return (
    <Root>
      <AppContainer />
    </Root>
  );
};

export default App;