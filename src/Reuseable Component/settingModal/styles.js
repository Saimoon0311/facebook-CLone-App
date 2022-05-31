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
    bottom: hp('3'),
    position: 'absolute',
    width: wp('95'),
    backgroundColor: colors.modalMainContainer,
    maxHeight: Dimensions.get('screen').height * 0.8,
    height: 'auto',
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    alignSelf: 'center',
    borderRadius: 20,
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
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    marginBottom: hp('2'),
    borderRadius: 10,
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
