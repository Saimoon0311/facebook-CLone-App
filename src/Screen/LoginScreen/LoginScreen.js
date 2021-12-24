import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
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
// import {Icon} from 'react-native-gradient-icon';
import {LinearTextGradient} from 'react-native-text-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ApiGet, ApiPost} from '../../config/helpeerFetch';
import {LoginUrl} from '../../config/url';
import {showMessage} from 'react-native-flash-message';
import action from '../../Redux/action';
import {getUserData} from '../../utils/utils';

export default function LoginScreen({navigation}) {
  const handleClick = () => setShow(!show);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(async () => {
    const user = await getUserData();
    console.log(32, user);
  }, []);

  const login = async () => {
    setLoading(true);
    if (
      email !== null &&
      email !== '' &&
      password !== null &&
      password !== ''
    ) {
      try {
        const res = await action.login({
          email,
          password,
        });
        // console.log('res=== 83', res);
        if (res.data == 'user not found!') {
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: 'user not found!',
            backgroundColor: colors.themePrimaryColor,
          });
          setLoading(false);
          // console.log('res=== 86 ', res);
        } else if (res.data == 'wrong password!') {
          showMessage({
            type: 'danger',
            icon: 'danger',
            message: 'wrong password!',
            backgroundColor: colors.themePrimaryColor,
          });
          setLoading(false);
          // console.log('res=== 86 ', res);
        } else {
          // showMessage({
          //   type: 'success',
          //   icon: 'success',
          //   message: 'User Login Success',
          // });
          // console.log(res);
          setLoading(false);
        }
      } catch (error) {
        // console.log('errot', error);
        showMessage({
          type: 'danger',
          icon: 'danger',
          message: error?.data,
          backgroundColor: '#E9691D',
        });
        setLoading(false);
      }
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
          <Text>Login With facebook</Text>
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
          // secureTextEntry={true}
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
  );
}
