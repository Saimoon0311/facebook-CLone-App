import React from 'react';
import {View, Text} from 'react-native';

export default function showNotificationScreen({route, navigation}) {
  const item = route.params;
  console.log(2345678, item);
  return (
    <View>
      <Text>ksjdfhjksdhkf</Text>
    </View>
  );
}
