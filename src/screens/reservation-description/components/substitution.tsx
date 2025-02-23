import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";
import { colors } from "../../../themes/colors";
import { CalendarDay } from "../../../components/calendar-day";
import { Reservation } from "../../../@types/reservation";
import { ReservationDescriptionProps } from "..";
import { ReservationType } from "../../../@types/reservation-type";
import { ReservationStatus } from "../../../@types/reservation-status";

export function SubstitutionDescription({
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
        <Text style={styles.subTitle}>Substitution Reservation</Text>
        <Text style={styles.description}>
          A substitution reservation places you in line to replace a confirmed
          reservation. You'll get that reservation if the owner decides to
          cancel it. This reservation type consumes a{" "}
          <Text style={[styles.description, { color: colors.tealPrimary, fontWeight: 'bold' }]}>
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
            type={ReservationType.SUBSTITUTION}
            status={ReservationStatus.PENDING}
            reservations={reservationsPending}
            currentMonth={month}
            onPress={() => { } } isReserved={true}
          />
          <View style={[styles.column]}>
            <Text style={styles.reservationTypeTitle}>Pending / in Queue</Text>
            <Text style={styles.description}>Day with a Pending Substitution Reservation.</Text>
          </View>
        </View>

        <View style={styles.reservationType}>
          <CalendarDay
            day={day}
            month={month}
            year={year}
            type={ReservationType.SUBSTITUTION}
            status={ReservationStatus.UNCONFIRMED}
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
            type={ReservationType.SUBSTITUTION}
            status={ReservationStatus.CONFIRMED}
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
}