import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../themes/colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.prussianBluePrimary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.prussianBluePrimary,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayDark,
    marginTop: 8,
    textAlign: 'center',
  },
  inputsContainer: {
    gap: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.prussianBluePrimary,
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 4,
  },
  signUpText: {
    color: colors.grayDark,
    fontSize: 14,
  },
  signUpLink: {
    color: colors.prussianBluePrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});