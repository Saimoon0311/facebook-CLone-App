import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageHomeScreen,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../color';

export const styles = StyleSheet.create({
  mainContainer: {
    bottom: 0,
    position: 'absolute',
    width: wp('100'),
    backgroundColor: colors.modalMainContainer,
    maxHeight: Dimensions.get('screen').height * 0.8,
    height: 'auto',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  divider: {
    alignSelf: 'center',
    width: wp('15'),
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#ABB2B9',
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  mapView: {
    width: wp('90'),
    alignSelf: 'center',
    backgroundColor: colors.modalInsideColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: Platform.OS == 'ios' ? hp('3') : hp('0'),
  },
  touchButton: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: hp('2.8'),
    marginLeft: wp('3'),
    color: colors.defaultTextColor,
    width: wp('74'),
  },
  buttonstyle: {
    backgroundColor: colors.themePrimaryColor,
    width: wp('15'),
  },
});
