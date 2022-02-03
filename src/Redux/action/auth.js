// import {apiPost, setUserData, clearUserData} from '../../utils/utils';
import {LoginUrl, SignUpUrl} from '../../config/url';
import store from '../store';
import types from '../type';
import {showMessage} from 'react-native-flash-message';
// import {useDispatch} from 'react-redux';
import {ApiPost} from '../../config/helpeerFetch';

// export const saveUserData = data => {
//   dispatch({
//     type: types.LOGIN,
//     payload: data,
//   });
// };

export function login({data, dispatch}) {
  console.log(17, data);
  ApiPost(LoginUrl, data).then(res => {
    if (res.success == true) {
      dispatch({
        type: types.LOGIN,
        payload: res,
      });
    } else {
      console.log(24);
    }
  });
  // console.log(18, dispatch);
  // return new Promise((resolve, reject) => {
  //   return ApiPost(LoginUrl, data)
  //     .then(res => {
  //       if (res.success == true) {
  //         data = res.data;
  //         // setUserData(data).then(() => {
  //         //   resolve(res);
  //         // });
  //         dispatch({
  //           type: types.LOGIN,
  //           payload: data,
  //         });
  //         // saveUserData(data);
  //       }

  //       resolve(res);
  //     })
  //     .catch(error => {
  //       reject(error);
  //     });
  // });
}

// export function signup(data) {
//   return apiPost(SignUpUrl, data);
// }

export function logout() {
  dispatch({type: types.CLEAR_REDUX_STATE});
  // clearUserData();
}
