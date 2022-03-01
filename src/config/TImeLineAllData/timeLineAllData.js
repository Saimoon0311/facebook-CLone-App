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
  Share,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {ApiGet, ApiPost, ApiPut} from '../../config/helpeerFetch';
import {
  API_BASED_URL,
  IMAGE_BASED_URL,
  LikeUrl,
  GetAllPostUrl,
} from '../../config/url';
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
import {ImageModal} from '../../Reuseable Component/imageModal/imageModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../Reuseable Component/color';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import * as Animatable from 'react-native-animatable';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import {SettingModal} from '../../Reuseable Component/settingModal/settingModal';
import {ModalPortal} from 'react-native-modals';
import darkColors from 'react-native-elements/dist/config/colorsDark';
import {useSelector} from 'react-redux';
import moment from 'moment';

export const TimeLineData = props => {
  const [imageArray, setImageArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // const [pagination, setPagination] = useState(2);
  const [dummy, setDummy] = useState(1);
  const [modaShow, setModalShow] = useState(false);
  const [like, setLike] = useState(false);
  const [stateBounce, setStateBounce] = useState('');
  const [postData, setPostData] = useState([]);
  const [click, setClick] = useState();
  var data = props?.timeLineData;
  const {userData} = useSelector(state => state.auth);

  // const forHidePost = (item) => {
  //   var body = JSON.stringify({
  //     userId: userData._id,
  //   });
  //   var id = props.postData._id;
  //   var url = HidePostUrl + id + '/hide';
  //   ApiPut(url, body).then(res => {
  //     if (res.success == true) {
  //       props?.forHideModal();
  //       if (res?.data == 'The post has been hide!') {
  //         ToastAndroid.show(
  //           'The post has been hide!',
  //           ToastAndroid.LONG,
  //           ToastAndroid.BOTTOM,
  //           25,
  //           500,
  //         );
  //       } else if (res?.data == 'The post has been unhide!') {
  //         ToastAndroid.show(
  //           'The post has been unhide!',
  //           ToastAndroid.LONG,
  //           ToastAndroid.BOTTOM,
  //         );
  //       }
  //     } else if (res.success == false) {
  //       ToastAndroid.show(
  //         'Some Thing Is Wrong!',
  //         ToastAndroid.LONG,
  //         ToastAndroid.BOTTOM,
  //         25,
  //         500,
  //       );
  //     }
  //   });
  // };

  const hidePostContainer = item => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          {item.profilePicture ? (
            <Image
              source={{uri: IMAGE_BASED_URL + item.profilePicture}}
              style={styles.postImage}
            />
          ) : (
            <Ionicons
              name={'person-circle-outline'}
              size={50}
              color={colors.defaultTextColor}
              style={{paddingLeft: wp('1')}}
            />
          )}
          <View
            style={{
              flexDirection: 'column',
              marginLeft: wp('1'),
              marginTop: hp('1'),
            }}>
            <Text style={{...styles.postName}}>{item?.postName}</Text>
            <Text style={{color: 'gray', fontSize: hp('2')}}>
              (This post was hidden)
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true), setPostData(item);
            }}
            style={styles.hidePostUndoButton}>
            <Text style={{color: 'white'}}>Undo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const flatListData = (item, index) => {
    var pagination = index == click ? undefined : 2;
    // var postTime = moment(item.createdAt).calendar();
    var postTime = moment(item.createdAt).format('DD MMM YY, h:mm a');
    const showPagination = index => {
      setClick(index);
      if (click == index) {
        pagination = undefined;
      } else {
        pagination = 2;
      }
    };
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity>
          <View style={styles.header}>
            {item.profilePicture ? (
              <Image
                source={{
                  uri: IMAGE_BASED_URL + item.profilePicture,
                }}
                style={styles.postImage}
              />
            ) : (
              <Ionicons
                name={'person-circle-outline'}
                size={50}
                color={colors.defaultTextColor}
                style={{paddingLeft: wp('1')}}
              />
            )}
            <View
              style={{
                marginLeft: wp('1.5'),
                marginTop: hp('1'),
              }}>
              <Text numberOfLines={2} style={styles.postName}>
                {item?.postName}
              </Text>
              <Text style={{color: 'gray', fontSize: hp('2')}}>{postTime}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true), setPostData(item);
              }}
              style={{
                marginLeft: 'auto',
                justifyContent: 'center',
                marginRight: wp('2'),
              }}>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color={colors.defaultTextColor}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            showPagination(index);
          }}>
          <Text numberOfLines={pagination} style={styles.description}>
            {item?.description}
            {/* Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. */}
          </Text>
        </TouchableOpacity>
        {item.image ? (
          <Image
            source={{uri: IMAGE_BASED_URL + item?.image}}
            // source={{
            //   uri: 'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
            // }}
            resizeMode="contain"
            style={{
              width: wp('100'),
              height: hp('40'),
              backgroundColor: 'rgba(231,241,254,0.5)',
              // backgroundColor: '#E7F1FE',
            }}
          />
        ) : null}
        {/* <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      maxHeight: hp('60'),
                    }}>
                    {item.image.length > 0 && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                        {item.image.map((res, i) => {
                          return (
                            <View>
                              {item.image.length == 1 ? (
                                <>
                                  <Image
                                    source={{uri: IMAGE_BASED_URL + res}}
                                    // source={{
                                    //   uri: 'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
                                    // }}
                                    style={{
                                      width: wp('100'),
                                      height: hp('40'),
                                    }}
                                  />
                                </>
                              ) : item.image.length == 2 ? (
                                <View>
                                  <Image
                                    source={{uri: IMAGE_BASED_URL + res}}
                                    // source={{
                                    //   uri: 'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
                                    // }}
                                    style={{
                                      width: wp('50'),
                                      height: hp('40'),
                                      flexDirection: 'row',
                                    }}
                                  />
                                </View>
                              ) : (
                                <ScrollView
                                  nestedScrollEnabled={true}
                                  contentContainerStyle={{
                                    height: 'auto',
                                  }}>
                                  {item.image.length >= 3 && (
                                    <TouchableOpacity>
                                      <Image
                                        source={{uri: IMAGE_BASED_URL + res}}
                                        // source={{
                                        //   uri: 'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
                                        // }}
                                        style={{
                                          width: wp('50'),
                                          height: hp('30'),
                                        }}
                                      />
                                    </TouchableOpacity>
                                  )}
                                </ScrollView>
                              )}
                            </View>
                          );
                        })}
                      </ScrollView>
                    )}
                  </ScrollView> */}
        {item?.likes.length > 0 && (
          <TouchableOpacity style={styles.likeContainer}>
            <AntDesign name={'like1'} size={19} color={'#2055FB'} />
            <Text
              style={{
                fontSize: hp('2.5'),
                color:
                  colors.defaultTextColor == '#f1f2f6'
                    ? colors.defaultTextColor
                    : '#2055FB',
                marginTop: hp('0.5'),
                marginLeft: wp('1'),
              }}>
              {item?.likes.length}
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.likeShareContainer}>
          <TouchableOpacity
            onPress={() => {
              props?.like(item._id);
              setStateBounce('bounceIn');
            }}
            style={styles.likeButton}>
            <Animatable.View
              onAnimationEnd={() => setStateBounce('')}
              animation={stateBounce}
              // easing="ease-in-circ"
              style={styles.likeButton}>
              <Text
                style={{
                  ...styles.shareText,
                  color: item.likes.includes(props?.user._id)
                    ? '#2055FB'
                    : colors.defaultTextColor,
                }}>
                Like
              </Text>
              <AntDesign
                name={item.likes.includes(props?.user._id) ? 'like1' : 'like2'}
                size={19}
                color={
                  item.likes.includes(props?.user._id)
                    ? '#2055FB'
                    : colors.defaultTextColor
                }
              />
            </Animatable.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Share.share({
                url: 'https://media.istockphoto.com/photos/thumbnail-book-picture-id1287159334?b=1&k=20&m=1287159334&s=170667a&w=0&h=9kPAkWnDSMIP-6qNuEZrJ4EFw4B1Om-cYVcPLVTt4TM=',
                message: 'sd',
                // message:
                //   'React Native | A framework for building native apps using React',
                // title: 'w',
                // url: 'https://www.google.com/',
              })
            }
            style={styles.likeButton}>
            <Text style={styles.shareText}>Share</Text>
            <MaterialCommunityIcons
              color={colors.defaultTextColor}
              name="share-all-outline"
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <MenuContext>
      {modalVisible ? (
        <SettingModal
          modalType={modalVisible}
          postData={postData}
          forHideModal={() => {
            setModalVisible(false);
          }}
          whenPostDeleted={confirm => props?.whenPostDeleted(confirm)}
          hideAndUnhide={confirm => props?.hideAndUnhide(confirm)}
        />
      ) : null}
      <View>
        {props?.isloading ? (
          <SkeletonPlaceholder>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  ...styles.mainContainer,
                  backgroundColor: 'transparent',
                }}>
                <View
                  style={{...styles.header, backgroundColor: 'transparent'}}>
                  <View style={{...styles.postImage}} />
                  <View
                    style={{
                      ...styles.postName,
                      width: wp('40'),
                      height: hp('4'),
                      borderRadius: wp('15'),
                      marginTop: hp('2'),
                      marginLeft: wp('2'),
                    }}
                  />
                </View>
                <View
                  style={{
                    ...styles.description,
                    marginTop: hp('1'),
                    marginLeft: hp('2'),
                    height: hp('2'),
                    borderRadius: wp('15'),
                    width: wp('90'),
                  }}
                />
                <View
                  style={{
                    ...styles.description,
                    marginBottom: hp('2'),
                    marginLeft: hp('2'),
                    height: hp('2'),
                    borderRadius: wp('15'),
                    width: wp('80'),
                    marginTop: hp('1'),
                  }}
                />
                <View
                  style={{
                    width: wp('100'),
                    height: hp('40'),
                  }}
                />
              </View>
              <View
                style={{
                  ...styles.mainContainer,
                  backgroundColor: 'transparent',
                }}>
                <View
                  style={{...styles.header, backgroundColor: 'transparent'}}>
                  <View style={{...styles.postImage}} />
                  <View
                    style={{
                      ...styles.postName,
                      width: wp('40'),
                      height: hp('4'),
                      borderRadius: wp('15'),
                      marginTop: hp('2'),
                      marginLeft: wp('2'),
                    }}
                  />
                </View>
                <View
                  style={{
                    ...styles.description,
                    marginTop: hp('1'),
                    marginLeft: hp('2'),
                    height: hp('2'),
                    borderRadius: wp('15'),
                    width: wp('90'),
                  }}
                />
                <View
                  style={{
                    ...styles.description,
                    marginBottom: hp('2'),
                    marginLeft: hp('2'),
                    height: hp('2'),
                    borderRadius: wp('15'),
                    width: wp('80'),
                    marginTop: hp('1'),
                  }}
                />
                <View
                  style={{
                    width: wp('100'),
                    height: hp('40'),
                  }}
                />
              </View>
              <View
                style={{
                  ...styles.mainContainer,
                  backgroundColor: 'transparent',
                }}>
                <View
                  style={{...styles.header, backgroundColor: 'transparent'}}>
                  <View style={{...styles.postImage}} />
                  <View
                    style={{
                      ...styles.postName,
                      width: wp('40'),
                      height: hp('4'),
                      borderRadius: wp('15'),
                      marginTop: hp('2'),
                      marginLeft: wp('2'),
                    }}
                  />
                </View>
                <View
                  style={{
                    ...styles.description,
                    marginTop: hp('1'),
                    marginLeft: hp('2'),
                    height: hp('2'),
                    borderRadius: wp('15'),
                    width: wp('90'),
                  }}
                />
                <View
                  style={{
                    ...styles.description,
                    marginBottom: hp('2'),
                    marginLeft: hp('2'),
                    height: hp('2'),
                    borderRadius: wp('15'),
                    width: wp('80'),
                    marginTop: hp('1'),
                  }}
                />
                <View
                  style={{
                    width: wp('100'),
                    height: hp('40'),
                  }}
                />
              </View>
            </ScrollView>
          </SkeletonPlaceholder>
        ) : data?.length == 0 ? (
          <View
            style={{
              backgroundColor: colors.postDivider,
              height: hp('80'),
              alignItems: 'center',
              paddingTop: hp('10'),
            }}>
            <View
              style={{
                alignItems: 'center',
                width: wp('80'),
                backgroundColor: colors.defaultBgColor,
                height: hp('30'),
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <AntDesign color={'gray'} size={wp('18')} name="warning" />
              <Text
                style={{
                  fontSize: hp('2.3'),
                  color: 'gray',
                  marginTop: hp('2'),
                }}>
                You nothing to have currently to view
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={props?.timeLineData}
            extraData={props?.timeLineData}
            keyExtractor={item => item._id}
            nestedScrollEnabled={true}
            scrollEnabled={false}
            inverted={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: hp('1'),
            }}
            renderItem={({item, index}) => {
              // for (let index = 0; index < item?.image?.length; index++) {
              //   const obj = IMAGE_BASED_URL + item?.image[index];
              //   dummy = obj;
              // }
              return item.hidePost && item.hidePost.includes(userData._id)
                ? hidePostContainer(item)
                : flatListData(item, index);
            }}
          />
        )}
      </View>
    </MenuContext>
  );
};

