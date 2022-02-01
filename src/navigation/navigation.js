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
  const userData = useSelector(state => state.auth.userData);
  console.log(14, userData);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
        animation: 'slide_from_right',
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
      {/* <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Cartdetails" component={Cartdetails} />
      <Stack.Screen name="Userdeatils" component={Userdeatils} />
      <Stack.Screen name="subcatdetails" component={subcatdetails} />
      <Stack.Screen name="changepassword" component={changepassword} />
      <Stack.Screen name="checkOut" component={checkOut} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} /> */}
    </Stack.Navigator>
  );
}
