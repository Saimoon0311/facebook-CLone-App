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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {Divider} from 'react-native-paper';
import {ApiGet} from '../../config/helpeerFetch';
import {IMAGE_BASED_URL, TimeLineUrl} from '../../config/url';
import {getUserData} from '../../utils/utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const SharePostMoadl = props => {
  // const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState();
  const [shareText, setShareText] = useState('');
  // const openModal = () => {
  //   setModalVisible(true);
  // };
  useEffect(() => {
    (async () => {
      const user = await getUserData();
      setUser(user);
      console.log(user);
    })();
    // getTimeLineData();
  }, []);
  return (
    <Modal
      animationType="slide"
      transparent={false}
      // visible={true}
      // onRequestClose={() => {
      //   Alert.alert('Modal has been closed.');
      //   setModalVisible(!modalVisible);
      // }}
    >
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
            <TouchableOpacity style={styles.modalButtonTouch}>
              <Text style={{color: 'white'}}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
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
          minHeight={hp('65')}
          style={{
            // backgroundColor: 'green',
            textAlignVertical: 'top',
            paddingLeft: wp('3'),
            paddingRight: wp('3'),
            fontSize: hp('3'),
            color: 'black',
          }}
        />
        <View></View>
      </View>
    </Modal>
  );
};
