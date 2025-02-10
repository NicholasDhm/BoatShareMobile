import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigatorProps, StackRoutes } from "../../routes/app.routes";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../themes/colors";

type ReservationTypeInfoRouteProp = RouteProp<StackRoutes, 'reservationTypeInfo'>;

export function ReservationTypeInfo() {
  const navigation = useNavigation<StackNavigatorProps>();
  const route = useRoute<ReservationTypeInfoRouteProp>();
  const reservationType = route.params.reservationType;
  const primaryColor = reservationType === 'Standard'
    ? colors.bluePrimary
    : reservationType === 'Substitution'
    ? colors.redPrimary
    : reservationType === 'Contingency'
    ? colors.orangePrimary
    : 'transparent';

  function handleGoBack() {
    navigation.goBack();
  }

  function renderReservationInfo() {
    switch (reservationType) {
      case 'Standard':
        return (
          <View style={styles.infoBox}>
            <Text style={styles.subTitle}>Standard Reservation</Text>
            <Text style={styles.description}>
              This type of reservation allows you to book a boat for the specified
              date. It is the most common type of reservation and consumes a{" "}
              <Text style={[styles.description, { color: primaryColor, fontWeight: 'bold' }]}>
                Standard Quota.
              </Text>
            </Text>
          </View>
        );
      case 'Substitution':
        return (
          <View style={styles.infoBox}>
            <Text style={styles.subTitle}>Substitution Reservation</Text>
            <Text style={styles.description}>
              A substitution reservation places you in line to replace a confirmed
              reservation. You'll get that reservation if the owner decides to
              cancel it. This reservation type consumes a{" "}
              <Text style={[styles.description, { color: primaryColor, fontWeight: 'bold' }]}>
                Substitution Quota.
              </Text>
            </Text>
          </View>
        );
      case 'Contingency':
        return (
          <View style={styles.infoBox}>
            <Text style={styles.subTitle}>Contingency Reservation</Text>
            <Text style={styles.description}>
              The contingency reservation is a special type of reservation that
              occurs when the boat is free for the day and it's after 6:00 AM. This
              reservation type consumes a{" "}
              <Text style={[styles.description, { color: primaryColor, fontWeight: 'bold' }]}>
                Contingency Quota.
              </Text>
            </Text>
          </View>
        );
      default:
        return null;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primaryColor }}>
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Pressable onPress={handleGoBack}>
            <ChevronLeft size={30} color={"black"} />
          </Pressable>
          <Text style={styles.title}>Reservation Types</Text>
        </View>

        {renderReservationInfo()}

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
    </SafeAreaView>
  );
}
