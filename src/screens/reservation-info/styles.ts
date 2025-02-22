import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#fff",
    },
    dataContainer: {
      flex: 1,
      gap: 20,
      flexDirection: "column",
      display: "flex",
      justifyContent: "space-between",
    },
    subcontainer: {
      flexDirection: "column",
      display: "flex",
      gap: 20,
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
    },
    bold: {
      fontWeight: "bold",
    },
    infoBox: {
      padding: 15,
      backgroundColor: "#f9f9f9",
      borderRadius: 10,
      borderColor: "#ddd",
      borderWidth: 1,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    button: {
      backgroundColor: '#007AFF',
      alignItems: 'center',
      padding: 15,
      borderRadius: 8,
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  