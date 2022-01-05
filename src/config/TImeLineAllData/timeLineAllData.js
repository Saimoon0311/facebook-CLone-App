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
import {IMAGE_BASED_URL, TimeLineUrl} from '../../config/url';
import {getUserData} from '../../utils/utils';
import ImagePicker from '../../Reuseable Component/ImagePicker/imagePicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SharePostMoadl} from '../../Reuseable Component/SharePostModal/sharePostModal';
import {Button, useToast, Center, NativeBaseProvider} from 'native-base';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import PhotoGrid from 'react-native-thumbnail-grid';

export const TimeLineData = props => {
  const [imageArray, setImageArray] = useState([]);
  const [dummyImages, setDummyImages] = useState([]);
  var dummy;
  // setDummyImages(props?.timeLineData?.image);
  // const v = props?.timeLineData;
  // console.log(389, v);
  // for (let index = 0; index < v.length; index++) {
  //   // const element = item?.image[index];
  //   const obj = IMAGE_BASED_URL + v[index];
  //   imageArray.push(obj);
  // }

  // console.log(45, props?.timeLineData);
  // props?.timeLineData.map(res => {
  //   console.log(47, res);
  //   for (let index = 0; index < res.image.length; index++) {
  //     // const element = item?.image[index];
  //     dummy = res?.image;
  //     const obj = IMAGE_BASED_URL + dummy[index];
  //     imageArray.push(obj);
  //     console.log(52, obj);
  //   }
  // });

  // console.log(54, imageArray);
  // console.log(58, imageArray.length);
  // console.log(images);
  // console.log(props?.timeLineData?.image);
  // for (let i = 0; i >= props?.image.length; i++) {
  //   // const element = array[i];
  //   console.log(38, i);
  // }
  return (
    <View>
      {props?.isloading ? (
        // <SkeletonPlaceholder>

        // </SkeletonPlaceholder>
        <ActivityIndicator size={'large'} color="red" />
      ) : (
        <FlatList
          data={props?.timeLineData}
          keyExtractor={item => item.key}
          // horizontal
          showsVerticalScrollIndicator={false}
          // showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            for (let index = 0; index < item?.image?.length; index++) {
              const obj = IMAGE_BASED_URL + item?.image[index];
              dummy = obj;
              // console.log(84, dummy);
              dummyImages?.push(obj);
              // setDummyImages(obj);
            }
            // console.log(85, dummy);
            console.log(88, dummyImages);
            return (
              <View
                style={{
                  width: wp('100'),
                  // height: hp('50'),
                  backgroundColor: 'white',
                  marginTop: hp('2'),
                  marginBottom: hp('2'),
                }}>
                <TouchableOpacity>
                  <View
                    style={{
                      // backgroundColor: 'yellow',
                      flexDirection: 'row',
                      paddingTop: hp('0.5'),
                      paddingBottom: hp('0.5'),
                    }}>
                    {item.profilePicture ? (
                      <Image
                        source={{uri: IMAGE_BASED_URL + item.profilePicture}}
                        style={{
                          borderRadius: Math.round(
                            Dimensions.get('window').width +
                              Dimensions.get('window').height,
                          ),
                          // alignSelf: 'center',
                          width: Dimensions.get('screen').width * 0.13,
                          height: Dimensions.get('screen').width * 0.13,
                          backgroundColor: 'white',
                          // marginTop: hp('2'),
                          marginLeft: hp('2'),
                        }}
                      />
                    ) : (
                      <EvilIcons name={'user'} size={60} />
                    )}
                    <Text
                      style={{
                        // marginTop: hp('1'),
                        textAlignVertical: 'center',
                        color: 'black',
                        fontSize: hp('3'),
                      }}>
                      {item?.postName}
                    </Text>
                  </View>
                </TouchableOpacity>
                {item.image.length > 0 && (
                  <View style={{flexDirection: 'row'}}>
                    {item.image.map(res => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: 'green',
                            flexWrap: 'wrap',
                          }}>
                          {item.image.length == 1 ? (
                            <>
                              <Image
                                source={{uri: IMAGE_BASED_URL + res}}
                                style={{
                                  width: wp('100'),
                                  height: hp('40'),
                                  backgroundColor: 'red',
                                }}
                              />
                            </>
                          ) : item.image.length == 2 ? (
                            <View>
                              <Image
                                source={{uri: IMAGE_BASED_URL + res}}
                                style={{
                                  width: wp('50'),
                                  height: hp('40'),
                                  backgroundColor: 'yellow',
                                  flexDirection: 'row',
                                }}
                              />
                            </View>
                          ) : item.image.length == 3 ? (
                            <Text></Text>
                          ) : (
                            <Text></Text>
                          )}
                        </View>
                      );
                    })}
                  </View>
                )}

                {/* <PhotoGrid source={dummyImages} /> */}
              </View>
            );
          }}
        />
      )}
    </View>
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
