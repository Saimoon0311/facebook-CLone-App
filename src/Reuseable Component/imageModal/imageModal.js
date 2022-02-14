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
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {ApiGet} from '../../config/helpeerFetch';
import {IMAGE_BASED_URL, GetAllPostUrl} from '../../config/url';
import {getUserData} from '../../utils/utils';
import ImagePicker from '../../Reuseable Component/ImagePicker/imagePicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SharePostMoadl} from '../../Reuseable Component/SharePostModal/sharePostModal';
import {Button, useToast, Center, NativeBaseProvider} from 'native-base';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import PhotoGrid from 'react-native-thumbnail-grid';
// import ReactPhotoGrid from 'react-photo-grid';
// import Photogrid from 'react-facebook-photo-grid';
import PhotoGrid from 'react-native-photo-grid';
import GridImageView from 'react-native-grid-image-viewer';
import ImageView from 'react-native-image-view';

export const ImageModal = props => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      // visible={true}
      onRequestClose={() => props?.forHideModal()}>
      <ScrollView></ScrollView>
    </Modal>
  );
};
