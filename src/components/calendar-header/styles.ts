import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.prussianBluePrimary,
    borderRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    marginBottom: 12,
  },
  textContainer: {
    alignItems: 'center',
  },
  button: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  monthText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
  },
  yearText: {
    fontSize: 14,
    opacity: 0.6,
    color: colors.white,
    fontWeight: '400',
  },
});