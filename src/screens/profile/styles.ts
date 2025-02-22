import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayLight,
  },
  dataContainer: {
    padding: 20,
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
  dataContainerContent: {
    gap: 8
  },
  dataContainerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.grayBorder,
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
  rowSpaced: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boatName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  boatCapacity: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,

    marginLeft: "auto"
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
  reservationList: {
    gap: 10,
    paddingTop: 10,
  }
});

