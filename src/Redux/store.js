import {configureStore} from '@reduxjs/toolkit';
import auth from './reducer/auth';
import savedata from './reducer/savedata';
import themeChange from './reducer/themeColor';
import deviceToken from './reducer/deviceToken';

export const store = configureStore({
  reducer: {
    auth: auth,
    savedata: savedata,
    themeChange: themeChange,
    deviceToken: deviceToken,
  },
});
