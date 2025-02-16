import React from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { StackNavigatorProps, StackRoutes } from "../../routes/app.routes";
import { styles } from "./styles";
import { getFirstReservation } from "../../components/calendar-day";
import { ReservationType } from "../../@types/reservation-type";
import { colors } from "../../themes/colors";
import { SvgIcon } from "../../components/svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { reservationsApi } from "../../apis/reservationsApi";
import { useInfo } from "../../contexts/info";
import { contractsApi } from "../../apis/contractsApi";

type ReservationInfoRouteProp = RouteProp<StackRoutes, 'reservationInfo'>;

export function ReservationInfo() {
  const navigation = useNavigation<StackNavigatorProps>();
  const route = useRoute<ReservationInfoRouteProp>();
  const { user, boatSelectedInDropdown, fetchReservationsForCurrentBoat, fetchReservations } = useInfo();

  const calendarDay = route.params.calendarDay;

  const activeReservation = getFirstReservation(calendarDay.reservations);
  const reservationColors = {
    [ReservationType.STANDARD]: { primary: colors.bluePrimary, secondary: colors.blueLight },
    [ReservationType.SUBSTITUTION]: { primary: colors.redPrimary, secondary: colors.redLight },
    [ReservationType.CONTINGENCY]: { primary: colors.orangePrimary, secondary: colors.orangeLight },
  };
  const { primary: primaryColor, secondary: secondaryColor } = activeReservation
    ? reservationColors[activeReservation.type] || { primary: colors.bluePrimary, secondary: colors.blueLight }
    : { primary: colors.bluePrimary, secondary: colors.blueLight };

  const date = new Date(calendarDay.year, calendarDay.month - 1, calendarDay.day);
  const confirmationStartDate = new Date(date);
  confirmationStartDate.setDate(date.getDate() - 5);
  const confirmationEndDate = new Date(date);
  confirmationEndDate.setDate(date.getDate() - 2);

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleMakeReservation() {
    try {
      if (user && boatSelectedInDropdown) {
        const contract = await contractsApi.getContractByBoatAndUserId(boatSelectedInDropdown.id, user.id);
        if (contract) {
          await reservationsApi.createReservation(contract.id, date.toISOString());
          await fetchReservationsForCurrentBoat();
          await fetchReservations();
          Alert.alert("Reservation created successfully");
          navigation.goBack();
        } else {
          Alert.alert("Error", "No contract found for the selected boat");
        }
      } else {
        Alert.alert("Error", "No user or boat selected");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to make reservation");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primaryColor }}>
      <ScrollView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.row}>
            <View style={styles.row}>
              <Pressable onPress={handleGoBack}>
                <ChevronLeft size={30} color={"black"} />
              </Pressable>
              <Text style={styles.title}>Reservation</Text>
            </View>

            <SvgIcon
              icon="boat"
              size={30}
              color={primaryColor}
            />
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.subTitle}>{date.toDateString()}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.description}>
              Confirmation window: {confirmationStartDate.toLocaleDateString()} - {confirmationEndDate.toLocaleDateString()}
            </Text>

            <Text style={styles.description}>
              This reservation consumes a{" "}
              <Text style={[styles.description, { color: primaryColor, fontWeight: 'bold' }]}>
                {activeReservation?.type ?? "Standard"} Quota.
              </Text>
            </Text>
          </View>

          {!calendarDay.isReserved ? (
            <>
              <View style={[styles.infoBox, { backgroundColor: secondaryColor }]}>
                <Text style={styles.subTitle}>Reservation Status</Text>
                <Text style={styles.description}>
                  This date is available for reservation
                </Text>
              </View>
              <Pressable
                style={[styles.infoBox, { backgroundColor: primaryColor, alignItems: 'center' }]}
                onPress={() => { handleMakeReservation() }}
              >
                <Text style={[styles.description, { color: 'white' }]}>
                  Place Reservation
                </Text>
              </Pressable>
            </>
          ) : (
            <View style={[styles.infoBox, { backgroundColor: secondaryColor }]}>
              <Text style={styles.subTitle}>Reservation Status</Text>
              <Text style={styles.description}>
                This date is already reserved
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}