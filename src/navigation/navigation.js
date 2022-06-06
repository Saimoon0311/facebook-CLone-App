import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import mainstack from '../navigation/mainstack';
import {useSelector} from 'react-redux';
import topBarNavigation from './topBarNavigation';
import {Screens} from '../Screen';
import {TopbartabBarHeader} from './toptabbarwithheader';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const {userData} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('');

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:45678',
  //       remoteMessage,
  //     );
  //     setInitialRoute('showNotificationScreen'); // e.g. "Settings"
  //     navigation.navigate(initialRoute);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:45678',
  //           remoteMessage,
  //         );
  //         setInitialRoute('showNotificationScreen'); // e.g. "Settings"
  //         navigation.navigate(initialRoute);
  //       }
  //       setLoading(false);
  //     });
  // }, []);

  // console.log(14, userData);
  return (
    <Stack.Navigator
      // initialRouteName={initialRoute}
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
        animation: 'slide_from_bottom',
      }}>
      {/*  */}
      {!!userData && userData._id ? (
        <Stack.Screen
          name="TopbartabBarHeader"
          component={TopbartabBarHeader}
          // component={Screens.topBarNavigation}
        />
      ) : (
        <>
          <Stack.Screen
            options={{
              title: 'Sign In',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#FFDDC9',
              },
              headerTintColor: '#512500',

              headerTitleStyle: {
                fontSize: 18,
              },
            }}
            name="LoginScreen"
            component={Screens.LoginScreen}
          />
          <Stack.Screen
            options={{
              title: 'Sign In',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#FFDDC9',
              },
              headerTintColor: '#512500',

              headerTitleStyle: {
                fontSize: 18,
              },
            }}
            name="SignUpScreen"
            component={Screens.SignUpScreen}
          />
        </>
      )}
      <Stack.Screen name="userScreen" component={Screens.userScreen} />
      <Stack.Screen
        name="showNotificationScreen"
        component={Screens.showNotificationScreen}
      />
    </Stack.Navigator>
  );
}
