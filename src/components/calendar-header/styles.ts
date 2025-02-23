import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.prussianBluePrimary,
    paddingHorizontal: 16,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 10,

  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: colors.grayLight,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.grayDark,


  },
  dateText: {
    fontSize: 18,
    color: colors.white,
  },
});
