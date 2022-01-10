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
  mainContainer: {
    marginLeft: wp('3'),
    marginRight: wp('3'),
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
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3'),
    marginBottom: hp('3'),
  },
  userName: {
    fontSize: hp('3'),
    color: 'black',
    fontWeight: 'bold',
  },
  extraText: {
    color: 'gray',
    fontSize: hp('2.5'),
  },
});
