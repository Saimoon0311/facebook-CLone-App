import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
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
  return (
    <View
      style={{
        width: wp(inputWidth),
        alignSelf: 'center',
        marginTop: hp('2'),
        flexDirection: 'row',
        // borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
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
            color: 'white',
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
            color: 'white',
          }}
        />
      )}
      <View
        style={{
          height: '80%',
          width: 1,
          backgroundColor: 'white',
          marginRight: wp('2'),
          alignSelf: 'center',
        }}
      />
      <TextInput
        placeholder={props?.label}
        multiline={props.multiline ? true : false}
        numberOfLines={props?.numberOfLines}
        style={{
          backgroundColor: 'transparent',
          width: wp('60'),
          color: props?.TextInputColor ? props.TextInputColor : 'black',
          textAlignVertical: props?.textAlignVertical,
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
