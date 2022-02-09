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
import {useSelector} from 'react-redux';

// const uploaders = files.map(file => {
//   // Initial FormData
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("tags", `codeinfuse, medium, gist`);
//   formData.append("upload_preset", "pvhilzh7"); // Replace the preset name with your own
//   formData.append("api_key", "1234567"); // Replace API key with your own Cloudinary key
//   formData.append("timestamp", (Date.now() / 1000) | 0);

//   // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
//   return axios.post("https://api.cloudinary.com/v1_1/codeinfuse/image/upload", formData, {
//     headers: { "X-Requested-With": "XMLHttpRequest" },
//   }).then(response => {
//     const data = response.data;
//     const fileURL = data.secure_url // You should store this URL for future references in your app
//     console.log(data);
//   })
// });

export const SharePostMoadl = props => {
  const {userData} = useSelector(state => state.auth);
  const toast = useToast();
  // const toastIdRef = React.useRef();
  const [user, setUser] = useState();
  const [shareText, setShareText] = useState('');
  const [imageFromGalary, setImageFromGalary] = useState([]);
  const [dummy, setDummy] = useState(1);
  const [dummytwo, setDummytwo] = useState([]);
  const [array, setArray] = useState({});
  useEffect(() => {
    (async () => {
      setUser(userData);
    })();
  }, []);

  const pickImagesFromGalary = () => {
    launchImageLibrary(
      {
        selectionLimit: 8,
        mediaType: 'mixed',
        quality: 0.3,
      },
      res => {
        if (!res?.didCancel) {
          setImageFromGalary(res?.assets);
          // setImageFromGalary(...imageFromGalary, res?.assets);
          // console.log('Result', res?.assets);

          // console.log('State', imageFromGalary);
        }
      },
    );
  };

  const removeImage = i => {
    imageFromGalary.splice(i, 1);
    setDummy(dummy + 1);
  };

  const pickImagefromCamera = () => {
    launchCamera(
      {
        selectionLimit: 8,
        mediaType: 'mixed',
        quality: 0.3,
        videoQuality: 'high',
      },
      res => {
        if (!res?.didCancel) {
          // console.log(50, res?.assets);
          // setImageFromGalary(prevState => {
          //   prevState.concat(res?.assets);
          // });
          setImageFromGalary(res?.assets);
        }
      },
    );
  };

  // const sharePost = async () => {
  //   var myHeaders = new Headers();
  //   // myHeaders.append('Content-Type', 'multipart/form-data');
  //   var formdata = new FormData();
  //   formdata.append('file', {
  //     name: imageFromGalary[0]?.fileName,
  //     uri: imageFromGalary[0]?.uri,
  //     type: imageFromGalary[0]?.type,
  //   });
  //   formdata.append('upload_preset', 'upload');
  //   var requestOptions = {
  //     method: 'POST',
  //     body: formdata,
  //     redirect: 'follow',
  //   };
  //   try {
  //     const uploadRes = await fetch(
  //       'https://api.cloudinary.com/v1_1/dd6tdswt5/upload',
  //       requestOptions,
  //     );

  //     const {url} = uploadRes.data;
  //     console.log(110, uploadRes);

  //     const body = {
  //       description: shareText,
  //       userId: user?._id,
  //       postName: user?.username,
  //       image: url,
  //       profilePicture: user?.profilePicture,
  //     };

  //     ApiPost(PostCreateUrl, body, false).then(res => {
  //       // console.log(res);
  //       if (res?.success == true) {
  //         ToastAndroid.show('You post was shared.', ToastAndroid.LONG);
  //         props?.forHideModal();
  //       } else if (res?.success == false) {
  //         ToastAndroid.show(
  //           'Some Thing Want Wrong.',
  //           ToastAndroid.LONG,
  //           ToastAndroid.TOP,
  //         );
  //       } else {
  //         ToastAndroid.show(
  //           'Some Thing Want Wrong.',
  //           ToastAndroid.LONG,
  //           ToastAndroid.TOP,
  //         );
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const sharePost = () => {
  //   var formdata = new FormData();
  //   // imageFromGalary.map((res, i) => {
  //   //   // console.log(119, res);
  //   //   formdata.append('file', {
  //   //     name: res.fileName.includes('.') ? res.fileName : res.fileName + '.mp4',
  //   //     uri: res.uri,
  //   //     type: res.type,
  //   //   });
  //   // });
  //   formdata.append('upload_preset', 'upload');
  //   formdata.append('file', {
  //     name: imageFromGalary[0]?.fileName,
  //     uri: imageFromGalary[0]?.uri,
  //     type: imageFromGalary[0]?.type,
  //   });
  //   formdata.append('description', shareText);
  //   formdata.append('userId', user._id);
  //   formdata.append('postName', user.username);
  //   formdata.append('profilePicture', user.profilePicture);
  //   ApiPost(PostCreateUrl, formdata, true).then(res => {
  //     // console.log(res);
  //     if (res?.success == true) {
  //       ToastAndroid.show('You post was shared.', ToastAndroid.LONG);
  //       props?.forHideModal();
  //     } else if (res?.success == false) {
  //       ToastAndroid.show(
  //         'Some Thing Want Wrong.',
  //         ToastAndroid.LONG,
  //         ToastAndroid.TOP,
  //       );
  //     } else {
  //       ToastAndroid.show(
  //         'Some Thing Want Wrong.',
  //         ToastAndroid.LONG,
  //         ToastAndroid.TOP,
  //       );
  //     }
  //   });
  // };

  const sharePostImages = async () => {
    imageFromGalary.map(res => {
      var formdata = new FormData();
      // formdata.append('file', imageFromGalary[0]?.uri);
      formdata.append('upload_preset', 'upload');
      formdata.append('file', {
        name: res.fileName,
        uri: res.uri,
        type: res.type,
      });

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch('https://api.cloudinary.com/v1_1/dd6tdswt5/upload', requestOptions)
        .then(response => response.json())
        .then(result => {
          const {url} = result;
          array.push(result);
          for (let index = 0; index < array?.length; index++) {
            // array[index] = array[index]?.url;
            console.log(238, index);
          }
          // setTimeout(() => {
          //   console.log(236, array);
          // }, 1500);
        })
        .catch(error => console.log('error', error));
    });
  };

  const sharePost = async () => {
    await sharePostImages();
    const body = JSON.stringify({
      description: shareText,
      userId: user._id,
      postName: user.username,
      image: array,
      profilePicture: user?.profilePicture,
    });
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    console.log(253, body);
    console.log(256, array);
    await fetch(PostCreateUrl, {body: body, method: 'POST', headers: myHeaders})
      .then(result => result.json())
      .then(res => {
        if (res?.success == true) {
          ToastAndroid.show('You post was shared.', ToastAndroid.LONG);
          props?.forHideModal();
        } else if (res?.success == false) {
          console.log(259, res);
          ToastAndroid.show(
            'Some Thing Want Wrong.',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        } else {
          ToastAndroid.show(
            'Some Thing Want Wrong.',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      });
  };

  return (
    <NativeBaseProvider>
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => props?.forHideModal()}>
        <View style={styles.centeredView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => props?.forHideModal()}
              style={styles.modalBackArrow}>
              <Ionicons
                name="arrow-back"
                size={35}
                color={colors.defaultTextColor}
              />
            </TouchableOpacity>
            <View style={styles.modalText}>
              <Text style={{fontSize: hp('3'), color: colors.defaultTextColor}}>
                Create Post
              </Text>
            </View>
            <View style={styles.modalButtonView}>
              {shareText !== '' && (
                <TouchableOpacity
                  style={styles.modalButtonTouch}
                  onPress={() => sharePost()}>
                  <Text style={{color: 'white'}}>Post</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp('8')}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {user?.profilePicture !== '' ? (
                <Image
                  source={{uri: IMAGE_BASED_URL + user?.profilePicture}}
                  style={styles.imageContainer}
                />
              ) : (
                <Ionicons
                  name="md-person-circle-outline"
                  size={60}
                  style={{marginLeft: wp('2')}}
                />
              )}
              <Text style={styles.modalUserName}>{user?.username}</Text>
            </View>
            <TextInput
              placeholder="What's on your mind ?"
              placeholderTextColor={'gray'}
              multiline
              value={shareText}
              onChangeText={e => setShareText(e)}
              maxHeight={hp('60')}
              style={styles.textInput}
            />
            <View style={styles.imageMainView}>
              {imageFromGalary?.length > 0 &&
                imageFromGalary.map((res, i, v) => {
                  return res.type == 'video/mp4' ? (
                    <View style={styles.selectImageStyle}>
                      <VideoPlayer
                        video={{uri: res?.uri}}
                        resizeMode="contain"
                        controls={true}
                        hideControlsOnStart={false}
                        fullScreenOnLongPress={true}
                        disableFullscreen={false}
                        loop={true}
                        videoWidth={wp('48')}
                        videoHeight={hp('30')}
                      />
                      <TouchableOpacity onPress={() => removeImage(i)}>
                        <Entypo
                          name="circle-with-cross"
                          size={20}
                          color={'white'}
                          style={{
                            ...styles.crossIcon,
                            marginTop: hp('-29'),
                            // backgroundColor: 'red',
                            marginLeft: wp('30'),
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : res.type == 'video/mp4' && 'image/jpeg' ? (
                    <View style={styles.selectImageStyle}>
                      <VideoPlayer
                        video={{uri: res?.uri}}
                        resizeMode="cover"
                        hideControlsOnStart={false}
                        fullScreenOnLongPress={true}
                        disableFullscreen={false}
                        controls={true}
                        loop={true}
                        videoWidth={wp('48')}
                        videoHeight={hp('30')}
                      />
                      <TouchableOpacity onPress={() => removeImage(i)}>
                        <Entypo
                          name="circle-with-cross"
                          size={20}
                          color={'white'}
                          style={{
                            ...styles.crossIcon,
                            marginTop: hp('-29'),
                            // backgroundColor: 'red',
                            marginLeft: wp('30'),
                          }}
                        />
                      </TouchableOpacity>
                      <ImageBackground
                        source={{uri: res?.uri}}
                        style={styles.selectImageStyle}>
                        <TouchableOpacity onPress={() => removeImage(i)}>
                          <Entypo
                            name="circle-with-cross"
                            size={20}
                            color={'white'}
                            style={styles.crossIcon}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                  ) : (
                    <ImageBackground
                      source={{uri: res?.uri}}
                      resizeMode="cover"
                      style={styles.selectImageStyle}>
                      <TouchableOpacity onPress={() => removeImage(i)}>
                        <Entypo
                          name="circle-with-cross"
                          size={20}
                          color={'white'}
                          style={styles.crossIcon}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  );
                })}
            </View>
          </ScrollView>
          <View style={styles.bottomMainView}>
            <TouchableOpacity
              onPress={() => pickImagesFromGalary()}
              style={styles.imagePickview}>
              <Entypo
                name="images"
                size={30}
                color={colors.sharePostModalIcon}
              />
            </TouchableOpacity>
            <View
              style={{
                height: '80%',
                width: 1,
                backgroundColor: 'gray',
                alignSelf: 'center',
              }}
            />
            <TouchableOpacity
              onPress={() => pickImagefromCamera()}
              style={styles.imagePickview}>
              <Entypo
                name="camera"
                size={30}
                color={colors.sharePostModalIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </NativeBaseProvider>
  );
};
