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
import Entypo from 'react-native-vector-icons/Entypo';
import {
  MenuProvider,
  MenuContext,
  MenuTrigger,
  MenuOption,
} from 'react-native-popup-menu';

export default function NotificationScreen() {
  const [notificationNumber, setNotificationNumber] = useState([
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
    {
      id: 5,
    },
  ]);
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: hp('5')}}
      showsVerticalScrollIndicator={false}>
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleConatiner}>
            <Text style={styles.headerTitle}>Notifications</Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.sideicon}>
              <Ionicons name="search" size={26} color={'#1A1A1A'} />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{color: 'black', fontSize: hp('3'), marginLeft: wp('2.5')}}>
          New
        </Text>
      </View>
      <View>
        {notificationNumber.map(res => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingTop: hp('3'),
                backgroundColor: '#e7f3ff',
              }}>
              <View
                style={{
                  width: wp('30'),
                }}>
                <Image
                  source={{
                    uri: 'https://www.wallpapertip.com/wmimgs/3-36120_person-holding-dslr-camera-blur-blurred-background-blur.jpg',
                  }}
                  style={{
                    borderRadius: Math.round(
                      Dimensions.get('window').width +
                        Dimensions.get('window').height,
                    ),
                    width: Dimensions.get('screen').width * 0.25,
                    height: Dimensions.get('screen').width * 0.25,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View style={{width: wp('60')}}>
                <Text
                  numberOfLines={3}
                  style={{fontSize: hp('2.5'), color: 'black', lineHeight: 22}}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
                <Text style={{color: 'gray', fontSize: hp('2.2')}}>
                  3 hours ago
                </Text>
              </View>
              <MenuContext
                disableTouchable={false}
                onSelect={() => alert('bdf')}>
                <TouchableOpacity style={{marginTop: hp('2')}}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={20}
                    color={'black'}
                  />
                </TouchableOpacity>
              </MenuContext>
              {/* <MenuTrigger text="asdasdasd" /> */}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
