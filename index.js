/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
// import {Provider} from 'react-redux';
// import {persistor, store} from './src/Redux/reducer';
import App from './App';
import {name as appName} from './app.json';
import {persistor, store} from './src/Redux/reducer';
// import React from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import navigation from '@react-navigation/native';
import {Screens} from './src/Screen/index';
import messaging from '@react-native-firebase/messaging';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)

//   onRegister: function (token) {
//     // const fcmToken = await firebase.messaging().getToken();
//     // console.log('TOKEN:', token, fcmToken);
//     // if (notification.action === 'ReplyInput') {
//     //   console.log('texto', notification.reply_text); // this will contain the inline reply text.
//     // }
//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);

//     // process the notification

//     // (required) Called when a remote is received or opened, or local notification is opened
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//     // });
//     // navigation.navigate('showNotificationScreen', notification.data.customData);
//     // console.log(
//     //   'NOTIFICATION:2345678909876543234567890-09876543456789',
//     //   notification.data.customData,
//     // );

//     // process the notification

//     // (required) Called when a remote is received or opened, or local notification is opened
//     //  notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },
//   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//   onAction: function (notification) {
//     console.log('ACTION:', notification.action);
//     console.log('NOTIFICATION:', notification);

//     // process the action
//   },

//   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//   onRegistrationError: function (err) {
//     console.error(err.message, err);
//   },

//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    * - if you are not using remote notification or do not have Firebase installed, use this:
//    *     requestPermissions: Platform.OS === 'ios'
//    */
//   requestPermissions: true,
// });
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
messaging().onNotificationOpenedApp(remoteMessage => {
  console.log(
    'Notification caused app to open from background state:45678',
    remoteMessage,
  );
  // setInitialRoute('showNotificationScreen'); // e.g. "Settings"
});
messaging().setOpenSettingsForNotificationsHandler(async () => {
  // Set persistent value, using the MMKV package just as an example of how you might do it
  MMKV.setBool(openSettingsForNotifications, true);
});
AppRegistry.registerComponent(appName, () => App);
// </Provider>;
