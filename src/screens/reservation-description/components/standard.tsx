import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";
import { colors } from "../../../themes/colors";
import { CalendarDay } from "../../../components/calendar-day";
import { ReservationDescriptionProps } from "..";
import { ReservationType } from "../../../@types/reservation-type";
import { ReservationStatus } from "../../../@types/reservation-status";

export function StandardDescription({
  reservationsNotReserved,
  reservationsPending,
  reservationsUnconfirmed,
  reservationsConfirmed,
  reservationsConfirmedByOtherUser,
}: ReservationDescriptionProps) {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  return (
    <>
      <View style={styles.infoBox}>
        <Text style={styles.subTitle}>Standard Reservation</Text>
        <Text style={styles.description}>
          This type of reservation allows you to book a boat for the specified
          date. It is the most common type of reservation and consumes a{" "}
          <Text style={[styles.description, { color: colors.prussianBluePrimary, fontWeight: 'bold' }]}>
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
            type={null}
            status={null}
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
            type={null}
            status={null}
            reservations={reservationsConfirmedByOtherUser}
            currentMonth={month}
            onPress={() => { } } isReserved={true}
          />
          <View style={[styles.column]}>
            <Text style={styles.reservationTypeTitle}>Confirmed by Another User</Text>
            <Text style={styles.description}>Day with a Reservation Confirmed by another user.</Text>
          </View>
        </View>

        <View style={styles.reservationType}>
          <CalendarDay
            day={day}
            month={month}
            year={year}
            type={ReservationType.STANDARD}
            status={ReservationStatus.PENDING}
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
            type={ReservationType.STANDARD}
            status={ReservationStatus.UNCONFIRMED}
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
            type={ReservationType.STANDARD}
            status={ReservationStatus.CONFIRMED}
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
}