// {item.image.length > 0 && (
//   <View style={{flexDirection: 'row'}}>
//     {item.image.map(res => {
//       return (
//         <View
//           style={{
//             flexDirection: 'row',
//             backgroundColor: 'green',
//             flexWrap: 'wrap',
//           }}>
//           {item.image.length == 1 ? (
//             <>
//               <Image
//                 source={{uri: IMAGE_BASED_URL + res}}
//                 style={{
//                   width: wp('100'),
//                   height: hp('40'),
//                   backgroundColor: 'red',
//                 }}
//               />
//             </>
//           ) : item.image.length == 2 ? (
//             <View>
//               <Image
//                 source={{uri: IMAGE_BASED_URL + res}}
//                 style={{
//                   width: wp('50'),
//                   height: hp('40'),
//                   backgroundColor: 'yellow',
//                   flexDirection: 'row',
//                 }}
//               />
//             </View>
//           ) : item.image.length == 3 ? (
//             <Text></Text>
//           ) : (
//             <Text></Text>
//           )}
//         </View>
//       );
//     })}
//   </View>
// )}

// <View
//                   style={{
//                     width: wp('100'),
//                     // height: hp('35'),
//                     flexWrap: 'wrap',
//                     backgroundColor: '#E5E5E5',
//                     flexDirection: 'row',
//                   }}>
//                   {item?.image?.map(res => {
//                     return (
//                       <Image
//                         source={{uri: IMAGE_BASED_URL + res}}
//                         style={{
//                           width: wp('30'),
//                           height: hp('30'),
//                           resizeMode: 'contain',
//                           // backgroundColor: 'blue',
//                           marginLeft: wp('2'),
//                         }}
//                       />
//                     );
//                   })}
//                 </View>
