import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blueLight,
    padding: 64,
    gap: 18,
  },
  title: {
    fontSize: 24,
  },
  subText: {
    fontSize: 12,
  },
});
