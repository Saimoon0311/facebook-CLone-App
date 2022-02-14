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
import {ApiDelete, ApiGet, ApiPost, ApiPut} from '../../config/helpeerFetch';
import {
  API_BASED_URL,
  DeletePostUrl,
  getApi,
  ImageUploadUrl,
  IMAGE_BASED_URL,
  PostCreateUrl,
  GetAllPostUrl,
  HidePostUrl,
} from '../../config/url';
import {getUserData} from '../../utils/utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, useToast, Center, NativeBaseProvider} from 'native-base';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import {colors} from '../color';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/type';
import AwesomeAlert from 'react-native-awesome-alerts';

export const SettingModal = props => {
  const [isSaved, setIsSaved] = useState(false);
  const [dummy, setDummy] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const {savePosts} = useSelector(state => state.savePosts);
  const {userData} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  var deleteButton;

  if (props.postData.userId == userData._id) {
    deleteButton = {
      id: 2,
      title: 'Delete Your Post',
      iconName: 'ios-trash-outline',
    };
  } else {
    deleteButton = {
      id: 2,
      title: 'Hide post',
      iconName: 'warning-outline',
    };
  }
  const awesomeAlert = () => {
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Delete a Post!"
        message="Are you sure you want to remove this post."
        contentContainerStyle={{
          width: wp('80%'),
          backgroundColor: colors.postDivider,
        }}
        overlayStyle={{backgroundColor: colors.alertBgColor}}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Yes"
        cancelText="No"
        confirmButtonStyle={styles.buttonstyle}
        cancelButtonStyle={styles.buttonstyle}
        cancelButtonTextStyle={{fontSize: hp('2.2%')}}
        confirmButtonTextStyle={{fontSize: hp('2.2%')}}
        confirmButtonTextStyle={{textAlign: 'center'}}
        cancelButtonTextStyle={{textAlign: 'center'}}
        titleStyle={{color: colors.defaultTextColor}}
        messageStyle={{color: 'gray', textAlign: 'center'}}
        onConfirmPressed={() => {
          deletePost();
          setShowAlert(false);
        }}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
      />
    );
  };
  const deletePost = () => {
    console.log(426, userData._id);
    const url = DeletePostUrl + props.postData._id;
    ApiDelete(url).then(res => {
      if (res.success == true) {
        console.log(251, res);
        props?.whenPostDeleted(true);
        props.forHideModal();
      } else if (res.success == false) {
        props?.whenPostDeleted(false);
        // props.forHideModal();
      } else {
        props?.whenPostDeleted(true);
        // console.log(252, res);
      }
    });
  };
  const [modalData, setModalData] = useState([
    {
      id: 1,
      title: 'Save Post',
      iconName: 'ios-save-outline',
    },
    deleteButton,
  ]);
  const checkIsSaved = () => {
    const selectedData = props.postData;
    const savedPosts = savePosts;
    console.log(289, userData._id);

    selectedData.hidePost.map(res => {
      console.log(288, res);
      console.log(289, userData._id);
      if (res == userData._id) {
        deleteButton.title = 'Unhide post';
        setDummy(dummy + 1);
        console.log(292, deleteButton);
      } else {
        console.log(294, deleteButton);
        deleteButton.title = 'Hide post';
        setDummy(dummy + 1);
      }
    });
    savedPosts.length > 0 &&
      savePosts.map(res => {
        if (res._id == selectedData._id) {
          modalData[0].title = 'Unsave Post';
          setIsSaved(true);
        } else {
          setIsSaved(false);
          modalData[0].title = 'Save Post';
        }
      });
  };
  const forHidePost = () => {
    var body = JSON.stringify({
      userId: userData._id,
    });
    var id = props.postData._id;
    var url = HidePostUrl + id + '/hide';
    ApiPut(url, body).then(res => {
      if (res.success == true) {
        props?.forHideModal();
        props?.hideAndUnhide(true);
        if (res?.data == 'The post has been hide!') {
          ToastAndroid.show(
            'The post has been hide!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            500,
          );
        } else if (res?.data == 'The post has been unhide!') {
          props?.forHideModal();
          props?.hideAndUnhide(true);
          ToastAndroid.show(
            'The post has been unhide!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        }
      } else if (res.success == false) {
        // props?.forHideModal();
        props?.hideAndUnhide(false);
        ToastAndroid.show(
          'Some Thing Is Wrong!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          500,
        );
      }
    });
  };
  useEffect(() => {
    checkIsSaved();
  }, []);
  const buttonActions = button => {
    if (button.title == 'Save Post') {
      dispatch({
        type: types.SAVEPOSTS,
        payload: props?.postData,
      });
      ToastAndroid.show(
        'The post has been Saved!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        500,
      );
      props.forHideModal();
    } else if (button.title == 'Unsave Post') {
      dispatch({
        type: types.UNSAVEPOSTS,
        payload: props?.postData,
      });
      ToastAndroid.show(
        'Save Post has been delete!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        500,
      );
      props.forHideModal();
    } else if (button.title == 'Delete Your Post') {
      setShowAlert(true);
    } else if (button.title == 'Hide post' || 'Unhide post') {
      forHidePost();
    } else {
      ToastAndroid.show(
        'Ss.engajksdkte!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        500,
      );
    }
  };
  const maxHeight = Dimensions.get('window').height;
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => props?.forHideModal()}
      visible={true}
      transparent={true}
      swipeDirection={['down', 'up']}
      // presentationStyle="fullScreen"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
                  <TouchableOpacity
                    style={styles.touchButton}
                    onPress={() => buttonActions(res)}>
                    <Ionicons
                      name={res.iconName}
                      size={25}
                      color={colors.defaultTextColor}
                    />
                    <Text numberOfLines={2} style={styles.titleStyle}>
                      {res.title}
                      {/* {isSaved == false  res?.title : 'unsave post'} */}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
      {awesomeAlert()}
    </Modal>
  );
};
