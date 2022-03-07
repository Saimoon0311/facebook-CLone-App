import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import mainstack from '../navigation/mainstack';
import {useSelector} from 'react-redux';
import topBarNavigation from './topBarNavigation';
import {Screens} from '../Screen';
import {TopbartabBarHeader} from './toptabbarwithheader';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const {userData} = useSelector(state => state.auth);
  // console.log(14, userData);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
        animation: 'slide_from_bottom',
      }}>
      {/*  */}
      {!!userData && userData._id ? (
        <Stack.Screen
          name="TopbartabBarHeader"
          component={TopbartabBarHeader}
          // component={Screens.topBarNavigation}
        />
      ) : (
        <>
          <Stack.Screen
            options={{
              title: 'Sign In',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#FFDDC9',
              },
              headerTintColor: '#512500',

              headerTitleStyle: {
                fontSize: 18,
              },
            }}
            name="LoginScreen"
            component={Screens.LoginScreen}
          />
          <Stack.Screen
            options={{
              title: 'Sign In',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#FFDDC9',
              },
              headerTintColor: '#512500',

              headerTitleStyle: {
                fontSize: 18,
              },
            }}
            name="SignUpScreen"
            component={Screens.SignUpScreen}
          />
        </>
      )}
      <Stack.Screen name="userScreen" component={Screens.userScreen} />
    </Stack.Navigator>
  );
}
