import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { AlignCenter, ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";

export function ReservationTypeInfo() {
  const navigation = useNavigation<StackNavigatorProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={handleGoBack}>
          <ChevronLeft size={30} color={"black"} />
        </Pressable>
        <Text style={styles.title}>Reservation Types</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subTitle}>Standard Reservation</Text>
        <Text style={styles.description}>
          This type of reservation allows you to book a boat for the specified
          date. It is the most common type of reservation and consumes a
          Standard Quota.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subTitle}>Substitution Reservation</Text>
        <Text style={styles.description}>
          A substitution reservation places you in line to replace a confirmed
          reservation. You'll get that reservation if the owner decides to
          cancel it. This reservation type cosumes a Substitution Quota.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subTitle}>Contingency Reservation</Text>
        <Text style={styles.description}>
          The contingency reservation is a special type of reservation that
          occurs when the boat is free for the day and it's after 6:00 AM. This
          reservation type consumes a Contingency Quota.
        </Text>
      </View>

      <View style={styles.calendarInfoBox}>
        <Text style={styles.subTitle}>Calendar Status</Text>
        <Text style={styles.description}>
          <Text style={styles.bold}>Blue:</Text> Available{"\n"}
          <Text style={styles.bold}>Red:</Text> Available for Substitution{"\n"}
          <Text style={styles.bold}>Yellow:</Text> Available for Contingency
          {"\n"}
          <Text style={styles.bold}>Red dot:</Text> Confirmation Needed{"\n"}
          <Text style={styles.bold}>Green dot:</Text> Confirmed Reservation
          {"\n"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  },
  bold: {
    fontWeight: "bold",
  },
  infoBox: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
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
});
