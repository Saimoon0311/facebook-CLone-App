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
    // <TouchableOpacity
    //   style={{
    //     width: wp('80'),
    //     backgroundColor: props?.bgColor,
    //     flexDirection: 'row',
    //     marginTop: hp('5'),
    //     height: hp('7'),
    //     borderRadius: 5,
    //   }}>
    //   <View style={{width: wp('10'), justifyContent: 'center'}}>
    //     <Ionicons name={props?.iconName} size={30} color={props?.iconColor} />
    //   </View>
    //   <View
    //     style={{
    //       width: wp('60'),
    //       backgroundColor: 'green',
    //       justifyContent: 'center',
    //     }}>
    //     <Text
    //       style={{
    //         color: props?.textColor,
    //         textAlign: 'center',
    //         fontSize: hp('3'),
    //       }}>
    //       {props?.text}
    //     </Text>
    //   </View>
    //   <View style={{width: wp('10')}}></View>
    // </TouchableOpacity>

    <TouchableOpacity onPress={props?.onPress}>
      <LinearGradient
        start={{x: 0.2, y: 0.3}}
        // start={{x: 0.1, y: 0.03}}
        end={{x: 0.9, y: 0.9}}
        // start={{x: 0, y: 0}}
        // end={{x: 1, y: 0}}
        // locations={[1, 0]}
        colors={props?.linearColor}
        // colors={[colors.themeColorOne, '#8E3E9F', '#5F21AF']}
        style={styles.continueButtonNew}>
        <Ionicons name={props?.iconName} style={styles.mobileIcon} />
        {props?.loading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={styles.continueText}>{props?.text}</Text>
        )}
        <View></View>
      </LinearGradient>
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
    fontSize: hp('2%'),
    // backgroundColor: 'red',
    left: wp('-1'),
    // fontFamily: 'Poppins-Regular',
    // marginTop: hp('0.5%'),
    // fontFamily: 'Poppins-Regular',
  },
});
