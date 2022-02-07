import {useSelector} from 'react-redux';
import {store} from '../Redux/reducer';

const outsideSelector = state => state.themeChange;

// const selector = useSelector(selector);
// const {themeType} = selector(state => state.themeChange);
const {themeType} = useSelector(outsideSelector());

export const colors = {
  // themePrimaryColor: '#173E5D',
  // themePrimaryColor: '#00b2f7',
  themePrimaryColor: '#225178',
  statusBarColor: themeType == true ? '#00b2f7' : 'black',
  defaultBgColor: 'white',
  defaultTextColor: '',
  defaultPostTextColor: 'black',
  // themePrimaryColor: '#0A5EA4',
  // themePrimaryColor: '#002b5d',
};
