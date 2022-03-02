import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {InputField} from '../../Reuseable Component/inputField/inputField';
import {colors} from '../../Reuseable Component/color';
import {styles} from './styles';
import {TouchableButton} from '../../Reuseable Component/touchableButton/touchableButton';
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ApiGet, ApiPost} from '../../config/helpeerFetch';
import {LoginUrl} from '../../config/url';
import {showMessage} from 'react-native-flash-message';
import action from '../../Redux/action';
import {useDispatch} from 'react-redux';
import {Avatar, NativeBaseProvider} from 'native-base';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();

  const handleClick = () => setShow(!show);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('saimoon@gmail.com');
  const [password, setPassword] = useState('123456987');

  const login = async () => {
    setLoading(true);
    if (
      email !== null &&
      email !== '' &&
      password !== null &&
      password !== ''
    ) {
      const res = await action.login(
        {
          email,
          password,
        },
        dispatch,
      );
      if (res.success == false) {
        if (res.data == 'user not found!') {
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: 'Warning',
            description: 'user not found!',
            backgroundColor: colors.statusBarColor,
          });
          // console.log(71, res);
          setLoading(false);
        } else if (res.data == 'wrong password!') {
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: 'Warning',
            description: 'wrong password!',
            backgroundColor: colors.statusBarColor,
          });
          setLoading(false);
        }
      } else {
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: 'Warning',
          description: 'Some thing is wrong',
          backgroundColor: colors.statusBarColor,
        });
        setLoading(false);
      }
    } else {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Warning',
        description: 'Please complete all fields',
        backgroundColor: colors.statusBarColor,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={true} />
      <NativeBaseProvider>
        <ImageBackground
          style={{width: wp('100'), height: hp('100'), zIndex: 1}}
          blurRadius={3}
          source={require('../../Images/backgroundImage.jpeg')}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
              <MaterialIcons
                name="facebook"
                size={100}
                color={'white'}
                style={{marginTop: hp('10')}}
              />
              <LinearTextGradient
                style={styles.Heading}
                locations={[0, 1]}
                // colors={[colors.statusBarColor, colors.themePrimaryColor]}
                colors={[colors.statusBarColor, 'white']}
                start={{x: 0, y: 5}}
                end={{x: 1, y: 0}}>
                <Text style={styles.Heading}>Login with facebook</Text>
              </LinearTextGradient>
              <InputField
                label="Email"
                onChangeText={e => setEmail(e)}
                value={email}
                autoCapble="none"
                firstIconName="mail-outline"
              />
              <InputField
                label="Password"
                onChangeText={e => setPassword(e)}
                value={password}
                secureTextEntry={show ? false : true}
                onPress={handleClick}
                SecondIconName={show ? 'eye-outline' : 'eye-off-outline'}
                firstIconName="key-outline"
              />
              <TouchableButton
                bgColor="red"
                textColor="white"
                text="Login"
                iconName="log-in-outline"
                iconColor="white"
                linearColor={['#ad2d65', '#002b5d']}
                onPress={() => login()}
                loading={loading}
              />
              <TouchableButton
                bgColor="red"
                textColor="white"
                text="Sign Up"
                iconName="person-add-outline"
                iconColor="white"
                linearColor={['#002b5d', '#ad2d65']}
                onPress={() => navigation.navigate('SignUpScreen')}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </NativeBaseProvider>
    </>
  );
}
