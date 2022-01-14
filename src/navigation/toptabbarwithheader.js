import React, {useState} from 'react';
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
} from 'react-native';
import TopBarNavigation from './topBarNavigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {Value, timing} = Animated;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export function TopbartabBarHeader() {
  const [keyBoard, setKeyBoard] = useState('');
  const [isFouced, setIsFouced] = useState(false);
  var _input_box_translate_x = new Value(width);
  var back_button_opacity = new Value(0);
  var content_translate_y = new Value(height);
  var content_opacity = new Value(0);
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
        <Animated.View
          style={[
            styles.inputBox,
            {transform: [{translateX: _input_box_translate_x}]},
          ]}>
          <Animated.View style={{opacity: back_button_opacity}}>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={'#ccd0d5'}
              onPress={() => onBlur()}
              style={styles.backIconBox}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={22}
                color={'#000000'}
              />
            </TouchableHighlight>
          </Animated.View>
          <TextInput
            // ref={'input'}
            placeholder="Seacrh"
            clearButtonMode="always"
            value={keyBoard}
            onChangeText={e => setKeyBoard(e)}
            style={styles.input}
          />
        </Animated.View>
        <TouchableOpacity style={styles.sideicon}>
          <Ionicons name="md-chatbubble-ellipses" size={26} color={'#1A1A1A'} />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: content_opacity,
            transform: [{translateY: content_translate_y}],
          },
        ]}>
        <SafeAreaView style={styles.contentSafeArea}>
          <View></View>
        </SafeAreaView>
      </Animated.View>
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
    backgroundColor: '#e4e6eb',
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
    backgroundColor: 'white',
  },
});
