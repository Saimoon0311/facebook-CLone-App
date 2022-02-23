import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../Reuseable Component/color';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFriendsUrl, getApi, IMAGE_BASED_URL} from '../../config/url';
import Svg, {Circle} from 'react-native-svg';
import {ApiGet} from '../../config/helpeerFetch';
import {Avatar, Divider, NativeBaseProvider} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import {Avatar} from 'react-native-elements';

function UserScreen() {
  const {userData} = useSelector(state => state.auth);
  const [followings, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [fLoading, setFloading] = useState(true);
  const getFollowing = () => {
    var url = getAllFriendsUrl + userData._id;
    console.log(19, url);
    ApiGet(url).then(res => {
      console.log(20, res);

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
    : 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
  useEffect(() => {
    getFollowing();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: colors.defaultBgColor,
        paddingBottom: hp('5'),
      }}>
      <NativeBaseProvider>
        <ImageBackground
          borderRadius={15}
          style={styles.topImage}
          source={{
            uri: 'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
          }}>
          <Avatar
            style={styles.userImage}
            mr={1}
            background="transparent"
            size={100}
            source={{
              uri: picture,
            }}
          />
        </ImageBackground>
        <Text style={styles.userName}>{userData.username}</Text>
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
                      return (
                        <Avatar
                          bg="green.500"
                          size={wp('15')}
                          source={{
                            uri: IMAGE_BASED_URL + res?.profilePicture,
                          }}>
                          SM
                        </Avatar>
                      );
                    })}
                  </Avatar.Group>
                </TouchableOpacity>
              </View>
              <Divider style={styles.divider} />
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
        {userData?.description && (
          <View>
            <Text style={styles.subHeadings}>About</Text>
            <Text style={styles.description}>{userData?.description}</Text>
            <Divider style={styles.divider} />
          </View>
        )}
      </NativeBaseProvider>
    </ScrollView>
  );
}

export default UserScreen;
