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
  var inputWidth = props?.inputWidth ? props.inputWidth : '90';
  return (
    <View
      style={{
        width: wp(inputWidth),
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
          color: 'gray',
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
          color: 'black',
        }}
        editable={props?.editable}
        value={props?.value}
        autoCapitalize={props?.autoCapble}
        onChangeText={props?.onChangeText}
        placeholderTextColor={'gray'}
        keyboardType={props?.keyboardType}
        // keyboardType={"phone-pad"}
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
          color: 'gray',
        }}
      />
    </View>
  );
};
