import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageHomeScreen,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  RefreshControl,
  ToastAndroid,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-paper';
import {ApiGet, ApiPut} from '../../config/helpeerFetch';
import {IMAGE_BASED_URL, LikeUrl, TimeLineUrl} from '../../config/url';
import {getUserData} from '../../utils/utils';
import ImagePicker from '../../Reuseable Component/ImagePicker/imagePicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SharePostMoadl} from '../../Reuseable Component/SharePostModal/sharePostModal';
import {
  Button,
  useToast,
  Center,
  NativeBaseProvider,
  Actionsheet,
} from 'native-base';
import {TimeLineData} from '../../config/TImeLineAllData/timeLineAllData';
import {showMessage} from 'react-native-flash-message';
import {ProfileScreenCategoryData} from '../../config/ProfileScreenCategoryData/profileScreenCategoryData';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import actions from '../../Redux/action';

export const styles = StyleSheet.create({
  sideicon: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.11,
    height: Dimensions.get('screen').width * 0.11,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    //     marginRight: wp('1'),
    marginLeft: wp('3'),
  },
  maincontainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: wp('100'),
  },
  headerContainer: {
    flexDirection: 'row',
    width: wp('100'),
    marginTop: hp('3'),
    marginBottom: hp('2'),
  },
  headerTitleConatiner: {
    width: wp('55'),
    paddingLeft: wp('2'),
    justifyContent: 'center',
  },
  headerTitle: {fontSize: hp('5'), color: 'black', fontWeight: 'bold'},
  topTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: hp('6'),
    alignItems: 'center',
    marginBottom: hp('2'),
  },
  topActiveTitleConatiner: {
    backgroundColor: '#d6edff',
    width: wp('20'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('5'),
    borderRadius: 20,
  },
  topActiveTitle: {color: 'blue', fontSize: hp('2.4')},
  groupContainer: {
    width: wp('35'),
    height: hp('20'),
    borderRadius: hp('1.5'),
    marginLeft: wp('3'),
    overflow: 'hidden',
  },
  groupTitle: {
    marginTop: 'auto',
    color: '#FFFFFF',
    fontSize: hp('2.5'),
    marginLeft: wp('2'),
    marginRight: wp('2'),
    marginBottom: hp('1'),
  },
});
