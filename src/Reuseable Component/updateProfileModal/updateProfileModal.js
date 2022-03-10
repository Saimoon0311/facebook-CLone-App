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
  Switch,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar, Divider} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Button,
  useToast,
  Center,
  NativeBaseProvider,
  Actionsheet,
  Radio,
} from 'native-base';
import {showMessage} from 'react-native-flash-message';
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
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {InputField} from '../inputField/inputField';
import {TouchableButton} from '../touchableButton/touchableButton';
import {IMAGE_BASED_URL, UpdatePostUrl, UpdateUserUrl} from '../../config/url';
import {ApiPut} from '../../config/helpeerFetch';
import types from '../../Redux/type';

function UpdateProfileModal(props) {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.auth);
  const [username, setUsername] = useState(userData.username);
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber);
  const [country, setCountry] = useState(userData?.country);
  const [city, setCity] = useState(userData?.city);
  const [profilePicture, setProfilePicture] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(userData?.description);
  const pickImage = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        quality: 0.5,
      },
      res => {
        if (!res?.didCancel) {
          setProfilePicture(res.assets);
        }
      },
    );
  };
  const updateProfilePicture = () => {
    setIsLoading(true);
    if (profilePicture.length > 0) {
      var formdata = new FormData();
      formdata.append('upload_preset', 'upload');
      formdata.append('folder', 'UserImages');
      formdata.append('file', {
        name: profilePicture[0]?.fileName,
        uri: profilePicture[0]?.uri,
        type: profilePicture[0]?.type,
      });

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch('https://api.cloudinary.com/v1_1/dd6tdswt5/upload', requestOptions)
        .then(response => response.json())
        .then(result => {
          const {public_id} = result;
          updateProfile(public_id);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false), console.log('error', error);
        });
    } else {
      var empty = userData.profilePicture ? userData.profilePicture : '';
      updateProfile(empty);
    }
  };

  const updateProfile = profilePicture => {
    if (username || phoneNumber || city || country) {
      var url = UpdateUserUrl + userData._id;
      var userId = userData._id;
      var body = JSON.stringify({
        username,
        phoneNumber,
        country,
        city,
        profilePicture,
        userId,
        description,
      });
      // console.log(133, body);
      ApiPut(url, body, false).then(res => {
        if (res.success == true) {
          props.forHideModal();
          setTimeout(() => {
            dispatch({
              type: types.LOGIN,
              payload: res.data,
            });
          }, 2000);
          ToastAndroid.show(
            'Your profile has been updated!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            500,
          );
          // console.log(130, res);
        } else if (res.success == false) {
          ToastAndroid.show(
            'Some thing is wrong!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            500,
          );
          // console.log(132, res);
        } else {
          // console.log(134, res);
        }
      });
    } else {
      showMessage({
        type: 'warning',
        icon: 'auto',
        message: 'Warning',
        description: 'jksdfjk',
      });
    }
  };
  const imageData = () => {
    if (userData?.profilePicture) {
      var uri = IMAGE_BASED_URL + userData?.profilePicture;
      userData.profilePicture
        ? setProfilePicture([{uri: uri}])
        : setProfilePicture([]);
    } else {
    }
  };
  return (
    <View style={styles.centeredView}>
      <NativeBaseProvider>
        <Modal
          animationType="slide"
          transparent={true}
          collapsable={true}
          visible={props.modalType}
          onRequestClose={() => {
            props.forHideModal();
          }}>
          <View style={styles.centeredView}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              contentContainerStyle={styles.modalView}>
              <ImageBackground
                borderRadius={20}
                style={{
                  width: wp('100'),
                  // paddingBottom: hp('10'),
                  overflow: 'hidden',
                }}
                blurRadius={3}
                source={require('../../Images/splashScreen.jpg')}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom: hp('2')}}>
                  <Text style={styles.modalText}>Update Your Profile</Text>
                  {profilePicture.length > 0 ? (
                    <TouchableOpacity
                      style={styles.imageContainer}
                      onPress={() => pickImage()}>
                      <Image
                        style={styles.imageContainer}
                        source={{uri: profilePicture[0]?.uri}}
                      />
                    </TouchableOpacity>
                  ) : userData.profilePicture ? (
                    <TouchableOpacity
                      style={styles.imageContainer}
                      onPress={() => pickImage()}>
                      <Image
                        style={styles.imageContainer}
                        source={{
                          uri: IMAGE_BASED_URL + userData.profilePicture,
                        }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{marginLeft: wp('2'), alignSelf: 'center'}}
                      onPress={() => pickImage()}>
                      <Entypo
                        style={{marginLeft: wp('2'), alignSelf: 'center'}}
                        name="add-user"
                        size={60}
                        color={'white'}
                      />
                    </TouchableOpacity>
                  )}
                  <InputField
                    label="Name"
                    onChangeText={e => setUsername(e)}
                    value={username}
                    firstIconName="person-outline"
                    inputWidth="80"
                    // TextInputColor={colors.defaultTextColor}
                    TextInputColor={'black'}
                  />
                  <InputField
                    label="Email"
                    editable={false}
                    value={userData.email}
                    autoCapble="none"
                    firstIconName="mail-outline"
                    // TextInputColor={colors.defaultTextColor}
                    TextInputColor={'black'}
                    inputWidth="80"
                  />
                  <InputField
                    label="Phone Number"
                    onChangeText={e => setPhoneNumber(e)}
                    value={phoneNumber}
                    // TextInputColor={colors.defaultTextColor}
                    TextInputColor={'black'}
                    autoCapble="none"
                    firstIconName="call-outline"
                    keyboardType="phone-pad"
                    inputWidth="80"
                  />
                  <InputField
                    label="City"
                    onChangeText={e => setCity(e)}
                    value={city}
                    // TextInputColor={colors.defaultTextColor}
                    TextInputColor={'black'}
                    autoCapble="none"
                    firstIconName="home-outline"
                    inputWidth="80"
                    // keyboardType="phone-pad"
                  />
                  <InputField
                    label="Country"
                    onChangeText={e => setCountry(e)}
                    // TextInputColor={colors.defaultTextColor}
                    TextInputColor={'black'}
                    value={country}
                    autoCapble="none"
                    firstIconName="earth-outline"
                    inputWidth="80"
                    // keyboardType="phone-pad"
                  />
                  <InputField
                    label="Description"
                    onChangeText={e => setDescription(e)}
                    // TextInputColor={colors.defaultTextColor}
                    TextInputColor={'black'}
                    value={description}
                    autoCapble="none"
                    multiline={true}
                    firstIconName="description"
                    inputWidth="80"
                    numberOfLines={5}
                    textAlignVertical="top"
                    iconType={true}
                  />
                  <TouchableButton
                    // width="65"
                    iconName="create-outline"
                    iconColor="white"
                    text="Update"
                    loading={isLoading}
                    onPress={() => updateProfilePicture()}
                  />
                </ScrollView>
              </ImageBackground>
            </ScrollView>
          </View>
        </Modal>
      </NativeBaseProvider>
    </View>
  );
}

export default UpdateProfileModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: wp('4'),
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: hp('10'),
    height: hp('91'),
    zIndex: 1,
  },
  modalText: {
    marginBottom: hp('2'),
    fontSize: hp('3'),
    marginTop: hp('2'),
    textAlign: 'center',
    color: 'black',
  },
  imageContainer: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('screen').width * 0.2,
    height: Dimensions.get('screen').width * 0.2,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
