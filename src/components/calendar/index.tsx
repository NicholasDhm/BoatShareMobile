import React, { useState } from "react";
import { View } from "react-native";
import { CalendarHeader } from "../calendar-header";
import { styles } from "./styles";
import { CalendarSubheader } from "../calendar-subheader";
import { generateCalendar } from "./methods";
import { Reservation } from "../../@types/reservation";
import { ReservationType } from "../../@types/reservation-type";
import { ReservationStatus } from "../../@types/reservation-status";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";
import { CalendarDayProps } from "../../@types/calendar-day";
import { CalendarDay } from "../calendar-day";


// MONTH DAY YEAR
const reservationDict: { [key: string]: Reservation[] } = {
  "2/10/2025": [
    {
      reservationId: "9266b22d-d455-4e1c-8739-190d4fd77fd6",
      userBoatId: "1",
      date: "10/02/2025",
      createdAtDate: "02/01/2025 7:24:20 PM",
      type: ReservationType.CONTINGENCY,
      status: ReservationStatus.CONFIRMED,
    },
  ],
  "2/19/2025": [
    {
      reservationId: "9266b22d-d455-4e1c-8739-190d4fd77fd6",
      userBoatId: "2",
      date: "19/02/2025",
      createdAtDate: "02/01/2025 7:24:20 PM",
      type: ReservationType.STANDARD,
      status: ReservationStatus.UNCONFIRMED,
    },
  ],
  "2/22/2025": [
    {
      reservationId: "9266b22d-d455-4e1c-8739-190d4fd77fd6",
      userBoatId: "1",
      date: "22/02/2025",
      createdAtDate: "02/01/2025 7:24:20 PM",
      type: ReservationType.STANDARD,
      status: ReservationStatus.UNCONFIRMED,
    },
  ],
  "2/23/2025": [
    {
      reservationId: "9266b22d-d455-4e1c-8739-190d4fd77fd6",
      userBoatId: "1",
      date: "23/02/2025",
      createdAtDate: "02/01/2025 7:24:06 PM",
      type: ReservationType.STANDARD,
      status: ReservationStatus.UNCONFIRMED,
    },
    {
      reservationId: "4ca96f74-d06b-47a3-8bab-bebe2fb59037",
      userBoatId: "1",
      date: "23/02/2025",
      createdAtDate: "02/01/2025 7:24:42 PM",
      type: ReservationType.SUBSTITUTION,
      status: ReservationStatus.PENDING,
    },
  ],
};


export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigation = useNavigation<StackNavigatorProps>();

  function handlePressDay(item: CalendarDayProps) {
    navigation.navigate("reservationInfo", { calendarDay: item });
  }


  function handlePressRight() {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  function handleLeftRight() {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }


  function fetchReservations(boatId: string, reservation: Reservation) {
    // setReservations(prevReservations => ({
    //   ...prevReservations,
    //   [boatId]: [...(prevReservations[boatId] || []), reservation]
    // }));
  }

  return (
    <View style={styles.container}>
      <CalendarHeader
        onRightPress={handlePressRight}
        onLeftPress={handleLeftRight}
        year={currentYear}
        month={currentMonth}
      />

      <CalendarSubheader />

      <View style={styles.calendarGrid}>
        {generateCalendar(currentYear, currentMonth, reservationDict).map((item, index) => (
          <View style={styles.dayWrapper} key={`${index}`}>
            <CalendarDay
              {...item}
              currentMonth={currentMonth}
              onPress={() => handlePressDay(item)}
            />
          </View>
        ))}
      </View>
    </View>
  );
} 
