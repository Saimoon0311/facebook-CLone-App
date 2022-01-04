import React, {useEffect, useState} from 'react';
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
  PostUrl,
  TimeLineUrl,
} from '../../config/url';
import {getUserData} from '../../utils/utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, useToast, Center, NativeBaseProvider} from 'native-base';

export const SharePostMoadl = props => {
  const toast = useToast();
  const id = 'test-toast';
  const [user, setUser] = useState();
  const [shareText, setShareText] = useState('');
  const [imageFromGalary, setImageFromGalary] = useState([]);
  const [dummy, setDummy] = useState(1);
  useEffect(() => {
    (async () => {
      const user = await getUserData();
      setUser(user);
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
          console.log('Result', res?.assets);

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

  const sharePost = () => {
    var formdata = new FormData();
    imageFromGalary.map((res, i) => {
      console.log(119, res);
      formdata.append('file', {
        name: res.fileName,
        uri: res.uri,
        type: res.type,
      });
    });
    // var body = JSON.stringify({
    //   // userId: user._id,
    //   // description: shareText,
    //   image: imageFromGalary,
    // });
    ApiPost(ImageUploadUrl, formdata, true).then(res => {
      console.log(90, res);
    });
    // fetch(ImageUploadUrl, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     dataa,
    //   }),
    // })
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log(108, json);
    //   });
  };

  // const sharePost = () => {
  //   console.log(116, imageFromGalary);
  //   var formdata = new FormData();
  //   imageFromGalary.map((res, i) => {
  //     console.log(119, res);
  //     formdata.append('file', {
  //       name: res.fileName,
  //       uri: res.uri,
  //       type: res.type,
  //     });
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     body: formdata,
  //     redirect: 'follow',
  //   };

  //   fetch('http://192.168.20.43:5000/api/v1/upload', requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      // visible={true}
      onRequestClose={() => props?.onRequestClose()}>
      <View style={styles.centeredView}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => props?.forHideModal()}
            style={styles.modalBackArrow}>
            <Ionicons name="arrow-back" size={35} color={'black'} />
          </TouchableOpacity>
          <View style={styles.modalText}>
            <Text style={{fontSize: hp('3'), color: 'black'}}>Create Post</Text>
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
            // minHeight={hp('60')}
            maxHeight={hp('60')}
            style={styles.textInput}
          />
          <View style={styles.imageMainView}>
            {imageFromGalary?.length > 0 &&
              imageFromGalary.map((res, i, v) => {
                return (
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
                );
              })}
          </View>
        </ScrollView>
        <View style={styles.bottomMainView}>
          <TouchableOpacity
            onPress={() => pickImagesFromGalary()}
            style={styles.imagePickview}>
            <Entypo name="images" size={30} color={'gray'} />
          </TouchableOpacity>
          <View
            style={{
              height: '80%',
              width: 1,
              backgroundColor: 'gray',
              // backgroundColor: '#909090',
              // marginRight: wp('2'),
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity
            onPress={() => pickImagefromCamera()}
            style={styles.imagePickview}>
            <Entypo name="camera" size={30} color={'gray'} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
