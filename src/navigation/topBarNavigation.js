import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Screens} from '../Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Linking,
  Platform,
} from 'react-native';
import {colors} from '../Reuseable Component/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator();

export default function TopBarNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: colors.themePrimaryColor,
        tabBarActiveBackgroundColor: '#E9691D',
        tabBarInactiveTintColor: 'gray',
        // tabBarInactiveTintColor: '#512500',
        upperCaseLabel: false,
        // tabBarItemStyle:{

        // },
        tabBarIndicatorStyle: {
          backgroundColor: colors.themePrimaryColor,
        },
      })}>
      <Tab.Screen
        // name="FriendRequestScreen"
        name="Home"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="home-outline" color={color} size={hp('4')} />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0,
            fontWeight: 'bold',
            // marginBottom: hp(Platform?.OS == 'ios' ? '0' : '0'),
          },
        }}
        component={Screens.HomeScreen}
        // component={Screens.FriendRequestScreen}
      />
      {/* <Tab.Screen name="HomeScreen" component={Screens.HomeScreen} /> */}
      <Tab.Screen
        name="groupScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              color={color}
              size={hp('4.2')}
            />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0,
            // fontSize: 15,
            fontWeight: 'bold',
            // marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={Screens.groupScreen}
      />
      <Tab.Screen
        name="videoScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons name="live-tv" color={color} size={hp('4.3')} />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0,
            // fontSize: 15,
            fontWeight: 'bold',
            // marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={Screens.videoScreen}
      />
      <Tab.Screen
        name="NotificationScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="notifications-outline"
              color={color}
              size={hp('4')}
            />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0,
            // fontSize: 15,
            fontWeight: 'bold',
            // marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={Screens.NotificationScreen}
      />
      <Tab.Screen
        name="ProfileScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="list" color={color} size={hp('4')} />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0,
            fontWeight: 'bold',
            // marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={Screens.ProfileScreen}
      />
    </Tab.Navigator>
  );
}
