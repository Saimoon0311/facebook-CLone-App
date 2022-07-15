import React, {useState} from 'react';
import {View, Text, TextInput, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../color';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const InputField = props => {
  var inputWidth = props?.inputWidth ? props.inputWidth : '90';
  var inputHeight = !props.multiline
    ? Platform.OS == 'ios'
      ? hp('8')
      : 'auto'
    : 'auto';
  return (
    <View
      style={{
        width: wp(inputWidth),
        alignSelf: 'center',
        marginTop: hp('2'),
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: inputHeight,
      }}>
      {props?.iconType == true ? (
        <MaterialIcons
          name={props?.firstIconName}
          size={30}
          style={{
            justifyContent: 'center',
            alignSelf: 'flex-start',
            marginLeft: wp('3'),
            marginRight: wp('3'),
            color:
              props.iconColor && props.value != undefined && props.value != ''
                ? props.iconColor
                : 'white',
            marginTop: hp('3'),
          }}
        />
      ) : (
        <Ionicons
          name={props?.firstIconName}
          size={30}
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginLeft: wp('3'),
            marginRight: wp('3'),
            color:
              props.iconColor && props.value != undefined && props.value != ''
                ? props.iconColor
                : 'white',
          }}
        />
      )}
      <View
        style={{
          height: '80%',
          width: 1,
          backgroundColor:
            props.iconColor && props.value != undefined && props.value != ''
              ? props.iconColor
              : 'white',
          marginRight: wp('2'),
          alignSelf: 'center',
        }}
      />
      <TextInput
        placeholder={props?.label}
        multiline={props.multiline ? true : false}
        numberOfLines={props?.numberOfLines}
        minHeight={
          Platform.OS === 'ios' && props?.numberOfLines
            ? 20 * props?.numberOfLines
            : null
        }
        style={{
          backgroundColor: 'transparent',
          width: wp('60'),
          color: props?.TextInputColor ? props.TextInputColor : 'black',
          textAlignVertical: props?.textAlignVertical,
          paddingTop: props?.numberOfLines
            ? hp('2')
            : Platform.OS == 'android' && hp('1'),
          fontWeight: 'bold',
        }}
        editable={props?.editable}
        value={props?.value}
        autoCapitalize={props?.autoCapble}
        onChangeText={props?.onChangeText}
        placeholderTextColor={'white'}
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
          color: 'white',
        }}
      />
    </View>
  );
};
