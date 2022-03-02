import {StyleSheet} from 'react-native';
import {colors} from '../../Reuseable Component/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  topImage: {
    width: wp('100'),
    height: hp('35'),
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: hp('5'),
  },
  userImage: {
    top: hp('26'),
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: 'white',
    textAlignVertical: 'center',
  },
  userName: {
    fontSize: hp('3'),
    color: colors.defaultTextColor,
    top: hp('7'),
    textAlign: 'center',
    marginBottom: hp('10'),
    width: wp('50'),
    alignSelf: 'center',
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
  createPostButton: {
    width: wp('80'),
    height: hp('8'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.themePrimaryColor,
    alignSelf: 'center',
    marginBottom: hp('2'),
    borderRadius: 8,
  },
  createPostText: {
    color: 'white',
    fontSize: hp('2.5'),
    fontWeight: '600',
  },
});
