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
  const [modalData, setModalData] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
  ]);
  const maxHeight = Dimensions.get('window').height;
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => props?.forHideModal()}
      // onRequestClose={}
      visible={true}
      transparent={true}
      // onLayout=
      // presentationStyle="overFullScreen"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
        }}>
        <Pressable
          style={{flex: 1}}
          onPress={() => props?.forHideModal()}></Pressable>
        <View
          style={{
            bottom: 0,
            position: 'absolute',
            width: wp('100'),
            backgroundColor: '#DDDDDD',
            maxHeight: Dimensions.get('screen').height * 0.8,
            height: 'auto',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          <Divider
            style={{
              alignSelf: 'center',
              width: wp('15'),
              borderWidth: 2,
              borderRadius: 20,
              borderColor: '#373333',
              marginTop: hp('2'),
              marginBottom: hp('2'),
            }}
          />
          <View
            style={{
              width: wp('90'),
              alignSelf: 'center',
              // height: hp('80'),
              backgroundColor: 'white',
            }}>
            {modalData.map(res => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    margin: 10,
                    // backgroundColor: 'red',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="search" size={30} color={'black'} />
                  <Text
                    style={{
                      fontSize: hp('3'),
                      marginLeft: wp('3'),
                      color: 'black',
                    }}>
                    asdasd
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};
