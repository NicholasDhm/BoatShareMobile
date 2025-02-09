import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';


export const s = StyleSheet.create({
  dropdown: {
    position: 'relative',
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.grayLight,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 200,

  },
  placeholder: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.grayDark,
  },
  chevron: {
    transform: [{ rotate: '90deg' }],
  },
  dropdownList: {
    position: 'absolute',
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white,
    marginTop: 40,
    borderRadius: 4,

  },
  dropdownItem: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 200,
    borderRadius: 4,
  },
  dropdownItemSelected: {
    backgroundColor: colors.grayLight,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 200,
    borderRadius: 4,
  },

});