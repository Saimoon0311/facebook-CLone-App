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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ProfileScreenCategoryData = () => {
  const [catergoryData, setCatergoryData] = useState([
    {
      id: 1,
      requires:
        'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
      extraIcon: 'tag-faces',
      extraText: 'hyhhg hfud',
      ImageIcon: 'tag',
      faceIconView: 'tag-faces',
      faceIconText: 'kdvkddfsdf',
    },
    {
      id: 2,
      topIcon: 'clock-outline',
    },
    {
      id: 3,
      notificationNumber: 2,
      topIcon: 'account-search',
    },
    {
      id: 4,
      topIcon: 'heart-multiple-outline',
      bottomText: 'Information Center',
    },
    {
      id: 5,
    },
  ]);
  return (
    <View>
      <FlatList
        data={catergoryData}
        keyExtractor={item => item.key}
        nestedScrollEnabled={true}
        // numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={{
          paddingBottom: hp('10'),
          width: wp('100%'),
          alignSelf: 'flex-start',
          flexDirection: 'row',
          flexWrap: 'wrap',
          // backgroundColor: 'red',
        }}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={({item}) => {
        //   return (
        //     <View
        //       style={{
        //         ...styles.box,
        //         marginLeft: wp('1.2'),
        //       }}>
        //       <Image
        //         source={{
        //           uri: 'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
        //         }}
        //         style={{
        //           width: wp('45'),
        //           height: hp('17'),
        //           // backgroundColor: 'red',
        //           borderTopLeftRadius: hp('2'),
        //           borderTopRightRadius: hp('2'),
        //         }}
        //       />
        //       <Text
        //         style={{
        //           marginLeft: wp('3'),
        //           fontSize: hp('2.5'),
        //           color: 'black',
        //           fontWeight: 'bold',
        //           marginTop: hp('2.5'),
        //         }}>
        //         New Video
        //       </Text>
        //       <TouchableOpacity
        //         style={{
        //           position: 'absolute',
        //           borderRadius: Math.round(
        //             Dimensions.get('window').width +
        //               Dimensions.get('window').height,
        //           ),
        //           width: Dimensions.get('window').width * 0.1,
        //           height: Dimensions.get('window').width * 0.1,
        //           backgroundColor: 'white',
        //           justifyContent: 'center',
        //           alignItems: 'center',
        //           left: wp('4'),
        //           overflow: 'hidden',
        //           top: hp('13.5'),
        //           shadowColor: '#000',
        //           // width:354,
        //           shadowOffset: {width: 1, height: 3},
        //           shadowOpacity: 0.4,
        //           shadowRadius: 5,
        //           elevation: 5,
        //         }}>
        //         <MaterialIcons
        //           name={item?.ImageIcon}
        //           size={20}
        //           color={'#760C72'}
        //         />
        //       </TouchableOpacity>
        //       <View
        //         style={{
        //           flexDirection: 'row',
        //           alignItems: 'center',
        //           marginTop: hp('1'),
        //           marginBottom: hp('2'),
        //         }}>
        //         <MaterialIcons
        //           name="tag-faces"
        //           size={30}
        //           color={'#B6BF00'}
        //           style={{marginLeft: wp('2')}}
        //         />
        //         <Text
        //           numberOfLines={1}
        //           style={{color: 'gray', fontSize: hp('2.3')}}>
        //           hyhhg hfud
        //         </Text>
        //       </View>
        //     </View>
        //   );
        // }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                ...styles.box,
                marginLeft: wp('1.2'),
              }}>
              {item.requires ? (
                <Image
                  source={{uri: item.requires}}
                  style={{
                    width: wp('45'),
                    height: hp('17'),
                    borderTopLeftRadius: hp('2'),
                    borderTopRightRadius: hp('2'),
                  }}
                />
              ) : null}
              {item.topIcon ? (
                <MaterialCommunityIcons
                  name={item.topIcon}
                  style={{marginTop: hp('3'), marginLeft: wp('2.5')}}
                  size={25}
                  color={'blue'}
                />
              ) : null}
              <Text
                style={{
                  marginLeft: wp('3'),
                  fontSize: hp('2.5'),
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: hp('1.5'),
                  marginBottom: hp('1.5'),
                }}>
                New Video
              </Text>
              {item.notificationNumber ? (
                <View style={{flexDirection: 'row', marginBottom: hp('2')}}>
                  <View
                    style={{
                      borderRadius: Math.round(
                        Dimensions.get('window').width +
                          Dimensions.get('window').height,
                      ),
                      width: Dimensions.get('window').width * 0.03,
                      height: Dimensions.get('window').width * 0.03,
                      backgroundColor: 'red',
                      marginLeft: wp('3'),
                      marginRight: wp('2'),
                    }}
                  />
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: hp('2.2'),
                      marginTop: hp('-0.6'),
                    }}>
                    {item.notificationNumber} new{' '}
                  </Text>
                </View>
              ) : null}
              {item.bottomText ? (
                <Text
                  numberOfLines={1}
                  style={{
                    marginLeft: wp('3'),
                    color: 'black',
                    fontSize: hp('2.5'),
                    marginBottom: hp('1.5'),
                    marginTop: hp('-2'),
                  }}>
                  {item.bottomText}
                </Text>
              ) : null}
              {item.ImageIcon ? (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    borderRadius: Math.round(
                      Dimensions.get('window').width +
                        Dimensions.get('window').height,
                    ),
                    width: Dimensions.get('window').width * 0.1,
                    height: Dimensions.get('window').width * 0.1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: wp('4'),
                    overflow: 'hidden',
                    top: hp('13.5'),
                    shadowColor: '#000',
                    // width:354,
                    shadowOffset: {width: 1, height: 3},
                    shadowOpacity: 0.4,
                    shadowRadius: 5,
                    elevation: 5,
                  }}>
                  <MaterialIcons
                    name={item.ImageIcon}
                    size={20}
                    color={'#760C72'}
                  />
                </TouchableOpacity>
              ) : null}
              {item.faceIconView ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: hp('-1'),
                    marginBottom: hp('2'),
                  }}>
                  <MaterialIcons
                    name={item.faceIconView}
                    size={30}
                    color={'#B6BF00'}
                    style={{marginLeft: wp('2')}}
                  />
                  <Text
                    numberOfLines={1}
                    style={{color: 'gray', fontSize: hp('2.3')}}>
                    {item.faceIconText}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
