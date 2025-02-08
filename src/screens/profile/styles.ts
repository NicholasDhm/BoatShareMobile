import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {

    flex: 1,
    padding: 32,
    borderRadius: 8,
    gap: 20,
  },

  dataContainer: {
    padding: 15,
    backgroundColor: colors.grayLight,
    borderRadius: 10,
    gap: 2,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  title: {
    fontSize: 20,
  },


  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subText: {
    fontSize: 16,
    color: colors.grayDark,
  },
  boatReservationName: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.grayDark,
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
});

