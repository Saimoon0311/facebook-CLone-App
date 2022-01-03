import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {Divider} from 'react-native-paper';
import {ApiGet} from '../../config/helpeerFetch';
import {IMAGE_BASED_URL, TimeLineUrl} from '../../config/url';
import {getUserData} from '../../utils/utils';
import ImagePicker from '../../Reuseable Component/ImagePicker/imagePicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SharePostMoadl} from '../../Reuseable Component/SharePostModal/sharePostModal';

export default function HomeScreen() {
  const [timeLineData, setTimeLineData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState();
  const getTimeLineData = async () => {
    // const user = await getUserData();
    // console.log(user);
    // const userId = user._id;
    // ApiGet(TimeLineUrl + userId).then(res => {
    // console.log(res);
    // if (res?.success == true) {
    //   console.log(res);
    // }
    // });
  };
  useEffect(() => {
    (async () => {
      const user = await getUserData();
      setUser(user);
      // console.log(user);
    })();
    // getTimeLineData();
  }, []);

  const pickImages = () => {
    launchCamera(
      {
        selectionLimit: 8,
        mediaType: 'mixed',
        quality: 0.3,
      },
      res => {
        if (!res?.didCancel) {
          console.log(50, res);
          setTimeLineData(res?.assets);
          // console.log(174, timeLineData);
          // this.stateManagement('imagesArray', res);
          // this.stateManagement('renderImagePreview', true);
        }
      },
    );
  };

  const openModal = () => {
    // return <SharePostMoadl />;
    return <Text>sjkfdjkasdfsbdabf</Text>;
    // setModalVisible(true);
  };

  const [state, setState] = useState(false);

  if (state) {
    return <SharePostMoadl forHideModal={() => setState(false)} />;
  }
  return (
    <ScrollView>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Image
              source={require('../../Images/removeimage.png')}
              style={styles.imageContainer}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerComponent}
            onPress={() => setState(true)}>
            <Text style={styles.headerText}>What's on your mind?</Text>
          </TouchableOpacity>
        </View>
        <Divider
          style={{borderColor: 'gray', borderWidth: 0.3, marginTop: hp('2')}}
        />
      </View>
      <TouchableOpacity onPress={() => pickImages()}>
        <Text>sdsfdfsdfsdf</Text>
      </TouchableOpacity>
      {timeLineData !== null &&
        timeLineData?.map(res => {
          return (
            <Image
              source={{uri: res?.uri}}
              style={{width: wp('20'), height: hp('20')}}
            />
          );
        })}
    </ScrollView>
  );
}
