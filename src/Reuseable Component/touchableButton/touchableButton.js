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
  //   const inputRef = useRef();
  //   const _onPressBotton1Handler = () => {
  //     this.loadingButton1.showLoading(true);
  //     inputRef.current?.showLoading
  //     // mock
  //     setTimeout(() => {
  //       this.loadingButton1.showLoading(false);
  //     }, 2000);
  //   }
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={{
        width: wp('70'),
        backgroundColor: colors.themePrimaryColor,
        // backgroundColor: props?.bgColor,
        flexDirection: 'row',
        marginTop: hp('5'),
        height: hp('7'),
        borderRadius: 25,
      }}>
      <View
        style={{
          width: wp('13'),
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: hp('2'),
          // backgroundColor: 'red',
        }}>
        <Ionicons name={props?.iconName} size={25} color={props?.iconColor} />
      </View>
      <View
        style={{
          width: wp('47'),
          justifyContent: 'center',
        }}>
        {/* <Text
          style={{
            color: props?.textColor,
            textAlign: 'center',
            fontSize: hp('3'),
          }}>
          {props?.text}
        </Text> */}
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

    // <TouchableOpacity onPress={props?.onPress}>
    //   <LinearGradient
    //     start={{x: 0.2, y: 0.3}}
    //     // start={{x: 0.1, y: 0.03}}
    //     end={{x: 0.9, y: 0.9}}
    //     // start={{x: 0, y: 0}}
    //     // end={{x: 1, y: 0}}
    //     // locations={[1, 0]}
    //     colors={props?.linearColor}
    //     // colors={[colors.themeColorOne, '#8E3E9F', '#5F21AF']}
    //     style={styles.continueButtonNew}>
    //     <Ionicons name={props?.iconName} style={styles.mobileIcon} />
    //     {props?.loading ? (
    //       <ActivityIndicator size={'small'} color={'white'} />
    //     ) : (
    //       <Text style={styles.continueText}>{props?.text}</Text>
    //     )}
    //     <View></View>
    //   </LinearGradient>
    // </TouchableOpacity>
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
