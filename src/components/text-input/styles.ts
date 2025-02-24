import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.grayDark,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1.5,
    borderColor: colors.grayLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.grayDark,
  },
  inputFocused: {
    borderColor: colors.prussianBluePrimary,
    borderWidth: 1.5,
    shadowColor: colors.prussianBluePrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },
  inputSuccess: {
    borderColor: colors.success,
    borderWidth: 1.5,
  },
  inputDisabled: {
    backgroundColor: colors.grayLight,
    borderColor: colors.grayLight,
    opacity: 0.7,
  },
  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  }
});