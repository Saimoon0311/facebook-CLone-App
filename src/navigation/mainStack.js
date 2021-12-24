import React from 'react';
import {Screens} from '../Screen/index';

export default function (Stack, options) {
  return (
    <>
      <Stack.Screen name="HomeScreen" component={Screens.HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={Screens.ProfileScreen} />
      {/* <Stack.Screen name="cate" component={cate} />
      <Stack.Screen name="setting" component={setting} /> */}
    </>
  );
}
