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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {Divider} from 'react-native-paper';
import {ApiGet, ApiPut} from '../../config/helpeerFetch';
import {IMAGE_BASED_URL, LikeUrl, TimeLineUrl} from '../../config/url';
import {getUserData} from '../../utils/utils';
import ImagePicker from '../../Reuseable Component/ImagePicker/imagePicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SharePostMoadl} from '../../Reuseable Component/SharePostModal/sharePostModal';
import {Button, useToast, Center, NativeBaseProvider} from 'native-base';
import {TimeLineData} from '../../config/TImeLineAllData/timeLineAllData';
import {showMessage} from 'react-native-flash-message';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function HomeScreen() {
  const toast = useToast();

  const [timeLineData, setTimeLineData] = useState(null);
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
  const getTimeLineData = async () => {
    const user = await getUserData();
    console.log(user);
    const userId = user._id;
    ApiGet(TimeLineUrl + userId).then(res => {
      if (res?.success == true) {
        setLoading(false);
        setTimeLineData(res?.data);
      } else if (res?.success == false) {
        setLoading(true);
      }
    });
  };
  const likeAndDislike = id => {
    var body = JSON.stringify({
      userId: user._id,
    });
    var url = LikeUrl + id + '/like';
    console.log(61, url);
    console.log(61, body);
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
            // ToastAndroid.
          );
        } else if (res?.data == 'The post has been disliked!') {
          setLike(false);
          getTimeLineData();
          ToastAndroid.show(
            'The post has been disliked!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        }
      } else if (res.success == false) {
        ToastAndroid.show(
          'Some Thing Is Wrong!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          500,
          // ToastAndroid.
        );
      }
    });
  };
  useEffect(() => {
    (async () => {
      const user = await getUserData();
      setUser(user);
      getTimeLineData();
    })();
  }, []);

  const openModal = () => {
    // return <SharePostMoadl />;
    return <Text>sjkfdjkasdfsbdabf</Text>;
    // setModalVisible(true);
  };

  const [state, setState] = useState(false);

  if (state) {
    return (
      <SharePostMoadl
        forHideModal={() => setState(false)}
        toastShow={() => useToast()}
      />
    );
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Image
              source={require('../../Images/removeimage.png')}
              style={styles.imageContainer}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerComponent}
            onPress={() => setState(true)}>
            <Text style={styles.headerText}>What's on your mind?</Text>
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
      />
    </ScrollView>
  );
}
