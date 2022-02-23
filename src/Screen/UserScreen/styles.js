import {StyleSheet} from 'react-native';
import {colors} from '../../Reuseable Component/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  topImage: {
    width: wp('97'),
    height: hp('35'),
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: hp('2'),
  },
  userImage: {
    top: hp('26'),
    alignSelf: 'center',
    borderWidth: 2.5,
    borderColor: 'white',
  },
  userName: {
    fontSize: hp('3'),
    color: colors.defaultTextColor,
    top: hp('8'),
    textAlign: 'center',
    marginBottom: hp('10'),
  },
  divider: {
    borderWidth: wp('1'),
    marginBottom: hp('1'),
    borderColor: colors.postDivider,
  },
  subHeadings: {
    color: colors.defaultTextColor,
    fontSize: hp('3'),
    marginLeft: wp('2'),
  },
  description: {
    color: 'gray',
    textAlign: 'justify',
    padding: wp('2'),
  },
});
