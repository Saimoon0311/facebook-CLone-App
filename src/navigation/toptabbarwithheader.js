import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import TopBarNavigation from './topBarNavigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function TopbartabBarHeader() {
  return (
    <>
      <View style={styles.maincontainer}>
        <View style={{width: wp('70')}}>
          <Image
            source={require('../Images/splashImage.png')}
            style={{
              width: wp('40'),
              height: hp('10'),
            }}
          />
        </View>
        <TouchableOpacity style={styles.sideicon}>
          <Ionicons name="search" size={26} color={'#1A1A1A'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideicon}>
          <Ionicons name="md-chatbubble-ellipses" size={26} color={'#1A1A1A'} />
        </TouchableOpacity>
      </View>
      <TopBarNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  sideicon: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.11,
    height: Dimensions.get('screen').width * 0.11,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    //     marginRight: wp('1'),
    marginLeft: wp('3'),
  },
  maincontainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: wp('100'),
  },
});
