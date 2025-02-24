import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: colors.prussianBluePrimary,
    borderRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    marginBottom: 12,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  monthYearText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
});