import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../color';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const InputField = props => {
  return (
    <View
      style={{
        width: wp('90'),
        alignSelf: 'center',
        marginTop: hp('2'),
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'gray',
      }}>
      <Ionicons
        name={props?.firstIconName}
        size={30}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          marginLeft: wp('3'),
          marginRight: wp('3'),
        }}
      />
      <View
        style={{
          height: '80%',
          width: 1,
          backgroundColor: 'gray',
          marginRight: wp('2'),
          alignSelf: 'center',
        }}
      />
      <TextInput
        placeholder={props?.label}
        style={{
          backgroundColor: 'transparent',
          width: wp('60'),
        }}
        value={props?.value}
        autoCapitalize={props?.autoCapble}
        onChangeText={props?.onChangeText}
        placeholderTextColor={'gray'}
        keyboardType={props?.keyboardType}
        secureTextEntry={props?.secureTextEntry}
        theme={{colors: {primary: colors.themePrimaryColor}}}
      />
      <Ionicons
        onPress={props?.onPress}
        name={props?.SecondIconName}
        size={20}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          marginLeft: wp('3'),
          marginRight: wp('3'),
        }}
      />
    </View>
  );
};
