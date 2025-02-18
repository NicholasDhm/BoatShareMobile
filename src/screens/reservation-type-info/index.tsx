import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigatorProps, StackRoutes } from "../../routes/app.routes";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../themes/colors";
import { ReservationType } from "../../@types/reservation-type";
import { CalendarDay } from "../../components/calendar-day";
import { ReservationStatus } from "../../@types/reservation-status";
import { Reservation } from "../../@types/reservation";
import { useInfo } from "../../contexts/info";

type ReservationTypeInfoRouteProp = RouteProp<StackRoutes, 'reservationTypeInfo'>;

export function ReservationTypeInfo() {
  const { user } = useInfo();
  const navigation = useNavigation<StackNavigatorProps>();
  const route = useRoute<ReservationTypeInfoRouteProp>();
  const reservationType = route.params.reservationType;
  const primaryColor = reservationType === ReservationType.STANDARD
    ? colors.bluePrimary
    : reservationType === ReservationType.SUBSTITUTION
      ? colors.redPrimary
      : reservationType === ReservationType.CONTINGENCY
        ? colors.orangePrimary
        : 'transparent';

  function handleGoBack() {
    navigation.goBack();
  }

  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const reservationsNotReserved: Reservation[] = [];
  const reservationsPending: Reservation[] = [
    {
      id: user!.id,
      contractId: 'contract1',
      createdAt: new Date().toISOString(),
      date: `${year}-${month}-${day}`,
      status: ReservationStatus.PENDING,
      type: reservationType,
    },
  ];
  const reservationsUnconfirmed: Reservation[] = [
    {
      id: user!.id,
      contractId: 'contract2',
      createdAt: new Date().toISOString(),
      date: `${year}-${month}-${day}`,
      status: ReservationStatus.UNCONFIRMED,
      type: reservationType,
    },
  ];
  const reservationsConfirmed: Reservation[] = [
    {
      id: user!.id,
      contractId: 'contract3',
      createdAt: new Date().toISOString(),
      date: `${year}-${month}-${day}`,
      status: ReservationStatus.CONFIRMED,
      type: reservationType,
    },
  ];

  function renderReservationInfo() {
    switch (reservationType) {
      case ReservationType.STANDARD:
        return (
          <>
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

            <View style={[styles.infoBox, styles.column, styles.gap_10]}>
              <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsNotReserved}
                  currentMonth={month}
                  onPress={() => { } } isReserved={false}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Not Reserved</Text>
                  <Text style={styles.description}>Day without any reservations.</Text>
                </View>
              </View>

              <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsPending}
                  currentMonth={month}
                  onPress={() => { } } isReserved={true}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Pending</Text>
                  <Text style={styles.description}>Day with a Pending Standard Reservation.</Text>
                </View>
              </View>

              <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsUnconfirmed}
                  currentMonth={month}
                  onPress={() => { } } isReserved={true}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Unconfirmed</Text>
                  <Text style={styles.description}>Day with an Unconfirmed Standard Reservation.</Text>
                </View>
              </View>

              <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsConfirmed}
                  currentMonth={month}
                  onPress={() => { } } isReserved={true}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Confirmed</Text>
                  <Text style={styles.description}>Day with a Confirmed Standard Reservation.</Text>
                </View>
              </View>
            </View>
          </>
        );
      case ReservationType.SUBSTITUTION:
        return (
          <>
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

            <View style={[styles.infoBox, styles.column, styles.gap_10]}>
              <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsNotReserved}
                  currentMonth={month}
                  onPress={() => { } } isReserved={false}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Not Reserved</Text>
                  <Text style={styles.description}>Day without any reservations.</Text>
                </View>
              </View>

              <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsPending}
                  currentMonth={month}
                  onPress={() => { } } isReserved={true}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Pending</Text>
                  <Text style={styles.description}>Day with a Pending Substitution Reservation.</Text>
                </View>
              </View>

              <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsUnconfirmed}
                  currentMonth={month}
                  onPress={() => { } } isReserved={true}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Unconfirmed</Text>
                  <Text style={styles.description}>Day with an Unconfirmed Substitution Reservation.</Text>
                </View>
              </View>

              <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsConfirmed}
                  currentMonth={month}
                  onPress={() => { } } isReserved={true}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Confirmed</Text>
                  <Text style={styles.description}>Day with a Confirmed Substitution Reservation.</Text>
                </View>
              </View>
            </View>
          </>
        );
      case ReservationType.CONTINGENCY:
        return (
          <>
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

            <View style={[styles.infoBox, styles.column, styles.gap_10]}>
              <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsNotReserved}
                  currentMonth={month}
                  onPress={() => { } } isReserved={false}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Not Reserved</Text>
                  <Text style={styles.description}>Day without any reservations.</Text>
                </View>
              </View>

              {/* <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsPending}
                  currentMonth={month}
                  onPress={() => { } } isReserved={true}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Pending</Text>
                  <Text style={styles.description}>Day with a Pending Contingency Reservation.</Text>
                </View>
              </View> */}

              {/* <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsUnconfirmed}
                  currentMonth={month}
                  onPress={() => { } } isReserved={true}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Unonfirmed</Text>
                  <Text style={styles.description}>Day with an Unconfirmed Contingency Reservation.</Text>
                </View>
              </View> */}

              <View style={styles.reservationType}>
                <CalendarDay
                  day={day}
                  month={month}
                  year={year}
                  reservations={reservationsConfirmed}
                  currentMonth={month}
                  onPress={() => { } } isReserved={true}
                />
                <View style={[styles.column]}>
                  <Text style={styles.reservationTypeTitle}>Confirmed</Text>
                  <Text style={styles.description}>Day with a Confirmed Contingency Reservation.</Text>
                </View>
              </View>
            </View>
          </>
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
            <Text style={{fontWeight: 'bold'}}>Blue:</Text> Available{"\n"}
            <Text style={{fontWeight: 'bold'}}>Red:</Text> Available for Substitution{"\n"}
            <Text style={{fontWeight: 'bold'}}>Yellow:</Text> Available for Contingency
            {"\n"}
            <Text style={{fontWeight: 'bold'}}>Red dot:</Text> Confirmation Needed{"\n"}
            <Text style={{fontWeight: 'bold'}}>Green dot:</Text> Confirmed Reservation
            {"\n"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}