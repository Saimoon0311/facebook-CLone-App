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
      title: 'New Vedios',
    },
    {
      id: 2,
      // topIcon: 'clock-outline',
      notificationNumber: 2,
      topIcon: 'account-search',
      title: 'Find friends',
    },
    {
      id: 3,
      // notificationNumber: 2,
      topIcon: 'home',
      title: 'Marketplace',
    },
    {
      id: 4,
      topIcon: 'video',
      title: 'Vedios on Watch',
    },
    {
      id: 5,
      topIcon: 'flag-variant',
      title: 'Pages',
      notificationNumber: 2,
    },
    {
      id: 6,
      topIcon: 'calendar-star',
      title: 'Events',
    },
    {
      id: 7,
      title: 'Jobs',
      topIcon: 'basket',
    },
    {
      id: 8,
      topIcon: 'clock-time-four-outline',
      title: 'Memories',
      notificationNumber: 1,
    },
    {
      id: 9,
      title: 'COVID-19',
      topIcon: 'heart-pulse',
      bottomText: 'Information Center',
    },
    {
      id: 10,
      topIcon: 'account-group-outline',
      title: 'Groups',
    },
    {
      id: 11,
      topIcon: 'gamepad-variant-outline',
      title: 'Gaming',
    },
  ]);
  // const column1Data = catergoryData.filter((item, i) => i % 2 === 0);
  // const column2Data = catergoryData.filter((item, i) => i % 2 === 1);
  const groupData = (items, groupLen) => {
    const groups = [];
    let i = 0;

    while (i < items.length) {
      groups.push(items.slice(i, (i += groupLen)));
    }

    return groups;
  };
  const groupedItems = groupData(catergoryData, 5);
  console.log(79, groupedItems);
  return (
    <View style={{flexDirection: 'column'}}>
      <FlatList
        // data={column1Data}
        data={groupedItems}
        keyExtractor={item => item.key}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        contentContainerStyle={{
          paddingBottom: hp('5'),
          width: wp('100%'),
          alignSelf: 'flex-start',
          flexDirection: 'row',
          // flexWrap: 'wrap',
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View>
              {item.map(res => {
                return (
                  <TouchableOpacity
                    style={{
                      ...styles.box,
                      marginLeft: wp('1.2'),
                      // flex: 0.1,
                    }}>
                    {res.requires ? (
                      <Image
                        source={{uri: res.requires}}
                        style={{
                          width: wp('45'),
                          height: hp('17'),
                          borderTopLeftRadius: hp('2'),
                          borderTopRightRadius: hp('2'),
                        }}
                      />
                    ) : null}
                    {res.topIcon ? (
                      <MaterialCommunityIcons
                        name={res.topIcon}
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
                      {res.title}
                    </Text>
                    {res.notificationNumber ? (
                      <View
                        style={{flexDirection: 'row', marginBottom: hp('2')}}>
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
                          {res.notificationNumber} new{' '}
                        </Text>
                      </View>
                    ) : null}
                    {res.bottomText ? (
                      <Text
                        numberOfLines={1}
                        style={{
                          marginLeft: wp('3'),
                          color: 'black',
                          fontSize: hp('2.5'),
                          marginBottom: hp('1.5'),
                          marginTop: hp('-2'),
                        }}>
                        {res.bottomText}
                      </Text>
                    ) : null}
                    {res.ImageIcon ? (
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
                          name={res.ImageIcon}
                          size={20}
                          color={'#760C72'}
                        />
                      </TouchableOpacity>
                    ) : null}
                    {res.faceIconView ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: hp('-1'),
                          marginBottom: hp('2'),
                        }}>
                        <MaterialIcons
                          name={res.faceIconView}
                          size={30}
                          color={'#B6BF00'}
                          style={{marginLeft: wp('2')}}
                        />
                        <Text
                          numberOfLines={1}
                          style={{color: 'gray', fontSize: hp('2.3')}}>
                          {res.faceIconText}
                        </Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
      />
    </View>
  );
};
