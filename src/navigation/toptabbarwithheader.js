import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
  Easing,
  StatusBar,
  ImageBackground,
} from 'react-native';
import TopBarNavigation from './topBarNavigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'native-base';
import {Divider} from 'react-native-paper';
const {Value, timing} = Animated;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import * as Animatable from 'react-native-animatable';
import Entypo from 'react-native-vector-icons/Entypo';
import {ShowInputField} from '../Reuseable Component/ShowInputField/showInputField';
import {colors} from '../Reuseable Component/color';
import {color} from 'native-base/lib/typescript/theme/styled-system';

export function TopbartabBarHeader() {
  const [keyBoard, setKeyBoard] = useState('');
  const [isFouced, setIsFouced] = useState(false);
  const [fontSize, setFontSize] = useState();
  var _input_box_translate_x = new Value(width);
  var back_button_opacity = new Value(0);
  var content_translate_y = new Value(height);
  var content_opacity = new Value(0);
  const [seacrh, setSeacrh] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ]);

  const fade = {
    from: {
      opacity: 0.5,
      delay: 0,
    },
    to: {
      opacity: 1,
      delay: 5000,
    },
  };
  // const showInputField = () => {
  //   return (
  //     <Animatable.View
  //       animation={isFouced == true ? 'fadeInRightBig' : 'fadeOutRightBig'}
  //       style={styles.animatedView}>
  //       <View style={styles.insideView}>
  //         <TouchableOpacity
  //           onPress={() => setIsFouced(false)}
  //           style={{
  //             ...styles.sideicon,
  //             alignSelf: 'auto',
  //             marginTop: hp('0.5'),
  //             backgroundColor: 'white',
  //           }}>
  //           <Ionicons name="md-arrow-back-sharp" size={26} color={'#1A1A1A'} />
  //         </TouchableOpacity>
  //         <TextInput
  //           placeholder="Enter what you want to seacrh"
  //           placeholderTextColor={'gray'}
  //           style={styles.insideTextInput}
  //         />
  //       </View>
  //       <Divider style={styles.divider} />
  //       <View style={styles.recentView}>
  //         <Text style={styles.recentViewText}>Recent searches</Text>
  //         <TouchableOpacity>
  //           <Text style={{color: '#3C7EFA', fontSize: hp('2.5')}}>See all</Text>
  //         </TouchableOpacity>
  //       </View>
  //       {seacrh.map(res => {
  //         return (
  //           <View style={styles.recentSearchView}>
  //             <Image
  //               source={require('../Images/mountain.jpeg')}
  //               style={styles.recentSearchImage}
  //             />
  //             <Text numberOfLines={2} style={styles.recentViewTexts}>
  //               hshdlksd
  //             </Text>
  //             <TouchableOpacity style={{marginLeft: wp('5')}}>
  //               <Entypo name="cross" size={30} color={'gray'} />
  //             </TouchableOpacity>
  //           </View>
  //         );
  //       })}
  //     </Animatable.View>
  //   );
  // };
  return (
    <>
      <StatusBar
        backgroundColor={colors.defaultBgColor}
        barStyle={
          colors.defaultBgColor == 'white' ? 'dark-content' : 'light-content'
        }
      />
      <ShowInputField
        onPress={isFouced}
        hideInputField={() => setIsFouced(false)}
      />
      <ImageBackground
        resizeMode="cover"
        source={require('../Images/upperImage.png')}
        style={{width: wp('100'), height: hp('100')}}>
        <Animatable.View style={styles.maincontainer}>
          <View style={{width: wp('70')}}>
            <Text
              style={{
                fontSize: wp('10'),
                color: colors.mainHeaderTextColor,
                marginLeft: wp('3'),
                fontFamily: 'Poppins-SemiBold',
              }}>
              facebook
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsFouced(true)}
            style={styles.sideicon}>
            <Ionicons name="search" size={26} color={colors.roundIconsColor} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.sideicon}>
            <Ionicons
              name="md-chatbubble-ellipses"
              size={26}
              // color={colors.roundIconsColor}
              color="#1A1A1A"
            />
          </TouchableOpacity> */}
        </Animatable.View>
        <TopBarNavigation />
      </ImageBackground>
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
    backgroundColor: colors.roundIconsBgColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4'),
    marginLeft: 'auto',
  },
  maincontainer: {
    flexDirection: 'row',
    backgroundColor: colors.defaultBgColor,
    width: wp('100'),
  },
  inputBox: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    width: width - 32,
  },
  backIconBox: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: 'red',
    // backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  content: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
  contentSafeArea: {
    flex: 1,
    backgroundColor: colors.defaultBgColor,
  },
  contentInner: {
    flex: 1,
    paddingTop: 50,
  },
  separator: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#e6e4eb',
  },
  imagePlaceholderContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%',
    backgroundColor: 'green',
  },
  imagePlaceHolderText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
  },
  seacrhItem: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginLeft: 16,
  },
  itemIcon: {
    marginLeft: 15,
  },
  animatedView: {
    position: 'absolute',
    zIndex: 1,
    // backgroundColor: 'green',
    height: hp('100'),
    backgroundColor: 'white',
  },
  insideView: {
    width: wp('100'),
    // height: hp('100'),
    top: 0,
    justifyContent: 'space-around',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    // alignItems: 'center',
    // position: 'absolute',
    // zIndex: 1,
    paddingTop: hp('2'),
    // flex: 1,
  },
  insideTextInput: {
    width: wp('85'),
    backgroundColor: '#E7E7E7',
    borderRadius: 30,
    height: hp('6'),
    paddingLeft: wp('5'),
    marginRight: wp('2'),
    color: 'black',
    fontSize: hp('2.5'),
  },
  divider: {
    borderColor: 'gray',
    borderWidth: 0.3,
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  recentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('93'),
    alignSelf: 'center',
  },
  recentViewText: {
    fontSize: hp('3'),
    color: 'black',
    fontWeight: 'bold',
  },
  recentSearchView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: wp('93'),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hp('2'),
    // backgroundColor: 'green',
    // height: hp('10'),
  },
  recentSearchImage: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('screen').width * 0.13,
    height: Dimensions.get('screen').width * 0.13,
    backgroundColor: colors.defaultBgColor,
    marginRight: wp('2'),
  },
  recentViewTexts: {
    fontSize: hp('2.5'),
    color: 'black',
    fontWeight: 'bold',
    // backgroundColor: 'yellow',
    width: wp('65'),
  },
});
