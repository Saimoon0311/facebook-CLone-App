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

{
  /* <Provider store={store}> */
}

AppRegistry.registerComponent(appName, () => App);
// </Provider>;
