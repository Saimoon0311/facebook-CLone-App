import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../Reuseable Component/color';

export const styles = StyleSheet.create({
  Heading: {
    textAlign: 'center',
    color: 'black',
    // color: colors.themePrimaryColor,
    fontSize: hp('3'),
    marginTop: hp('2'),
    fontWeight: 'bold',
  },
  mainContainer: {
    alignSelf: 'center',
    // marginTop: hp('10'),
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
});
