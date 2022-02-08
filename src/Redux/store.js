import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {configureStore} from '@reduxjs/toolkit';
import auth from './reducer/auth';
import savedata from './reducer/savedata';
import themeChange from './reducer/themeColor';

export const store = configureStore({
  reducer: {
    auth: auth,
    savedata: savedata,
    themeChange: themeChange,
  },
});
