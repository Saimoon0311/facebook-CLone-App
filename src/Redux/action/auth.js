import {apiPost, setUserData, clearUserData} from '../../utils/utils';
import {LoginUrl, SignUpUrl} from '../../config/url';
import store from '../store';
import types from '../type';
import {showMessage} from 'react-native-flash-message';
const {dispatch} = store;

export const saveUserData = data => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

export function login(data) {
  return new Promise((resolve, reject) => {
    return apiPost(LoginUrl, data)
      .then(res => {
        if (res.success == true) {
          data = res.data;
          setUserData(data).then(() => {
            resolve(res);
          });
          saveUserData(data);
          return;
        }

        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function signup(data) {
  return apiPost(SignUpUrl, data);
}

export function logout() {
  dispatch({type: types.CLEAR_REDUX_STATE});
  clearUserData();
}
