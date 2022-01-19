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

export default function ProfileScreen() {
  const [activeSessionHelp, setActiveSessionHelp] = useState([]);
  const [activeSessiontSetting, setActiveSessiontSetting] = useState([]);
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
      iconName: 'report-problem',
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
      title: 'Setting',
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
      const use = await getUserData();
      setUser(use);
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
            color={'black'}
          />
        </View>
      </View>
    );
  };
  const renderContentHelp = item => {
    return helpFunctiontag.map(res => {
      return (
        <TouchableOpacity style={styles.AccordionContentContainer}>
          <FontAwesome5 name={res?.iconName} size={26} />
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
            color={'black'}
          />
        </View>
      </View>
    );
  };
  const renderContentSetting = item => {
    return settingFunctiontag.map(res => {
      return (
        <TouchableOpacity style={styles.AccordionContentContainer}>
          <Ionicons name={res?.iconName} size={26} />
          {/* <MaterialIcons name={res?.iconName} size={26} /> */}
          <Text style={styles.AccordionContentTitle}>{res?.title}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: hp('5'),
      }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={{color: 'black', fontSize: hp('4')}}>Menu</Text>
          {/* <TouchableOpacity>
            <Ionicons name="search" size={hp('5')} color={'black'} />
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity style={{flexDirection: 'row', marginBottom: hp('2')}}>
          <Image
            source={require('../../Images/removeimage.png')}
            style={styles.imageContainer}
          />
          <View style={{marginLeft: wp('5')}}>
            <Text style={styles.userName}>{user?.username}</Text>
            <Text style={styles.extraText}>See Your Profile</Text>
          </View>
        </TouchableOpacity>
        <Divider style={{borderColor: 'gray', borderWidth: 0.3}} />
        <ProfileScreenCategoryData />
        <Divider style={{borderWidth: 0.3}} />
        <Accordion
          activeSections={activeSessionHelp}
          sections={helpSupport}
          underlayColor="transparent"
          renderHeader={e => renderHeaderHelp(e)}
          renderContent={e => renderContentHelp(e)}
          onChange={e => updateSectionsHelp(e)}
        />
        <Accordion
          activeSections={activeSessiontSetting}
          sections={setting}
          underlayColor="transparent"
          renderHeader={e => renderHeadersetting(e)}
          renderContent={e => renderContentSetting(e)}
          onChange={e => updateSectionssetting(e)}
        />
        <TouchableOpacity
          onPress={() =>
            setTimeout(() => {
              actions.logout();
            }, 10)
          }
          style={styles.logoutButton}>
          <Text style={{color: 'black', fontSize: hp('2.5')}}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
