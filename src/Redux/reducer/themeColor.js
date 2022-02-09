import type from '../type';
import {Appearance} from 'react-native';

const inital_state = {
  themeType: Appearance.getColorScheme(),
};

export default function themeChange(state = inital_state, action) {
  switch (action.type) {
    case 'CheckThemeColor':
      // console.log(2115151, action.payload);
      return {themeType: action.payload};
      break;

    default:
      return {...state};
      braek;
  }
}
