import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import LinearGradient from 'react-native-linear-gradient';

export const TouchableButton = props => {
  var width = props.width ? props.width : 70;
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={{
        width: wp(width),
        backgroundColor: colors.themePrimaryColor,
        flexDirection: 'row',
        marginTop: hp('5'),
        height: hp('7'),
        // borderRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        alignSelf: 'center',
      }}>
      <View
        style={{
          width: wp('13'),
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: hp('2'),
        }}>
        <Ionicons name={props?.iconName} size={25} color={props?.iconColor} />
      </View>
      <View
        style={{
          width: wp('47'),
          justifyContent: 'center',
        }}>
        {props?.loading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={styles.continueText}>{props?.text}</Text>
        )}
      </View>
      <View
        style={{
          width: wp('10'),
          overflow: 'hidden',
        }}></View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  continueButtonNew: {
    width: wp('60%'),
    height: hp('5.5%'),
    alignSelf: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'green',
    // borderColor: colors.themeColorOne,
    // borderWidth: 1,
    marginTop: hp('5%'),
  },
  mobileIcon: {
    color: 'white',
    fontSize: hp('2.5%'),
  },
  continueText: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp('3'),
  },
});
