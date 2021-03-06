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
  Switch,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {Avatar, Divider} from 'react-native-paper';
import {ApiGet, ApiPut} from '../../config/helpeerFetch';
import {IMAGE_BASED_URL, LikeUrl, GetAllPostUrl} from '../../config/url';
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
  Radio,
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
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../Reuseable Component/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import UpdateProfileModal from '../../Reuseable Component/updateProfileModal/updateProfileModal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function ProfileScreen({navigation}) {
  const {userData} = useSelector(state => state.auth);
  const dipatch = useDispatch();
  const [activeSessionHelp, setActiveSessionHelp] = useState([]);
  const [activeSessiontSetting, setActiveSessiontSetting] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [themeType, setThemeType] = useState(null);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [helpFunctiontag, setHelpFunctiontag] = useState([
    {
      id: 1,
      title: 'Help Center',
      iconName: 'life-ring',
    },
    {
      id: 2,
      title: 'Support Inbox',
      iconName: 'inbox',
    },
    {
      iconName: 'warning',
      id: 3,
      title: 'Report a Problem',
    },
    {
      iconName: 'book',
      id: 4,
      title: 'Terms & Policies ',
    },
  ]);
  const [settingFunctiontag, setSettingFunctiontag] = useState([
    {
      id: 1,
      title: 'Update Your Profile',
      iconName: 'person-circle',
    },
    {
      id: 2,
      title: 'Privacy shortcuts',
      iconName: 'lock-closed',
    },
    {
      iconName: 'md-stopwatch-outline',
      id: 3,
      title: 'Your Time on Facebook',
    },
    {
      iconName: 'ios-phone-portrait-outline',
      id: 4,
      title: 'Device requests',
    },
    {
      iconName: 'md-images',
      id: 5,
      title: 'Recent and activity',
    },
    {
      iconName: 'wifi',
      id: 6,
      title: 'Find Wi-Fi',
    },
    {
      iconName: 'moon',
      id: 7,
      title: 'Dark mode',
    },
    {
      iconName: 'language',
      id: 8,
      title: 'language',
    },
    {
      iconName: 'key',
      id: 9,
      title: 'Code Generator',
    },
  ]);
  const [helpSupport, setHelpSupport] = useState([
    {
      id: 1,
    },
  ]);
  const [setting, setSetting] = useState([
    {
      id: 1,
    },
  ]);
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      setUser(userData);
    })();
  }, []);
  const updateSectionsHelp = e => {
    setActiveSessionHelp(e);
  };
  const renderHeaderHelp = item => {
    return (
      <View style={styles.AccordionHeaderContainer}>
        <View style={{width: wp('12')}}>
          <FontAwesome5 name="question-circle" color={'gray'} size={30} />
        </View>
        <View style={{width: wp('72')}}>
          <Text style={styles.AccordionHeaderTitle}>Help & Support</Text>
        </View>
        <View style={{width: wp('12')}}>
          <MaterialIcons
            name={'keyboard-arrow-down'}
            size={30}
            color={colors.defaultTextColor}
          />
        </View>
      </View>
    );
  };
  const renderContentHelp = item => {
    return helpFunctiontag.map(res => {
      return (
        <TouchableOpacity style={styles.AccordionContentContainer}>
          {res.iconName == 'warning' ? (
            <AntDesign name={res?.iconName} size={26} color={'gray'} />
          ) : (
            <FontAwesome5 name={res?.iconName} size={26} color={'gray'} />
          )}
          {/* <MaterialIcons name={res?.iconName} size={26} /> */}
          <Text style={styles.AccordionContentTitle}>{res?.title}</Text>
        </TouchableOpacity>
      );
    });
  };
  const updateSectionssetting = e => {
    setActiveSessiontSetting(e);
  };
  const renderHeadersetting = item => {
    return (
      <View style={styles.AccordionHeaderContainer}>
        <View style={{width: wp('12')}}>
          <Ionicons name="settings" color={'gray'} size={30} />
        </View>
        <View style={{width: wp('72')}}>
          <Text style={styles.AccordionHeaderTitle}>Setting & Privacy</Text>
        </View>
        <View style={{width: wp('12')}}>
          <MaterialIcons
            name={'keyboard-arrow-down'}
            size={30}
            color={colors.defaultTextColor}
          />
        </View>
      </View>
    );
  };
  const darkModeSwitch = data => {
    // console.log(201, data);
    if (data.title == 'Update Your Profile') {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };
  const renderContentSetting = item => {
    return settingFunctiontag.map(res => {
      return (
        <TouchableOpacity
          onPress={() => darkModeSwitch(res)}
          style={styles.AccordionContentContainer}>
          <Ionicons color={'gray'} name={res?.iconName} size={26} />
          {/* <MaterialIcons name={res?.iconName} size={26} /> */}
          <Text style={styles.AccordionContentTitle}>{res?.title}</Text>
        </TouchableOpacity>
      );
    });
  };
  return (
    <>
      {modalVisible ? (
        <UpdateProfileModal
          forHideModal={() => setModalVisible(false)}
          modalType={modalVisible}
        />
      ) : null}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS == 'ios' ? hp('10') : hp('5'),
          backgroundColor:
            colors.defaultBgColor == '#242527'
              ? colors.defaultBgColor
              : 'transparent',
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text style={{color: colors.defaultTextColor, fontSize: hp('4')}}>
              Menu
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('userScreen', {confirms: true})}
            style={{flexDirection: 'row', marginBottom: hp('2')}}>
            {userData.profilePicture ? (
              <Image
                source={{
                  uri: IMAGE_BASED_URL + userData.profilePicture,
                }}
                style={styles.imageContainer}
              />
            ) : (
              <EvilIcons
                name={'user'}
                size={55}
                color={colors.defaultTextColor}
              />
            )}
            <View style={{marginLeft: wp('2'), justifyContent: 'center'}}>
              <Text style={styles.userName}>{userData?.username}</Text>
              <Text style={styles.extraText}>See Your Profile</Text>
            </View>
          </TouchableOpacity>
          <Divider style={{borderColor: 'gray', borderWidth: 0.3}} />
          <ProfileScreenCategoryData />
          <Divider style={{borderWidth: 0.3}} />
          <Accordion
            activeSections={activeSessionHelp}
            sections={helpSupport}
            keyExtractor={(item, index) => `key-${index}`}
            underlayColor="transparent"
            renderHeader={e => renderHeaderHelp(e)}
            renderContent={e => renderContentHelp(e)}
            onChange={e => updateSectionsHelp(e)}
          />
          <Accordion
            activeSections={activeSessiontSetting}
            sections={setting}
            keyExtractor={(item, index) => `key-${index}`}
            underlayColor="transparent"
            renderHeader={e => renderHeadersetting(e)}
            renderContent={e => renderContentSetting(e)}
            onChange={e => updateSectionssetting(e)}
          />
          <TouchableOpacity
            onPress={() =>
              setTimeout(() => {
                actions.logout(dipatch);
              }, 10)
            }
            style={styles.logoutButton}>
            <Text style={{color: colors.defaultTextColor, fontSize: hp('2.5')}}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
