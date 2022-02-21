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
    color: colors.defaultTextColor,
    fontWeight: 'bold',
  },
  extraText: {
    color: 'gray',
    fontSize: hp('2.5'),
  },
  AccordionHeaderContainer: {
    height: hp('8'),
    marginTop: hp('1'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp('2'),
    marginBottom: hp('1'),
  },
  AccordionHeaderTitle: {
    fontSize: hp('2.5'),
    color: colors.defaultTextColor,
    fontWeight: 'normal',
  },
  AccordionContentContainer: {
    width: wp('92'),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2'),
    height: hp('8'),
    paddingLeft: wp('3'),
    backgroundColor: colors.profileScreenCatergoryBg,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 2,
    borderRadius: hp('2'),
    alignSelf: 'center',
  },
  AccordionContentTitle: {
    fontSize: hp('2.5'),
    marginLeft: wp('4'),
    color: colors.defaultTextColor,
  },
  logoutButton: {
    backgroundColor: colors.logoutButtonBg,
    width: wp('92.5'),
    height: hp('7'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2'),
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: wp('4'),
    // marginRight: wp('3'),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: hp('2'),
    // textAlign: 'center',
    fontSize: hp('3'),
    // marginLeft: wp('3'),
    marginTop: hp('2'),
    textAlign: 'center',
    color: colors.defaultTextColor,
  },
  devider: {
    flex: 1,
    height: 2,
    backgroundColor: 'black',
    // marginTop: hp('1'),
    // marginBottom: hp('1'),
  },
  radioText: {
    // marginTop: hp('0.9'),
    color: 'black',
    marginLeft: wp('3'),
    width: wp('70'),
    width: wp('70'),
    // marginBottom: hp('2'),
  },
});
