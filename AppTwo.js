import React, {useEffect, Component, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  LogBox,
  ImageBackground,
  Appearance,
  StatusBar,
} from 'react-native';
import Navigation from './src/navigation/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FlashMessage from 'react-native-flash-message';
import {Provider, useDispatch} from 'react-redux';
import {getUserData} from './src/utils/utils';
import {saveUserData} from './src/Redux/action/auth';
import NetInfo from '@react-native-community/netinfo';
import {ModalPortal} from 'react-native-modals';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/Redux/reducer';
import PushNotification from 'react-native-push-notification';
import types from './src/Redux/type';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
// Must be outside of any component LifeCycle (such as `componentDidMount`).

function AppTwo({navigation}) {
  const [isVisible, setIsVisible] = useState(true);
  const [colorTheme, setColorTheme] = useState(Appearance.getColorScheme);
  const [dummy, setDummy] = useState(1);
  const dispatch = useDispatch();
  Hide_Splash_Screen = () => {
    setIsVisible(false);
  };
  const time = () => {
    if (Platform?.OS == 'android') {
      return 5000;
    } else {
      return 5000;
    }
  };

  // PushNotification.configure({
  //   onRegister: function (token) {
  //     dispatch({
  //       type: types.getToken,
  //       payload: token,
  //     });
  //   },
  //   onNotification: function (notification) {
  //     console.log('NOTIFICATION:', notification);
  //   },
  //   onAction: function (notification) {
  //     console.log('ACTION:', notification.action);
  //     console.log('NOTIFICATION:', notification);
  //   },
  //   onRegistrationError: function (err) {
  //     console.error(err.message, err);
  //   },
  //   popInitialNotification: true,
  //   requestPermissions: Platform.OS === 'ios',
  // });

  const setToken = () => {
    messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(token => {
        dispatch({
          type: types.getToken,
          payload: token,
        });
        // console.log('token', token);
      });
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreAllLogs(true);
    setToken();
    Appearance.addChangeListener(scheme => {
      dispatch({
        type: 'CheckThemeColor',
        payload: scheme.colorScheme,
      });
      setDummy(dummy + 1);
    });
    setTimeout(function () {
      Hide_Splash_Screen();
    }, time());
  }, []);

  {
    let Splash_Screen = (
      <ImageBackground
        source={require('./src/Images/ip.png')}
        // source={require('./src/Images/screen2.png')}
        style={styles.SplashScreen_RootView}>
        {/* <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require('./src/Images/XDsplashScreen.png')}
            style={{
              width: 150,
              height: '100%',
              resizeMode: 'contain',
              marginTop: 20,
            }}
          />
        </View> */}
      </ImageBackground>
    );
    return (
      <>
        <StatusBar hidden={true} />
        {isVisible === true ? (
          Splash_Screen
        ) : (
          <>
            <Navigation />
          </>
        )}
        <ModalPortal />
        <FlashMessage position="top" />
      </>
    );
  }
}

export default AppTwo;
