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

export function login(data, dispatch) {
  // console.log(4563254, data);
  var datas = JSON.stringify(data);
  ApiPost(LoginUrl, datas, false).then(res => {
    // console.log(17, res);
    if (res.success == true) {
      // console.log('response', res);
      dispatch({
        type: types.LOGIN,
        payload: res.data,
      });
      return res;
    } else if (res.success == false) {
      return res;
    } else {
      return res;
    }
  });
  // console.log(17, data);
  // ApiPost(LoginUrl, data).then(res => {
  //   if (res.success == true) {
  //     dispatch({
  //       type: types.LOGIN,
  //       payload: res,
  //     });
  //   } else {
  //     return
  //   }
  // });
  // console.log(18, dispatch);

  // return new Promise((resolve, reject) => {
  //   console.log(30, data);
  //    ApiPost(LoginUrl, data, false)
  //     .then(res => {
  //       console.log(17, res);
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

export function logout(dispatch) {
  dispatch({type: types.CLEAR_REDUX_STATE});
  // clearUserData();
}
