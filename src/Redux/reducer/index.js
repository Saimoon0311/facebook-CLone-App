import {applyMiddleware, combineReducers, createStore} from 'redux';
import types from '../type';
import auth from './auth';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: 'userData',
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, auth),
});

// const rootReducer = (state, action) => {
//   if (action.type == types.CLEAR_REDUX_STATE) {
//     state = undefined;
//   }
//   return appReducer(state, action);
// };
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
