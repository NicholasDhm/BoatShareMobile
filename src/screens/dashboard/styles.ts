import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grayLight,
  },
  dropdown: {
    width: '100%',
  },
  dropdownUpperText: {
    fontSize: 14,
    color: colors.grayLight,
    marginBottom: 2
  },

  contentContainer: {
    width: '100%',
    padding: "8%",
    gap: 10,
  },
  calendarContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  iconGrid: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30
  },    
  headerContainer: {
    width: '100%',
    backgroundColor: colors.prussianBluePrimary,
    gap: 20,
    padding: 32,
  },
  headerText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 500,
  },



});