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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../Reuseable Component/color';

export const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    backgroundColor: colors.profileScreenCatergoryBg,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    // marginBottom: hp('0.'),
    marginTop: hp('2'),
    borderRadius: hp('2'),
    width: wp('45'),
  },
});
