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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.defaultBgColor,
    height: hp('12'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    justifyContent: 'space-between',
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
    marginLeft: hp('1'),
  },
  headerComponent: {
    width: wp('75'),
    // backgroundColor: 'red',
    // marginLeft: wp('3'),
    marginRight: wp('3'),
    height: hp('6'),
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: wp('5'),
    borderWidth: 0.5,
    borderColor: colors.defaultTextColor,
  },
  headerText: {
    fontSize: hp('2.2'),
    fontWeight: 'bold',
    color: colors.defaultTextColor == '#f1f2f6' ? '#f1f2f6' : 'gray',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: wp('100'),
    // height: hp('100'),
    // backgroundColor: 'red',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    marginBottom: 15,
    textAlign: 'center',
  },
});
