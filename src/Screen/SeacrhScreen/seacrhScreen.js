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
  TouchableHighlight,
  Animated
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {Divider} from 'react-native-paper';
import {ApiGet, ApiPut} from '../../config/helpeerFetch';
import {IMAGE_BASED_URL, LikeUrl, GetAllPostUrl} from '../../config/url';
import {getUserData} from '../../utils/utils';
import ImagePicker from '../../Reuseable Component/ImagePicker/imagePicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SharePostMoadl} from '../../Reuseable Component/SharePostModal/sharePostModal';
import {Button, useToast, Center, NativeBaseProvider} from 'native-base';
import {TimeLineData} from '../../config/TImeLineAllData/timeLineAllData';
import {showMessage} from 'react-native-flash-message';
const {Value,timing} = Animated
const width = Dimensions.get("window").width
const height = Dimensions.get('window').height


export default function seacrhScreen (){
  const[isFouced , setIsFouced]= useState(false),
  const [keyBoard,setKeyBoard] = useState('')
  var _input_box_translate_x = new Value(width)
  var back_button_opacity = new Value(0)
  var content_translate_y = new Value(height)
  var content_opacity = new Value(0)
  return(
    <View>
      <View></View>
    </View>
  )
}