import React from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigatorProps, StackRoutes } from "../../routes/app.routes";
import { styles } from "./styles";
import { ReservationType } from "../../@types/reservation-type";
import { colors } from "../../themes/colors";
import { SvgIcon } from "../../components/svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { reservationsApi } from "../../apis/reservationsApi";
import { useInfo } from "../../contexts/info";
import { contractsApi } from "../../apis/contractsApi";
import { getFirstReservation } from "../../components/calendar/methods";
import { Reservation } from "../../@types/reservation";

type ReservationInfoRouteProp = RouteProp<StackRoutes, 'reservationInfo'>;

export function ReservationInfo() {
  const navigation = useNavigation<StackNavigatorProps>();
  const route = useRoute<ReservationInfoRouteProp>();
  const { user, currentUserReservations, boatSelectedInDropdown, fetchReservationsForCurrentBoat, fetchReservations, fetchContracts } = useInfo();

  const calendarDay = route.params.calendarDay;
  let activeReservation: Reservation | null = null;
  if (calendarDay.reservations) {
    activeReservation = getFirstReservation(calendarDay.reservations);
  }
  const currentUserHasReservation = activeReservation && currentUserReservations.some(cur => cur.id === activeReservation.id);
  const queueCount = calendarDay.reservations?.length || 0;

  // const reservationOwner = activeReservation?.user?.name || "Unknown";
  
  let quotaType = ReservationType.STANDARD;
  let primaryColor = colors.bluePrimary;
  let secondaryColor = colors.blueLight;

  const type = activeReservation?.type;

  if (activeReservation) {
    quotaType = currentUserHasReservation ? activeReservation.type : ReservationType.SUBSTITUTION;
    primaryColor = currentUserHasReservation ? type === ReservationType.STANDARD ? colors.bluePrimary :
      type === ReservationType.SUBSTITUTION ? colors.redPrimary :
      type === ReservationType.CONTINGENCY ? colors.orangePrimary
      : colors.redPrimary
    : colors.redPrimary;
    secondaryColor = currentUserHasReservation ? type === ReservationType.STANDARD ? colors.blueLight :
    type === ReservationType.SUBSTITUTION ? colors.redLight :
    type === ReservationType.CONTINGENCY ? colors.orangeLight
    : colors.redLight
  : colors.redLight;
  }

  const now = new Date();
  const isToday = now.getFullYear() === calendarDay.year && now.getMonth() + 1 === calendarDay.month && now.getDate() === calendarDay.day;
  const isPastSixOClock = now.getHours() >= 18;
  if (isToday && isPastSixOClock) {
    primaryColor = colors.orangePrimary;
    secondaryColor = colors.orangeLight;
    quotaType = ReservationType.CONTINGENCY;
  }

  const date = new Date(calendarDay.year, calendarDay.month - 1, calendarDay.day);
  const confirmationStartDate = new Date(date);
  confirmationStartDate.setDate(date.getDate() - 5);
  const confirmationEndDate = new Date(date);
  confirmationEndDate.setDate(date.getDate() - 2);
  const isInConfirmationPeriod = now >= confirmationStartDate && now <= confirmationEndDate;

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

  async function handleCancelReservation() {
    try {
      if (activeReservation) {
        await reservationsApi.deleteReservation(activeReservation.id);
        await fetchReservationsForCurrentBoat();
        await fetchReservations();
        Alert.alert("Reservation canceled successfully");
        navigation.goBack();
      } else {
        Alert.alert("Error", "No active reservation found");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to cancel reservation");
    }
  }
  
  async function handleConfirmReservation() {
    try {
      if (activeReservation) {
        // await reservationsApi.confirmReservation(activeReservation.id);
        await fetchReservationsForCurrentBoat();
        await fetchReservations();
        Alert.alert("Reservation confirmed successfully");
        navigation.goBack();
      } else {
        Alert.alert("Error", "No active reservation found");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to confirm reservation");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primaryColor }}>
      <ScrollView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.row}>
            <Pressable onPress={() => navigation.goBack()}>
              <ChevronLeft size={30} color={"black"} />
            </Pressable>
            <Text style={styles.title}>Reservation</Text>
            <SvgIcon icon="boat" size={30} color={primaryColor} />
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.subTitle}>{date.toDateString()}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.description}>Confirmation window: {confirmationStartDate.toLocaleDateString()} - {confirmationEndDate.toLocaleDateString()}</Text>
          </View>

          {!currentUserHasReservation ? (
            <Pressable style={[styles.infoBox, { backgroundColor: primaryColor, alignItems: 'center' }]} onPress={handleMakeReservation}>
              <Text style={[styles.description, { color: 'white' }]}>Make Reservation</Text>
            </Pressable>
          ) : (
            isInConfirmationPeriod && (
              <Pressable style={[styles.infoBox, { backgroundColor: colors.green, alignItems: 'center' }]} onPress={handleConfirmReservation}>
                <Text style={[styles.description, { color: 'white' }]}>Confirm Reservation</Text>
              </Pressable>
            )
          )}

          {currentUserHasReservation && (
            <Pressable style={[styles.infoBox, { backgroundColor: colors.redPrimary, alignItems: 'center' }]} onPress={handleCancelReservation}>
              <Text style={[styles.description, { color: 'white' }]}>Cancel Reservation</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
