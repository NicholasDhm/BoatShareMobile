import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { StackNavigatorProps, StackRoutes } from "../../routes/app.routes";
import { styles } from "./styles";


type ReservationInfoRouteProp = RouteProp<StackRoutes, 'reservationInfo'>;

export function ReservationInfo() {
  const route = useRoute<ReservationInfoRouteProp>();
  const { day, month, year } = route.params;
  const navigation = useNavigation<StackNavigatorProps>();
  
  const date = new Date(year, month - 1, day);

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={handleGoBack}>
          <ChevronLeft size={30} color={"black"} />
        </Pressable>
        <Text style={styles.title}>Reservation</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subTitle}>Select Date</Text>
        {/* <Button onPress={() => setShowDatePicker(true)} title="Choose Date" />
        {showDatePicker && (
          // <DateTimePicker
          //   value={date}
          //   mode="date"
          //   display="default"
          //   onChange={onChange}
          // />
        )} */}
        <Text style={styles.description}>Selected Date: {date.toDateString()}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subTitle}>Reservation Type</Text>
        <Text style={styles.description}>Standard Reservation</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subTitle}>More Information</Text>
        <Text style={styles.description}>
          This type of reservation allows you to book a boat for the specified
          date. It is the most common type of reservation and consumes a
          Standard Quota.
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