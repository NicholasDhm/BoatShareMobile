import { StyleSheet } from "react-native";
import { colors } from "../../themes/colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  spacedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
  },
  form: {
    marginTop: 48,
    marginHorizontal: 48,
    alignItems: 'center',
  },
  partnersContainer: {
    marginTop: 48,
    marginHorizontal: 48,
  },
  partnersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  partnersList: {
    marginTop: 16,
    gap: 10,
  },
  partnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    gap: 10,
    height: 60,
  },
  partnerInputContainer:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 60,
  },
  partnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  removePartnerButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  addPartnerButton: {
    backgroundColor: colors.green,
    padding: 5,
    borderRadius: 5,
    alignSelf: "center"
  },
  boatName: {
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 48,
  },
  partnerName: {
    fontSize: 14,
  },
  detailText: {
    fontSize: 14,
    color: colors.grayMedium,
  },
  partnerInput : {
    width: "80%",
    alignSelf: "center",
    height: 60,
  }
});