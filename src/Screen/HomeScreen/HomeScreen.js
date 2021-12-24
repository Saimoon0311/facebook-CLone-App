import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageHomeScreen,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export default function HomeScreen() {
  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../Images/removeimage.png')}
            style={styles.imageContainer}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerComponent}>
          <Text style={styles.headerText}>What's on your mind?</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Ionicons name="images" size={30} />
        </TouchableOpacity> */}
      </View>
      <Text>sdsdsd</Text>
      <View
        style={{
          height: '80%',
          flex: 1,
          height: 1,
          backgroundColor: 'black',
          flexDirection: 'row',
        }}
      />
    </View>
  );
}
