import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../themes/colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayLight,
  },
headerContainer: {
    width: '100%',
    backgroundColor: colors.prussianBluePrimary,
    padding: 24,
    paddingTop: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
  },
  dropdown: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
    zIndex: 999,
  },
  headerText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '600',
    marginBottom: 24,
  },
  dropdownUpperText: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 8,
    opacity: 0.9,
  },
  contentContainer: {
    width: '100%',
    padding: 20,
    gap: 16,
    zIndex: 1,
  },
  calendarContainer: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  iconGrid: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    backgroundColor: colors.prussianBluePrimary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});