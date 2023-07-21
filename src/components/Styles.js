import { StyleSheet, Dimensions, Platform, StatusBar ,I18nManager} from "react-native";

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
export const White = '#ffffff'
export const Red = '#ED0006'
export const borderColor = '#C8C7CC'
export const black = '#000'
export const backgroundColor = '#e3e3e3'
export const AppColor = '#003980'
export const grey = '#535353'
const styles = StyleSheet.create({
    statusBar: {
      height: STATUSBAR_HEIGHT / 10
    },
})


export default styles
