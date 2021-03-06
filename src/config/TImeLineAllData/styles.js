import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../Reuseable Component/color';

export const styles = StyleSheet.create({
  ff: {
    width: wp('35'),
    height: hp('20'),
    backgroundColor: 'yellow',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gg: {
    width: wp('20'),
    height: hp('10'),
    backgroundColor: 'yellow',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainContainer: {
    width: wp('100'),
    backgroundColor: colors.defaultBgColor,
    marginTop: hp('1'),
  },
  header: {
    flexDirection: 'row',
    paddingTop: hp('0.5'),
    paddingBottom: hp('0.5'),
  },
  postImage: {
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    // alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.13,
    height: Dimensions.get('screen').width * 0.13,
    backgroundColor: colors.defaultBgColor,
    // marginTop: hp('2'),
    marginLeft: hp('1.5'),
    marginTop: hp('0.5'),
  },
  postName: {
    // textAlignVertical: 'center',
    color: colors.defaultTextColor,
    fontSize: hp('2.5'),
  },
  description: {
    color: colors.defaultTextColor,
    paddingLeft: wp('3'),
    fontSize: hp('2.5'),
    width: wp('95'),
    lineHeight: hp('3.5'),
    fontFamily: 'Poppins-Regular',
    // backgroundColor: 'yellow',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1'),
    paddingLeft: wp('2'),
  },
  likeShareContainer: {
    width: wp('100'),
    justifyContent: 'center',
    flexDirection: 'row',
    height: hp('6'),
    marginTop: hp('2'),
    borderTopWidth: hp('0.1'),
    // backgroundColor: 'red',
  },
  likeButton: {
    width: wp('50'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  shareText: {
    paddingRight: wp('2'),
    color: colors.defaultTextColor,
    fontSize: hp('2.5'),
  },
  hidePostUndoButton: {
    marginLeft: 'auto',
    justifyContent: 'center',
    marginRight: wp('2'),
    backgroundColor: colors.themePrimaryColor,
    width: wp('15'),
    height: hp('6'),
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  hiddenView: {
    flexDirection: 'column',
    marginLeft: wp('1'),
    marginTop: hp('1'),
  },
});
