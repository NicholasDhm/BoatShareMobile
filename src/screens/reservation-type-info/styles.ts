import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    maxWidth: "100%",
  },
  infoBox: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    overflow: "hidden",
  },
  calendarInfoBox: {
    padding: 10,
    backgroundColor: "#e8f0fe",
    borderRadius: 10,
    borderColor: "#bbb",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  gap_10: {
    gap: 10,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    maxWidth: "100%",
  },
  reservationType: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    maxWidth: "100%",
  },
  reservationTypeTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
});
