import React, {useEffect, useState, Ref} from 'react';
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
  TextInput,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {Divider} from 'react-native-paper';
import {ApiGet, ApiPost} from '../../config/helpeerFetch';
import {
  ImageUploadUrl,
  IMAGE_BASED_URL,
  PostCreateUrl,
  TimeLineUrl,
} from '../../config/url';
import {getUserData} from '../../utils/utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, useToast, Center, NativeBaseProvider} from 'native-base';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import {colors} from '../color';

export const SettingModal = props => {
  return (
    <Modal
      animationType="slide"
      // onRequestClose={}
      style={{
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
      }}>
      <View>
        <Text>sddsdsd</Text>
      </View>
    </Modal>
  );
};
