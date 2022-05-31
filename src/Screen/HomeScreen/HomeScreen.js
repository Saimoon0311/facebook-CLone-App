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
  Animated,
  Appearance,
  StatusBar,
  AlertIOS,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {Divider} from 'react-native-paper';
import {ApiGet, ApiPut} from '../../config/helpeerFetch';
import {
  IMAGE_BASED_URL,
  LikeUrl,
  GetAllPostUrl,
  HidePostUrl,
} from '../../config/url';
import {getUserData} from '../../utils/utils';
import ImagePicker from '../../Reuseable Component/ImagePicker/imagePicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SharePostMoadl} from '../../Reuseable Component/SharePostModal/sharePostModal';
import {Button, useToast, Center, NativeBaseProvider} from 'native-base';
import {TimeLineData} from '../../config/TImeLineAllData/timeLineAllData';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {colors} from '../../Reuseable Component/color';
import {useIsFocused} from '@react-navigation/native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function HomeScreen({navigation}) {
  const {userData} = useSelector(state => state.auth);
  const isFocused = useIsFocused();

  const toast = useToast();

  const [timeLineData, setTimeLineData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [like, setLike] = useState(false);
  const [user, setUser] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const onRefresh = useCallback(() => {
    setLoading(true);
    wait(2000).then(() => {
      getTimeLineData(), setLoading(false);
    });
  }, []);
  const whenPostDeleted = confirm => {
    if (confirm == true) {
      setLoading(true);
      getTimeLineData();
    } else if (confirm == false) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Warning',
        description: 'Some thing is wrong',
        backgroundColor: colors.statusBarColor,
      });
    }
  };
  const navigate = (confirm, data) => {
    navigation.navigate('userScreen', {confirms: confirm, datas: data});
  };
  const getTimeLineData = async () => {
    const userId = await userData._id;
    ApiGet(GetAllPostUrl).then(res => {
      if (res?.success == true) {
        setLoading(false);
        setTimeLineData(res.data);
      } else if (res?.success == false) {
        setLoading(true);
      }
    });
  };
  const likeAndDislike = (id, val) => {
    var body = JSON.stringify({
      userId: user._id,
    });
    var url = LikeUrl + id + '/like';
    ApiPut(url, body).then(res => {
      if (res.success == true) {
        if (res?.data == 'The post has been liked!') {
          setLike(true);
          getTimeLineData();
          ToastAndroid.show(
            'The post has been liked!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            500,
          );
        } else if (res?.data == 'The post has been disliked!') {
          setLike(false);
          getTimeLineData();
          ToastAndroid.show(
            'The post has been disliked!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
          Platform.OS == 'ios' && AlertIOS.alert('The post has been disliked!');
        }
      } else if (res.success == false) {
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

  const hideAndUnhide = confirm => {
    if (confirm == true) {
      getTimeLineData();
    } else if (confirm == false) {
      showMessage({
        type: 'warning',
        icon: 'warning',
        message: 'Warning',
        description: 'Some thing is wrong',
        backgroundColor: colors.statusBarColor,
      });
    }
  };
  useEffect(() => {
    (() => {
      if (isFocused) {
        getTimeLineData();
      } else {
        console.log(149);
      }
      setUser(userData);
    })();
  }, [isFocused]);

  const openModal = () => {
    return <Text>sjkfdjkasdfsbdabf</Text>;
  };

  const [state, setState] = useState(false);
  const forHideModal = async () => {
    await setState(false);
    await setLoading(true);
    getTimeLineData();
  };
  if (state) {
    return (
      <SharePostMoadl
        forHideModal={() => forHideModal()}
        toastShow={() => useToast()}
      />
    );
  }
  return (
    <>
      <StatusBar hidden={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{backgroundColor: colors.postDivider}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <View style={styles.headerContainer}>
            {userData.profilePicture ? (
              <Image
                source={{uri: IMAGE_BASED_URL + userData.profilePicture}}
                style={styles.imageContainer}
              />
            ) : (
              <Image
                source={require('../../Images/removeimage.png')}
                style={styles.imageContainer}
              />
            )}
            <TouchableOpacity
              style={styles.headerComponent}
              onPress={() => setState(true)}>
              <Text style={styles.headerText}>What's on your mind ?</Text>
            </TouchableOpacity>
          </View>
          <Divider style={{borderColor: 'gray', borderWidth: 0.3}} />
        </View>
        <TimeLineData
          timeLineData={timeLineData}
          isloading={loading}
          user={user}
          like={likeAndDislike}
          Islike={like}
          hideAndUnhide={confirm => hideAndUnhide(confirm)}
          whenPostDeleted={confirm => whenPostDeleted(confirm)}
          onPress={(confirm, data) => navigate(confirm, data)}
        />
      </ScrollView>
    </>
  );
}
