import {useState} from 'react';
import {Appearance} from 'react-native';
import {useSelector} from 'react-redux';
import {themeType} from '../../AppTwo';
import {store} from '../Redux/reducer';

// var themeType = 'light';
console.log(11, themeType);

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
  // themePrimaryColor: '#0A5EA4',
  // themePrimaryColor: '#002b5d',
};
