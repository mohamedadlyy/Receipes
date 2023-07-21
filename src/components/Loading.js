import React from 'react';
import { ActivityIndicator} from 'react-native';
import { AppColor } from './Styles';

const Loading = () => (
  <ActivityIndicator size="large" color={AppColor} style={{
    alignSelf: 'center', position: 'absolute',
}} />
);
export default Loading;