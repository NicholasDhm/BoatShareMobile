import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  baseButton: {
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  fullWidth: {
    width: '100%',
  },
  primary: {
    backgroundColor: colors.prussianBluePrimary,
    shadowColor: colors.prussianBluePrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.prussianBluePrimary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.prussianBluePrimary,
  },
  disabled: {
    opacity: 0.5,
  },
  titleBase: {
    fontSize: 16,
    fontWeight: '600',
  },
  titlePrimary: {
    color: colors.white,
  },
  titleSecondary: {
    color: colors.prussianBluePrimary,
  },
  titleOutline: {
    color: colors.prussianBluePrimary,
  },
  spinner: {
    marginRight: 8,
  }
});