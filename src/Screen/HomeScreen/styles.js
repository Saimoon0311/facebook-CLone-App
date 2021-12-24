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

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //     backgroundColor: 'yellow',
    height: hp('10'),
    marginTop: hp('2'),
  },
  imageContainer: {
    // width: wp('20'),
    // height: hp('15'),
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    // alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.13,
    height: Dimensions.get('screen').width * 0.13,
    backgroundColor: 'white',
    // marginTop: hp('2'),
    marginLeft: hp('2'),
  },
  headerComponent: {
    width: wp('75'),
    //     backgroundColor: 'red',
    marginLeft: wp('3'),
    marginRight: wp('2'),
    height: hp('8'),
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: wp('5'),
    borderWidth: 0.5,
  },
  headerText: {
    fontSize: hp('2.5'),
    fontWeight: 'bold',
  },
});
