import {useState} from 'react';
import {Appearance} from 'react-native';
import {useSelector} from 'react-redux';
import {pp} from '../../AppTwo';
import {store} from '../Redux/reducer';

Appearance.addChangeListener(scheme => {
  store.dispatch({
    type: 'CheckThemeColor',
    payload: scheme.colorScheme,
  });
  // console.log(13, scheme.colorScheme);
});
var themeType = store.getState().themeChange.themeType;
// console.log(15, themeType);
export const colors = {
  // themePrimaryColor: '#173E5D',
  // themePrimaryColor: '#00b2f7',
  themePrimaryColor: '#225178',
  statusBarColor: '#00b2f7',
  defaultBgColor: themeType == 'light' ? 'white' : '#242527',
  defaultTextColor: themeType == 'light' ? 'black' : '#f1f2f6',
  defaultPostTextColor: 'black',
  modalMainContainer: themeType == 'light' ? '#f1f2f7' : '#242527',
  modalInsideColor: themeType == 'light' ? 'white' : '#333436',
  postDivider: themeType == 'light' ? '#F3F3F3' : '#18191b',
  sharePostModalIcon: themeType == 'light' ? '#225178' : 'white',
  headerFacebookIcon: themeType == 'light' ? 'blue' : 'white',
  roundIconsBgColor: themeType == 'light' ? '#D9D9D9' : '#393a3e',
  roundIconsColor: themeType == 'light' ? '#1A1A1A' : '#e6e7eb',
  seacrhBar: themeType == 'light' ? '#E7E7E7' : '#393a3c',
  seacrhBarPlaceholder: themeType == 'light' ? 'gray' : '#a3a4a8',
  topbarSelectedIcon: themeType == 'light' ? '#225178' : 'blue',
  shortTagsBgColor: themeType == 'light' ? '#d6edff' : '#263346',
  shortTagsTextColor: themeType == 'light' ? 'blue' : '#2f68b7',
  activeNotificationBgcolor: themeType == 'light' ? '#e7f3ff' : '#242e3a',
  profileScreenCatergoryBg: themeType == 'light' ? 'white' : '#333436',
  profileScreenCatergoryIcon: themeType == 'light' ? 'blue' : '#38b1ce',
  logoutButtonBg: themeType == 'light' ? '#D6D6D8' : '#2f3130',
  profileScreenCatergoryFixedIcon: themeType == 'light' ? '#760C72' : '#3ab7f7',
  // themePrimaryColor: '#0A5EA4',
  // themePrimaryColor: '#002b5d',
};
