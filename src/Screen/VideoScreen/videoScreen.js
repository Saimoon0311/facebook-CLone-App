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
  ImageBackground,
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
import {
  Button,
  useToast,
  Center,
  NativeBaseProvider,
  Actionsheet,
} from 'native-base';
import {TimeLineData} from '../../config/TImeLineAllData/timeLineAllData';
import {showMessage} from 'react-native-flash-message';
import {ProfileScreenCategoryData} from '../../config/ProfileScreenCategoryData/profileScreenCategoryData';
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
import actions from '../../Redux/action';
import {colors} from '../../Reuseable Component/color';
import LinearGradient from 'react-native-linear-gradient';

export default function videoScreen() {
  const [timeLineData, setTimeLineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
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
        );
      }
    });
  };
  const [like, setLike] = useState(false);
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
  useEffect(() => {
    (async () => {
      const user = await getUserData();
      setUser(user);
      getTimeLineData();
    })();
  }, []);
  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleConatiner}>
            <Text style={styles.headerTitle}>Watch</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {/* <TouchableOpacity style={styles.sideicon}>
              <Ionicons name="person-sharp" size={26} color={'#1A1A1A'} />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.sideicon}>
              <Ionicons name="person-sharp" size={26} color={'#1A1A1A'} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.topTitleContainer}>
            <TouchableOpacity style={styles.topActiveTitleConatiner}>
              <Text style={styles.topActiveTitle}>For You</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: 'black', marginLeft: wp('4')}}>Live</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: 'black', marginLeft: wp('4')}}>Gaming</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: 'black', marginLeft: wp('4')}}>
                Following
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: 'black', marginLeft: wp('4')}}>Saving</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  marginLeft: wp('4'),
                  marginRight: wp('3'),
                }}>
                Manage
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Divider style={{backgroundColor: 'black'}} />
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
