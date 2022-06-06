import type from '../type';
import {Appearance} from 'react-native';

const inital_state = {
  deviceToken: '',
};

export default function deviceToken(state = inital_state, action) {
  switch (action.type) {
    case 'getToken':
      return {deviceToken: action.payload};
      break;
    default:
      return {...state};
      braek;
  }
}
