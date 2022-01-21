// import React, {useEffect, useState, Ref} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   ImageHomeScreen,
//   Dimensions,
//   Image,
//   TouchableOpacity,
//   Pressable,
//   TextInput,
//   ImageBackground,
//   ToastAndroid,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {styles} from './styles';
// import {Divider} from 'react-native-paper';
// import {ApiGet, ApiPost} from '../../config/helpeerFetch';
// import {
//   ImageUploadUrl,
//   IMAGE_BASED_URL,
//   PostCreateUrl,
//   TimeLineUrl,
// } from '../../config/url';
// import {getUserData} from '../../utils/utils';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {Button, useToast, Center, NativeBaseProvider} from 'native-base';
// import VideoPlayer from 'react-native-video-player';
// import Video from 'react-native-video';
// import {colors} from '../color';
// import {
//   Modal,
//   ModalPortal,
//   ModalContent,
//   SlideAnimation,
// } from 'react-native-modals';

// export const SettingModal = props => {
//   const [modalData, setModalData] = useState([
//     {
//       id: 1,
//     },
//     {
//       id: 2,
//     },
//     {
//       id: 3,
//     },
//     {
//       id: 4,
//     },
//   ]);
//   const maxHeight = Dimensions.get('window').height;
//   return (
//     <Modal
//       // animationType="slide"
//       onRequestClose={() => props?.forHideModal()}
//       modalAnimation={
//         new SlideAnimation({
//           initialValue: 0, // optional
//           slideFrom: 'bottom', // optional
//           useNativeDriver: true, // optional
//         })
//       }
//       swipeDirection={['down', 'up']}
//       visible={props?.modalType}
//       type="bottomModal"
//       onSwipeOut={event => {
//         props?.forHideModal();
//       }}
//       hasOverlay={true}
//       onSwipingOut={() => props?.forHideModal()}
//       overlayOpacity={0.1}
//       transparent={true}>
//       <ModalContent
//         style={
//           {
//             // flex: 1,
//             // backgroundColor: '#000000AA',
//           }
//         }>
//         {/* <Pressable
//             style={{flex: 1}}
//             onPress={() => props?.forHideModal()}></Pressable> */}
//         <View
//           style={{
//             // bottom: 0,
//             // position: 'absolute',
//             // width: wp('100'),
//             // backgroundColor: 'red',
//             backgroundColor: '#DDDDDD',
//             maxHeight: Dimensions.get('screen').height * 0.8,
//             height: 'auto',
//             // borderTopLeftRadius: 15,
//             // borderTopRightRadius: 15,
//           }}>
//           {/* <Divider
//             style={{
//               alignSelf: 'center',
//               width: wp('15'),
//               borderWidth: 2,
//               borderRadius: 20,
//               borderColor: '#373333',
//               // marginTop: hp('2'),
//               // marginBottom: hp('2'),
//             }}
//           /> */}
//           <View
//             style={{
//               width: wp('90'),
//               alignSelf: 'center',
//               // height: hp('80'),
//               backgroundColor: 'white',
//             }}>
//             {modalData.map(res => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     margin: 10,
//                     // backgroundColor: 'red',
//                     alignItems: 'center',
//                   }}>
//                   <Ionicons name="search" size={30} color={'black'} />
//                   <Text
//                     style={{
//                       fontSize: hp('3'),
//                       marginLeft: wp('3'),
//                       color: 'black',
//                     }}>
//                     asdasd
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         </View>
//       </ModalContent>
//     </Modal>
//   );
// };

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
      title: 'Save post',
      iconName: 'ios-save-outline',
    },
    {
      id: 2,
      title: 'Hide post',
      iconName: 'warning-outline',
    },
    {
      id: 3,
      title: 'Why am I seeing this post?',
      iconName: 'information-circle-outline',
    },
    {
      id: 4,
      title: 'Report photo',
      iconName: 'information-circle',
    },
    {
      id: 5,
      title: 'Add photos/videos to this album',
      iconName: 'images',
    },
    {
      id: 6,
      title: 'Add photos/videos to this album',
      iconName: 'images',
    },
    {
      id: 7,
      title: 'Add photos/videos to this album',
      iconName: 'images',
    },
    {
      id: 8,
      title: 'Add photos/videos to this album',
      iconName: 'images',
    },
    {
      id: 9,
      title: 'Add photos/videos to this album',
      iconName: 'images',
    },
    {
      id: 10,
      title: 'Add photos/videos to this album',
      iconName: 'images',
    },
    {
      id: 11,
      title: 'Add photos/videos to this album',
      iconName: 'images',
    },
    {
      id: 12,
      title: 'Add photos/videos to this album',
      iconName: 'images',
    },
    {
      id: 13,
      title: 'Add photos/videos to this album',
      iconName: 'images',
    },
    {
      id: 14,
      title: 'Add photos/videos to this album',
      iconName: 'images',
    },
  ]);
  const maxHeight = Dimensions.get('window').height;
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => props?.forHideModal()}
      visible={true}
      transparent={true}
      swipeDirection={['down', 'up']}
      presentationStyle="fullScreen">
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
        }}>
        <Pressable
          style={{flex: 1}}
          onPress={() => props?.forHideModal()}></Pressable>
        <View style={styles.mainContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Divider style={styles.divider} />
            <View style={styles.mapView}>
              {modalData.map(res => {
                return (
                  <TouchableOpacity style={styles.touchButton}>
                    <Ionicons name={res?.iconName} size={25} color={'black'} />
                    <Text numberOfLines={2} style={styles.titleStyle}>
                      {res?.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
