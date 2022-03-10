import React, {useState} from 'react';
import {View, Text, ScrollView, ImageBackground} from 'react-native';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {InputField} from '../../Reuseable Component/inputField/inputField';
import {LinearTextGradient} from 'react-native-text-gradient';
import {TouchableButton} from '../../Reuseable Component/touchableButton/touchableButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SignUpUrl} from '../../config/url';
import {showMessage} from 'react-native-flash-message';
import {colors} from '../../Reuseable Component/color';
import {ApiPost} from '../../config/helpeerFetch';

export default function SignUpScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const [show, setShow] = useState(false);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);
  const [showConfirm, setShowConfirm] = useState(false);
  const signup = () => {
    setLoading(true);
    if (
      username !== null &&
      username !== '' &&
      email !== null &&
      email !== '' &&
      phoneNumber !== '' &&
      phoneNumber !== null &&
      password !== null &&
      password !== '' &&
      password === confirmPassword
    ) {
      var body = JSON.stringify({
        username: username,
        email: email,
        PhoenNumber: phoneNumber,
        password: password,
      });
      ApiPost(SignUpUrl, body, false).then(res => {
        if (res.success == true) {
          showMessage({
            type: 'success',
            icon: 'success',
            message: 'Success',
            description: 'Your Account Has Been Created.',
            backgroundColor: colors.statusBarColor,
          });

          navigation.navigate('LoginScreen');
          setLoading(false);
        } else if (res.success == false) {
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: 'Warning',
            description: 'Some thing want wrong.',
            backgroundColor: colors.statusBarColor,
          });
          setLoading(false);
        } else {
          // console.log(39, res);
          setLoading(false);
        }
      });
      // fetch(SignUpUrl)
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

  // const postmethod = ()=>{
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     username: username,
  //       email: email,
  //       password: password,
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch("http://192.168.20.43:5000/api/v1/auth/register", requestOptions)
  //     .then(response => response.json())
  //     .then(result => console.log(93,result))
  //     .catch(error => console.log('error', error));
  // }
  return (
    <ImageBackground
      style={{width: wp('100'), height: hp('100'), zIndex: 1}}
      // blurRadius={3}
      source={require('../../Images/screen2.png')}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // alwaysBounceVertical={true}
        contentContainerStyle={{
          paddingBottom: hp('10'),
          // backgroundColor: 'yellow',
        }}>
        <View style={styles.mainContainer}>
          <MaterialIcons
            name="facebook"
            size={100}
            color={colors.themePrimaryColor}
          />
          <LinearTextGradient
            style={styles.Heading}
            locations={[0, 1]}
            // colors={[colors.statusBarColor, colors.themePrimaryColor]}
            colors={['white', 'white']}
            start={{x: 0, y: 5}}
            end={{x: 1, y: 0}}>
            <Text>SignUp in facebook</Text>
          </LinearTextGradient>
          <InputField
            label="Username"
            onChangeText={e => setUsername(e)}
            value={username}
            firstIconName="person-outline"
          />
          <InputField
            label="Phone Number"
            onChangeText={e => setPhoneNumber(e)}
            value={phoneNumber}
            autoCapble="none"
            firstIconName="call-outline"
            keyboardType="phone-pad"
          />
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
            firstIconName="key-outline"
            secureTextEntry={show ? false : true}
            onPress={handleClick}
            SecondIconName={show ? 'eye-outline' : 'eye-off-outline'}
          />
          <InputField
            label="Confirm Password"
            onChangeText={e => setConfirmPassword(e)}
            value={confirmPassword}
            firstIconName="key-outline"
            secureTextEntry={showConfirm ? false : true}
            onPress={handleClickConfirm}
            SecondIconName={showConfirm ? 'eye-outline' : 'eye-off-outline'}
          />
          <TouchableButton
            bgColor="red"
            textColor="white"
            text="Sign Up"
            iconName="person-add-outline"
            iconColor="white"
            linearColor={['#ad2d65', '#002b5d']}
            onPress={() => signup()}
            loading={loading}
          />
          <TouchableButton
            bgColor="red"
            textColor="white"
            text="Login"
            iconName="log-in-outline"
            iconColor="white"
            linearColor={['#002b5d', '#ad2d65']}
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
