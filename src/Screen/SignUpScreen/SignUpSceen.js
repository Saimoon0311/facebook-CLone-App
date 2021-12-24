import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
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
      password !== null &&
      password !== '' &&
      password === confirmPassword
    ) {
      var body = JSON.stringify({
        username: username,
        email: email,
        password: password,
      });
      ApiPost(SignUpUrl, body).then(res => {
        if (res.success == true) {
          showMessage({
            type: 'success',
            icon: 'success',
            message: 'Your Account Has Been Created.',
            backgroundColor: colors.themePrimaryColor,
          });
          navigation.navigate('LoginScreen');
          setLoading(false);
        } else if (res.success == false) {
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: 'Some thing want wrong.',
            backgroundColor: colors.themePrimaryColor,
          });
          setLoading(false);
        } else {
          console.log(39, res);
          setLoading(false);
        }
      });
      // fetch(SignUpUrl)
    } else {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Please complete all fields',
        backgroundColor: colors.themePrimaryColor,
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: hp('10')}}>
      <View style={styles.mainContainer}>
        <MaterialIcons
          name="facebook"
          size={100}
          color={colors.themePrimaryColor}
        />
        <LinearTextGradient
          style={styles.Heading}
          locations={[0, 1]}
          colors={['red', 'blue']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text>Sign Up With facebook</Text>
        </LinearTextGradient>
        <InputField
          label="username"
          onChangeText={e => setUsername(e)}
          value={username}
          firstIconName="person-outline"
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
          secureTextEntry={true}
          firstIconName="key-outline"
          secureTextEntry={show ? false : true}
          onPress={handleClick}
          SecondIconName={show ? 'eye-outline' : 'eye-off-outline'}
          // keyboardType="visible-password"
        />
        <InputField
          label="Confirm Password"
          onChangeText={e => setConfirmPassword(e)}
          value={confirmPassword}
          firstIconName="key-outline"
          secureTextEntry={showConfirm ? false : true}
          onPress={handleClickConfirm}
          SecondIconName={showConfirm ? 'eye-outline' : 'eye-off-outline'}
          // keyboardType="visible-password"
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
          // linearColor={['yellow', 'red']}
          onPress={() => navigation.navigate('LoginScreen')}
        />
      </View>
    </ScrollView>
  );
}
