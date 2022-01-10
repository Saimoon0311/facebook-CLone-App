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
import {Button, useToast, Center, NativeBaseProvider} from 'native-base';
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

export default function ProfileScreen() {
  const [activeSession, setActiveSession] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]);
  const [orderData, setOrderData] = useState([]);
  const updateSections = e => {
    setActiveSession(e);
  };
  const renderHeader = item => {
    return (
      <View
        style={{backgroundColor: 'red', height: hp('10'), width: wp('100')}}>
        <Text>renderHeader</Text>
      </View>
    );
  };
  const renderContent = item => {
    return (
      <View
        style={{backgroundColor: 'yellow', height: hp('10'), width: wp('100')}}>
        <Text>renderContent</Text>
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={{color: 'black', fontSize: hp('4')}}>Menu</Text>
          <TouchableOpacity>
            <Ionicons name="search" size={hp('5')} color={'black'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', marginBottom: hp('2')}}>
          <Image
            source={require('../../Images/removeimage.png')}
            style={styles.imageContainer}
          />
          <View style={{marginLeft: wp('5')}}>
            <Text style={styles.userName}>Muhammad Saimoon</Text>
            <Text style={styles.extraText}>See Your Profile</Text>
          </View>
        </TouchableOpacity>
        <Divider style={{borderColor: 'gray', borderWidth: 0.3}} />
        <ProfileScreenCategoryData />
        <View style={{backgroundColor: 'blue'}}>
          <Accordion
            activeSections={activeSession}
            sections={orderData}
            underlayColor="transparent"
            renderHeader={e => renderHeader(e)}
            renderContent={e => renderContent(e)}
            onChange={e => updateSections(e)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
