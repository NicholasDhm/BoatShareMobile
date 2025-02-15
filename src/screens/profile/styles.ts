import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataContainer: {
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    gap: 2,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dataContainerTitle: {
    fontSize: 20,
  },

  text: {
    fontSize: 16,
    color: colors.grayDark,
  },
  boatReservationName: {
    fontSize: 16,
    color: colors.grayDark,
    marginLeft: 12,
  },
  boatContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownTitle: {
    fontSize: 16,
  },
  rowSpaced: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  boatName: {
    marginInline: 16,
    fontSize: 16,
  },
  userIcon: {
    marginRight: 4,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: colors.bluePrimary,
    padding: 32
  },
  headerText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: 500,
  },
  contentContainer: {
    padding: 32,
    gap: 20,
  },
});

