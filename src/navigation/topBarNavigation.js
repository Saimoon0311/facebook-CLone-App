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
        upperCaseLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: colors.themePrimaryColor,
        },
      })}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="home-outline" color={color} size={wp('7')} />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0,
            fontWeight: 'bold',
          },
        }}
        component={Screens.HomeScreen}
      />
      <Tab.Screen
        name="groupScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              color={color}
              size={wp('7')}
            />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0,
            fontWeight: 'bold',
          },
        }}
        component={Screens.groupScreen}
      />
      <Tab.Screen
        name="videoScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons name="live-tv" color={color} size={wp('7')} />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0,
            fontWeight: 'bold',
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
              size={wp('7')}
            />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0,
            fontWeight: 'bold',
          },
        }}
        component={Screens.NotificationScreen}
      />
      <Tab.Screen
        name="ProfileScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="list" color={color} size={wp('7')} />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0,
            fontWeight: 'bold',
          },
        }}
        component={Screens.ProfileScreen}
      />
    </Tab.Navigator>
  );
}
