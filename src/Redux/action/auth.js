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

// export function login (data){
//     return new Promise((resolve,reject)=>{
//         return apiPost(LOGIN,data)
//      .then((res)=>{
//          setUserData(res[0].message).then(()=>{
// resolve(res)
// saveUserData(res)
//          })
//      })
//     })
// }

// export function signup (data){
//     return apiPost(SIGNUP,data)
// }

export function login(data) {
  return new Promise((resolve, reject) => {
    return apiPost(LoginUrl, data)
      .then(res => {
        if (res.success == true) {
          data = res.data;
          console.log(37, data);
          setUserData(data).then(() => {
            resolve(res);
            saveUserData(data);
          });
          return;
        }

        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// export function login(data) {
//     return new Promise((resolve, reject) => {
//         return apiPost(LOGIN, data).then((res) => {
//                  data = res[0].user
//                 setUserData(data).then(() => {
//                     resolve(res)
//                     saveUserData(data)
//                 });
//             resolve(res)
//         }).catch((error) => {
//             reject(error)
//         })
//     })
// }

export function signup(data) {
  return apiPost(SignUpUrl, data);
}

export function logout() {
  dispatch({type: types.CLEAR_REDUX_STATE});
  clearUserData();
}

// data =res[0].user
// setUserData(data).then(() => {
//     resolve(res)
//     saveUserData(data)
// });
// return
