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
import {ShowInputField} from '../../Reuseable Component/ShowInputField/showInputField';

export default function groupScreen() {
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
  const [like, setLike] = useState(false);
  const [isFouced, setIsFouced] = useState(false);
  const [group, setGroup] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
  ]);
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
    <ScrollView>
      <ShowInputField
        onPress={isFouced}
        hideInputField={() => setIsFouced(false)}
      />
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleConatiner}>
            <Text style={styles.headerTitle}>Group</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              // backgroundColor: 'red',
              right: wp('-15'),
            }}>
            <TouchableOpacity style={styles.sideicon}>
              <Ionicons name="add-circle" size={26} color={'#1A1A1A'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideicon}>
              <Ionicons name="settings-sharp" size={26} color={'#1A1A1A'} />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => setIsFouced(true)}
              style={styles.sideicon}>
              <Ionicons name="search" size={26} color={'#1A1A1A'} />
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.topTitleContainer}>
          <TouchableOpacity style={styles.topActiveTitleConatiner}>
            <Text style={styles.topActiveTitle}>For You</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color: 'black'}}>Your Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color: 'black'}}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color: 'black'}}>Manage</Text>
          </TouchableOpacity>
        </View>
        <Divider style={{backgroundColor: 'black'}} />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: hp('2'), marginBottom: hp('1')}}>
        {group.map(res => {
          return (
            <TouchableOpacity>
              <ImageBackground
                source={{
                  uri: 'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
                }}
                style={styles.groupContainer}>
                <LinearGradient
                  style={{
                    height: hp('20'),
                    opacity: 0.7,
                  }}
                  colors={['transparent', 'black']}></LinearGradient>
                <Text numberOfLines={2} style={styles.groupTitle}>
                  Web and Mobile hybrid application development
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
