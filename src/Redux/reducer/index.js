import {applyMiddleware, combineReducers, createStore} from 'redux';
import types from '../type';
import auth from './auth';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import savedata from './savedata';
import themeChange from './themeColor';
import deviceToken from './deviceToken';

const persistConfig1 = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: 'userData',
};

const persistConfig2 = {
  key: 'saveData',
  storage: AsyncStorage,
  whiteList: ['savePosts'],
};

const persistConfig3 = {
  key: 'deviceToken',
  storage: AsyncStorage,
  whiteList: 'deviceToken',
};
// const persistConfig3 = {
//   key: 'themeChange',
//   storage: AsyncStorage,
//   blacklist: 'themeType',
// };

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig1, auth),
  savePosts: persistReducer(persistConfig2, savedata),
  deviceToken: persistReducer(persistConfig3, deviceToken),
  themeChange,
});

// const rootReducer = (state, action) => {
//   if (action.type == types.CLEAR_REDUX_STATE) {
//     state = undefined;
//   }
//   return appReducer(state, action);
// };
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
