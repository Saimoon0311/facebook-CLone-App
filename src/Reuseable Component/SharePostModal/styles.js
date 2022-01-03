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
    color: 'gray',
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
    // backgroundColor: 'purple',
    width: wp('60'),
    justifyContent: 'center',
    paddingLeft: wp('2'),
  },
  modalHeader: {
    // backgroundColor: 'green',
    width: wp('100'),
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    height: hp('10'),
  },
  modalBackArrow: {
    // backgroundColor: 'yellow',
    width: wp('15'),
    alignSelf: 'center',
    alignItems: 'center',
  },
  modalButtonView: {
    // backgroundColor: 'blue',
    width: wp('20'),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalButtonTouch: {
    backgroundColor: 'blue',
    padding: wp('3'),
    borderRadius: 5,
  },
  modalUserName: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: hp('3'),
    // marginTop: hp('1'),
    // justifyContent: 'center',
  },
});
