// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

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
// import store from './src/Redux/store';
import {getUserData} from './src/utils/utils';
import {saveUserData} from './src/Redux/action/auth';
import NetInfo from '@react-native-community/netinfo';
import {ModalPortal} from 'react-native-modals';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/Redux/reducer';

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

// export const pp = theme => {
//   return theme;
// };

function AppTwo({navigation}) {
  const [isVisible, setIsVisible] = useState(true);
  const [colorTheme, setColorTheme] = useState(Appearance.getColorScheme);
  const [dummy, setDummy] = useState(1);
  const dispatch = useDispatch();
  Hide_Splash_Screen = () => {
    setIsVisible(false);
  };
  // const changeTheme = () => {
  //   Appearance.addChangeListener(scheme => {
  //     setColorTheme(scheme.colorScheme);
  //   });
  //   pp(colorTheme);
  // };
  const time = () => {
    if (Platform?.OS == 'android') {
      return 2000;
    } else {
      return 0;
    }
  };

  const initializeStripe = () => {
    initStripe({
      publishableKey: StripePKey,
    });
  };

  useEffect(() => {
    // const dispatch = useDispatch();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreAllLogs(true);
    Appearance.addChangeListener(scheme => {
      // console.log(2020020200202, scheme.colorScheme);
      dispatch({
        type: 'CheckThemeColor',
        payload: scheme.colorScheme,
      });
      // changeTheme();
      setDummy(dummy + 1);
    });
    setTimeout(function () {
      Hide_Splash_Screen();
    }, time());
  }, []);

  {
    let Splash_Screen = (
      <ImageBackground
        source={require('./src/Images/XDsplashScreen.png')}
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
          Platform?.OS == 'android' && Splash_Screen
        ) : (
          <>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </>
        )}
        <ModalPortal />
        <FlashMessage position="top" />
      </>
    );
  }
}

export default AppTwo;
