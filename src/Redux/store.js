import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {configureStore} from '@reduxjs/toolkit';
import auth from './reducer/auth';
import savedata from './reducer/savedata';

export const store = configureStore({
  reducer: {
    auth: auth,
    savedata: savedata,
  },
});
