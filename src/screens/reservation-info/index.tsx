import React, { useEffect, useState } from "react";
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
import { ReservationStatus } from "../../@types/reservation-status";
import { Reservation } from "../../@types/reservation";
import { Contract } from "../../@types/contract";
import { usersApi } from "../../apis/usersApi";

// Type Definitions
type ReservationInfoRouteProp = RouteProp<StackRoutes, 'reservationInfo'>;

async function getActiveReservationOwner(reservation: Reservation | undefined, contracts: Contract[]) {
  if (reservation && reservation.contractId) {
    const contract = contracts.find(contract => contract.id === reservation.contractId);
    if (contract) {
      return usersApi.getUserById(contract.userId).then(user => {
        if (user) {
          return user.name;
        } else {
          return '';
        }
      });
    }
  }
}

export function ReservationInfo() {
  const navigation = useNavigation<StackNavigatorProps>();
  const route = useRoute<ReservationInfoRouteProp>();
  const { user, currentUserReservations, boatSelectedInDropdown, currentBoatContracts, fetchReservationsForCurrentBoat, fetchReservations } = useInfo();
  const [reservationOwner, setReservationOwner] = useState("");

  const calendarDay = route.params.calendarDay;
  const activeReservation = getFirstReservation(calendarDay.reservations);
  console.log(activeReservation);
  const reservedByCurrentUser = activeReservation && currentUserReservations.some(cur => cur.id === activeReservation.id);

  let otherUserHasConfirmedReservation = false
  if (calendarDay.status === null && calendarDay.type === null && calendarDay.isReserved) {
    otherUserHasConfirmedReservation = true;
  }  

  const currentUserHasReservation = calendarDay.reservations?.some(reservation =>
    currentUserReservations.some(cur => cur.id === reservation.id)
  ) || false;
  
  let queueCount = calendarDay.reservations?.length || 0;
  if (activeReservation) {
    queueCount -= 1
  }
  
  useEffect(() => {
    async function fetchReservationOwner() {
      const owner = await getActiveReservationOwner(activeReservation!, currentBoatContracts);
      setReservationOwner(owner || "");
    }
    fetchReservationOwner();
  }, [activeReservation, currentBoatContracts]);

  // Define colors based on reservation type
  let primaryColor = colors.prussianBluePrimary;
  let secondaryColor = colors.prussianBlueLight;
  let quotaType = ReservationType.STANDARD;
  
  
  const type = activeReservation?.type;

  if (activeReservation) {
    quotaType = !currentUserHasReservation ? ReservationType.SUBSTITUTION : activeReservation.type;
    if (reservedByCurrentUser) {
      switch (type) {
        case ReservationType.STANDARD:
          primaryColor = colors.prussianBluePrimary;
          secondaryColor = colors.prussianBlueLight;
          break;
        case ReservationType.SUBSTITUTION:
          primaryColor = colors.tealPrimary;
          secondaryColor = colors.tealLight;
          break;
        case ReservationType.CONTINGENCY:
          primaryColor = colors.orangePrimary;
          secondaryColor = colors.orangeLight;
          break;
        default:
          primaryColor = colors.tealPrimary;
          secondaryColor = colors.tealLight;
          break;
      }
    } else if (otherUserHasConfirmedReservation) {
      primaryColor = colors.tealPrimary;
      secondaryColor = colors.grayLight;
    } else {      
      primaryColor = colors.tealPrimary;
      secondaryColor = colors.tealLight
    }
  }
  
  // Define status message
  let statusMessage = "This date is available for reservation";
  if (otherUserHasConfirmedReservation) {
    statusMessage = `This date is unavailable`;
  } else if (calendarDay.status === ReservationStatus.PENDING) {
    statusMessage = reservedByCurrentUser ? "This date is pending confirmation" : "You're in queue for this date";
  } else if (calendarDay.status === ReservationStatus.CONFIRMED) {
    statusMessage = "Your reservation is confirmed! Have a good trip!";
  } else if (calendarDay.status === ReservationStatus.UNCONFIRMED) {
    statusMessage = "This date is awaiting confirmation";
  }

  // Date Handling
  const now = new Date();
  const isToday = now.getFullYear() === calendarDay.year && now.getMonth() + 1 === calendarDay.month && now.getDate() === calendarDay.day;
  const isPastSixOClock = now.getHours() >= 6;
  
  if (isToday && isPastSixOClock && calendarDay.reservations?.length === 0) {
    primaryColor = colors.orangePrimary;
    secondaryColor = colors.orangeLight;
    quotaType = ReservationType.CONTINGENCY;
  }
  const quotaTypeString = quotaType.charAt(0).toUpperCase() + quotaType.slice(1).toLowerCase();

  const date = new Date(calendarDay.year, calendarDay.month - 1, calendarDay.day);
  const confirmationStartDate = new Date(date);
  confirmationStartDate.setDate(date.getDate() - 5);
  const confirmationEndDate = new Date(date);
  confirmationEndDate.setDate(date.getDate() - 2);
  const isInConfirmationPeriod = now >= confirmationStartDate && now <= confirmationEndDate;
  const pastConfirmedPeriod = now > confirmationEndDate;
  const confirmationMessage = "If you make this reservation, it will be automatically confirmed and you won't be able to cancel it."

  // Action Handlers
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
        await reservationsApi.confirmReservation(activeReservation.id);
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
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.dataContainer}>
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

            {!otherUserHasConfirmedReservation && calendarDay.status !== ReservationStatus.CONFIRMED && (
              <View style={styles.infoBox}>
                <Text style={styles.description}>
                  Confirmation window: {confirmationStartDate.toLocaleDateString()} - {confirmationEndDate.toLocaleDateString()}
                </Text>

                {!currentUserHasReservation && (
                  <Text style={styles.description}>
                    This reservation consumes a{" "}
                    <Text style={[styles.description, { color: primaryColor, fontWeight: 'bold' }]}>
                      {quotaTypeString} Quota.
                    </Text>
                  </Text>
                )}
              </View>
            )}

            <View style={[styles.infoBox, { backgroundColor: secondaryColor }]}>
              <Text style={styles.subTitle}>Reservation Status</Text>
              <Text style={styles.description}>
                {statusMessage}
              </Text>
            </View>

            {pastConfirmedPeriod && !currentUserHasReservation && !otherUserHasConfirmedReservation && (
              <View style={[styles.infoBox, { backgroundColor: colors.orangeLight }]}>
                <Text style={styles.description}>
                  {confirmationMessage}
                </Text>
              </View>
            )}

            {reservationOwner && calendarDay.status !== ReservationStatus.CONFIRMED && (
              <View style={[styles.infoBox]}>
                {!reservedByCurrentUser ? (
                  <Text style={styles.description}>
                    This date is already reserved by{" "}
                    <Text style={[styles.description, { color: primaryColor, fontWeight: 'bold' }]}>
                      {reservationOwner}.
                    </Text>
                  </Text>
                ) : (
                  <Text style={styles.description}>
                    This date is yours.
                  </Text>
                )}

                {!otherUserHasConfirmedReservation && (
                  <Text style={styles.description}>
                    People in queue:{" "}
                    <Text style={[styles.description, { color: primaryColor, fontWeight: 'bold' }]}>
                      {queueCount}
                    </Text>
                  </Text>                
                )}
              </View>
            )}
          </View>

          <View style={styles.subcontainer}>
            {!currentUserHasReservation && !otherUserHasConfirmedReservation ? (
              <Pressable style={[styles.infoBox, { backgroundColor: primaryColor, alignItems: 'center' }]} onPress={handleMakeReservation}>
                <Text style={[styles.description, { color: 'white' }]}>Make Reservation</Text>
              </Pressable>
            ) : (
              isInConfirmationPeriod && reservedByCurrentUser && calendarDay.status !== ReservationStatus.CONFIRMED && (
                <Pressable style={[styles.infoBox, { backgroundColor: colors.green, alignItems: 'center' }]} onPress={handleConfirmReservation}>
                  <Text style={[styles.description, { color: 'white' }]}>Confirm Reservation</Text>
                </Pressable>
              )
            )}

            {currentUserHasReservation && calendarDay.status !== ReservationStatus.CONFIRMED && (
              <Pressable style={[styles.infoBox, { backgroundColor: colors.redPrimary, alignItems: 'center' }]} onPress={handleCancelReservation}>
                <Text style={[styles.description, { color: 'white' }]}>Cancel Reservation</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
