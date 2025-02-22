import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";
import { colors } from "../../../themes/colors";
import { CalendarDay } from "../../../components/calendar-day";
import { Reservation } from "../../../@types/reservation";
import { ReservationDescriptionProps } from "..";
import { ReservationType } from "../../../@types/reservation-type";
import { ReservationStatus } from "../../../@types/reservation-status";

export function ContingencyDescription({
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
        <Text style={styles.subTitle}>Contingency Reservation</Text>
        <Text style={styles.description}>
          The contingency reservation is a special type of reservation that
          occurs when the boat is free for the day and it's after 6:00 AM. This
          reservation type consumes a{" "}
          <Text style={[styles.description, { color: colors.orangePrimary, fontWeight: 'bold' }]}>
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
            type={ReservationType.CONTINGENCY}
            status={ReservationStatus.CONFIRMED}
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
}