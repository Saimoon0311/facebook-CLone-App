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
  getaUserUrl,
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
import {useRoute} from '@react-navigation/native';

// import {Avatar} from 'react-native-elements';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function UserScreen({route, navigation}) {
  const {userData} = useSelector(state => state.auth);
  // console.log(50, 'update Redux', userData);
  const routes = useRoute();
  const screenName = routes.name;
  let g;
  const confirms = route.params;
  const [followings, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [fLoading, setFloading] = useState(true);
  const [timeLineData, setTimeLineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pagination, setPagination] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const [userName, setUserName] = useState();
  const [userPicture, setUserPicture] = useState();
  const [userDescription, setUserDescription] = useState('');
  const [getUser, setGetUser] = useState();
  const onRefresh = useCallback(() => {
    setLoading(true);
    setFloading(true);
    wait(2000).then(() => {
      getTimeLineData(userName),
        setLoading(false),
        getFollowing(),
        setFloading(false),
        check();
    });
  }, []);
  const getTimeLineData = async name => {
    ApiGet(getUserAllPostUrl + name).then(res => {
      console.log(82, name);
      if (res?.success == true) {
        setLoading(false);
        setTimeLineData(res?.data);
      } else if (res?.success == false) {
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
          getTimeLineData(userName);
          ToastAndroid.show(
            'The post has been liked!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            500,
          );
        } else if (res?.data == 'The post has been disliked!') {
          setLike(false);
          getTimeLineData(userName);
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
      getTimeLineData(userData.username);
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
  var users;
  const getUserData = async () => {
    var id = confirms.datas.userId;
    var url = getaUserUrl + id;
    await ApiGet(url).then(res => {
      console.log(147, res);
      if (res.success == true) {
        users = res.data;
      } else if (res.success == false) {
        ToastAndroid.show(
          'SOme thing is wrong!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          500,
        );
      } else {
        ToastAndroid.show(
          'SOme thing is wrong!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          500,
        );
      }
    });
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
  const check = async () => {
    // console.log(197, 'check function');
    if (confirms.confirms == false) {
      // console.log(199, 'false');
      await getUserData();
      g = users.profilePicture
        ? IMAGE_BASED_URL + users.profilePicture
        : 'https://res.cloudinary.com/dd6tdswt5/image/upload/v1646134270/UserImages/txtwdjl60bddnqd8qxsc.png';
      setUserPicture(g);
      var des = users.description ? users.description : '';
      setUserDescription(des);
      setUserName(users.username);
      setCheckUser(false);
      getTimeLineData(users.username);
    } else {
      // console.log(199, 'true');
      g = userData.profilePicture
        ? IMAGE_BASED_URL + userData.profilePicture
        : 'https://res.cloudinary.com/dd6tdswt5/image/upload/v1646134270/UserImages/txtwdjl60bddnqd8qxsc.png';
      setUserPicture(g);
      setUserDescription(userData.description);
      setUserName(userData.username);
      setCheckUser(true);
      getFollowing();
      // console.log(220, userData);
      getTimeLineData(userData.username);
    }
  };
  useEffect(() => {
    check();
  }, [userData]);
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
    await setModalVisible(false);
    await setLoading(true);
    await setFloading(true);
    // console.log(238);
    check();
  };
  const forShowModal = () => {
    console.log(245);
    if (userName == userData.username) {
      setModalVisible(true);
    } else {
      console.log(248);
    }
  };
  const hideAndUnhide = confirm => {
    if (confirm == true) {
      // setLoading(true);
      getTimeLineData(userName);
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
      {/* {console.log(257, userName)}
      {console.log(262, userData.username)} */}
      {modalVisible ? (
        <UpdateProfileModal
          forHideModal={async () => {
            await forHideModal();
          }}
          modalType={modalVisible}
        />
      ) : null}
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
            borderBottomLeftRadius={100}
            resizeMode="cover"
            source={{
              uri: 'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
            }}>
            <TouchableOpacity onPress={() => forShowModal()}>
              <Image
                style={styles.userImage}
                source={{
                  uri: userPicture,
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
          <Text style={styles.userName}>{userName}</Text>
          {checkUser == true ? (
            <>
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
                      borderColor="white"
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
                      borderColor="white"
                      borderRadius={50}
                    />
                    <SkeletonPlaceholder.Item
                      width={60}
                      left={wp(-13)}
                      height={60}
                      borderWidth={2}
                      borderColor="white"
                      borderRadius={50}
                    />
                    <SkeletonPlaceholder.Item
                      width={60}
                      left={wp(-17)}
                      height={60}
                      borderWidth={2}
                      borderColor="white"
                      borderRadius={50}
                    />
                    <SkeletonPlaceholder.Item
                      width={60}
                      left={wp(-21)}
                      height={60}
                      borderWidth={2}
                      borderColor="white"
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
                    <View
                      style={{alignItems: 'flex-start', paddingLeft: wp('2')}}>
                      <TouchableOpacity>
                        <Avatar.Group borderWidth={1.2}>
                          {followings.map(res => {
                            var str = res.username;
                            var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
                            var acronym = matches.join('');
                            return (
                              <Avatar
                                // bgColor={'red.100'}
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
            </>
          ) : null}

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
          {/* {console.log(450, userDescription)} */}
          {userDescription !== '' && userDescription !== undefined ? (
            <View>
              <Divider style={{...styles.divider, marginTop: hp('1')}} />
              <Text style={styles.subHeadings}>About</Text>
              <TouchableOpacity onPress={() => increaseText()}>
                <Text numberOfLines={pagination} style={styles.description}>
                  {userDescription}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View
            style={{backgroundColor: colors.postDivider, marginTop: hp('1')}}>
            <TimeLineData
              timeLineData={timeLineData}
              isloading={loading}
              user={userData}
              like={likeAndDislike}
              hideAndUnhide={confirm => hideAndUnhide(confirm)}
              Islike={like}
              whenPostDeleted={confirm => whenPostDeleted(confirm)}
              routeName={screenName}
            />
          </View>
        </NativeBaseProvider>
      </ScrollView>
    </View>
  );
}

export default UserScreen;
