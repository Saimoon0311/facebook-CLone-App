import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../Reuseable Component/color';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllFriendsUrl,
  getApi,
  getUserAllPostUrl,
  IMAGE_BASED_URL,
  LikeUrl,
} from '../../config/url';
import Svg, {Circle} from 'react-native-svg';
import {ApiGet, ApiPut} from '../../config/helpeerFetch';
import {Avatar, NativeBaseProvider} from 'native-base';
import {Divider} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import {TimeLineData} from '../../config/TImeLineAllData/timeLineAllData';
import UpdateProfileModal from '../../Reuseable Component/updateProfileModal/updateProfileModal';
import {TouchableButton} from '../../Reuseable Component/touchableButton/touchableButton';
import {SharePostMoadl} from '../../Reuseable Component/SharePostModal/sharePostModal';

// import {Avatar} from 'react-native-elements';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function UserScreen() {
  const {userData} = useSelector(state => state.auth);
  const [followings, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [fLoading, setFloading] = useState(true);
  const [timeLineData, setTimeLineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pagination, setPagination] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  const onRefresh = useCallback(() => {
    setLoading(true);
    setFloading(true);
    wait(2000).then(() => {
      getTimeLineData(), setLoading(false), getFollowing(), setFloading(false);
    });
  }, []);
  const getTimeLineData = async () => {
    const userName = userData.username;
    ApiGet(getUserAllPostUrl + userName).then(res => {
      if (res?.success == true) {
        setLoading(false);
        setTimeLineData(res?.data);
        console.log(69, res);
      } else if (res?.success == false) {
        console.log(69, res);
        setLoading(true);
      }
    });
  };
  const likeAndDislike = (id, val) => {
    var body = JSON.stringify({
      userId: userData._id,
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

  const getFollowing = () => {
    var url = getAllFriendsUrl + userData._id;
    // console.log(19, url);
    ApiGet(url).then(res => {
      // console.log(20, res);

      if (res.success == true) {
        setFloading(false);
        if (res.data.length > 0) {
          setFollowing(res.data);
        } else {
          setFollowing([]);
        }
      } else if (res.success == false) {
        setFollowing([]);
        ToastAndroid.show(
          'Some thing is wrong!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          500,
        );
      }
    });
  };
  var UserFollowers =
    userData.followers.length > 0 ? userData.followers.length : 0;
  var UserFollowings =
    userData.followings.length > 0 ? userData.followings.length : 0;
  var picture = userData.profilePicture
    ? IMAGE_BASED_URL + userData?.profilePicture
    : 'https://res.cloudinary.com/dd6tdswt5/image/upload/v1646134270/UserImages/txtwdjl60bddnqd8qxsc.png';
  useEffect(() => {
    getFollowing();
    getTimeLineData();
  }, []);
  const increaseText = () => {
    if (pagination == 2) {
      setPagination(undefined);
    } else {
      setPagination(2);
    }
  };
  const [state, setState] = useState(false);
  const forHideModal = async () => {
    await setState(false);
    await setLoading(true);
    await setFloading(true);
    getTimeLineData();
    getFollowing();
  };
  if (state) {
    return <SharePostMoadl forHideModal={() => forHideModal()} />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.defaultBgColor,
      }}>
      <StatusBar
        backgroundColor={colors.themePrimaryColor}
        barStyle="light-content"
      />
      {modalVisible ? (
        <UpdateProfileModal
          forHideModal={() => setModalVisible(false)}
          modalType={modalVisible}
        />
      ) : null}
      {/* <ImageBackground
        // onLayout={}
        blurRadius={10}
        // source={require('../../Images/downloa.png')}
        source={{
          uri: 'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
        }}
        tintColor="transparent"
        style={{
          flexDirection: 'row',
          // backgroundColor: 'transparent',
          // backgroundColor: 'rgba(232,64,64,0.5)',
          height: hp('10'),
          alignItems: 'center',
          opacity: 0.5,
          // blurRadius: 0.5,
        }}>
        <Ionicons
          name="arrow-back-outline"
          color={colors.defaultTextColor}
          size={hp('6')}
        />
        <View></View>
        <View></View>
      </ImageBackground> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.defaultBgColor,
          paddingBottom: hp('1'),
        }}>
        <NativeBaseProvider>
          <ImageBackground
            style={styles.topImage}
            // borderBottomRightRadius={25}
            borderBottomLeftRadius={100}
            resizeMode="cover"
            source={{
              uri: 'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
            }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Avatar
                style={styles.userImage}
                // mr={1}
                background="transparent"
                size={100}
                source={{
                  uri: picture,
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
          <Text style={styles.userName}>{userData.username}</Text>
          <TouchableOpacity
            onPress={() => setState(true)}
            style={styles.createPostButton}>
            <Text style={styles.createPostText}>Create Post</Text>
          </TouchableOpacity>
          {fLoading ? (
            <SkeletonPlaceholder>
              <Divider style={styles.divider} />
              <View style={{flexDirection: 'row', marginLeft: wp('2')}}>
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={50}
                  borderWidth={2}
                  borderColor="red"
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  borderRadius={50}
                  borderWidth={2}
                  borderColor="white"
                  left={wp(-5)}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  height={60}
                  left={wp(-8)}
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  left={wp(-11)}
                  height={60}
                  borderWidth={2}
                  borderColor="red"
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  left={wp(-13)}
                  height={60}
                  borderWidth={2}
                  borderColor="red"
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  left={wp(-17)}
                  height={60}
                  borderWidth={2}
                  borderColor="red"
                  borderRadius={50}
                />
                <SkeletonPlaceholder.Item
                  width={60}
                  left={wp(-21)}
                  height={60}
                  borderWidth={2}
                  borderColor="red"
                  borderRadius={50}
                  marginBottom={hp('1')}
                />
              </View>
              <Divider style={styles.divider} />
            </SkeletonPlaceholder>
          ) : (
            followings.length > 0 && (
              <>
                <Divider style={styles.divider} />
                <Text style={styles.subHeadings}>You Following</Text>
                <View style={{alignItems: 'flex-start', paddingLeft: wp('2')}}>
                  <TouchableOpacity>
                    <Avatar.Group>
                      {followings.map(res => {
                        var str = res.username;
                        var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
                        var acronym = matches.join('');
                        return (
                          <Avatar
                            bg={colors.themePrimaryColor}
                            size={wp('15')}
                            source={{
                              uri: IMAGE_BASED_URL + res?.profilePicture,
                            }}>
                            {acronym}
                          </Avatar>
                        );
                      })}
                    </Avatar.Group>
                  </TouchableOpacity>
                </View>
                {/* <Divider style={{...styles.divider, marginTop: hp('1.5')}} /> */}
              </>
            )
          )}
          {/* {followers.length > 0 && (
          <>
            <Text
              style={{
                color: colors.defaultTextColor,
                fontSize: hp('3'),
                marginLeft: wp('2'),
              }}>
              Your Followers
            </Text>
            <View style={{alignItems: 'flex-start', paddingLeft: wp('2')}}>
              <TouchableOpacity>
                <Avatar.Group>
                  {followers.map(res => {
                    return (
                      // <TouchableOpacity>
                      <Avatar
                        size={wp('15')}
                        source={{
                          uri: IMAGE_BASED_URL + res?.profilePicture,
                        }}
                      />
                    );
                  })}
                </Avatar.Group>
              </TouchableOpacity>
            </View>
          </>
        )} */}
          {userData.description ? (
            <View>
              <Divider style={{...styles.divider, marginTop: hp('1')}} />
              <Text style={styles.subHeadings}>About</Text>
              <TouchableOpacity onPress={() => increaseText()}>
                <Text numberOfLines={pagination} style={styles.description}>
                  {userData?.description}
                </Text>
              </TouchableOpacity>
              {/* <Divider style={styles.divider} /> */}
            </View>
          ) : null}
          <View
            style={{backgroundColor: colors.postDivider, marginTop: hp('1')}}>
            <TimeLineData
              timeLineData={timeLineData}
              isloading={loading}
              user={userData}
              like={likeAndDislike}
              Islike={like}
              // hideAndUnhide={confirm => hideAndUnhide(confirm)}
              whenPostDeleted={confirm => whenPostDeleted(confirm)}
            />
          </View>
        </NativeBaseProvider>
      </ScrollView>
    </View>
  );
}

export default UserScreen;
