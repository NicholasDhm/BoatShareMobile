import React, { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { CalendarHeader } from "../calendar-header";
import { CalendarDay } from "../calendar-day";
import { styles } from "./styles";
import { CalendarSubheader } from "../calendar-subheader";
import { generateCalendar } from "./methods";
import { Reservation } from "../../types/reservation";
import { ReservationType } from "../../types/reservation-type";
import { ReservationStatus } from "../../types/reservation-status";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";
import { CalendarDayProps } from "../../types/calendar-day";
import { InfoIcon } from "../info-icon";


// MONTH DAY YEAR
const reservationDict: { [key: string]: Reservation[] } = {
  "2/2/2025": [
    {
      reservationId: "9266b22d-d455-4e1c-8739-190d4fd77fd6",
      userId: "1",
      boatId: "1",
      year: 2025,
      month: 2,
      day: 2,
      status: ReservationStatus.Confirmed,
      type: ReservationType.CONTINGENCY,
      createdAtIsoDate: "02/01/2025 7:24:20 PM",
    },
  ],
  "6/2/2025": [
    {
      reservationId: "9266b22d-d455-4e1c-8739-190d4fd77fd6",
      userId: "2",
      boatId: "1",
      year: 2025,
      month: 6,
      day: 2,
      status: ReservationStatus.Unconfirmed,
      type: ReservationType.STANDARD,
      createdAtIsoDate: "02/01/2025 7:24:20 PM",
    },
  ],
  "2/4/2025": [
    {
      reservationId: "9266b22d-d455-4e1c-8739-190d4fd77fd6",
      userId: "1",
      boatId: "1",
      year: 2025,
      month: 2,
      day: 4,
      status: ReservationStatus.Unconfirmed,
      type: ReservationType.STANDARD,
      createdAtIsoDate: "02/01/2025 7:24:20 PM",
    },
  ],
  "2/3/2025": [
    {
      reservationId: "7b58e2f7-5ed5-4ed9-a0cc-0892fd5a4c69",
      userId: "1",
      boatId: "1",
      year: 2025,
      month: 2,
      day: 3,
      status: ReservationStatus.Unconfirmed,
      type: ReservationType.STANDARD,

      createdAtIsoDate: "02/01/2025 7:24:06 PM",
    },
    {
      reservationId: "4ca96f74-d06b-47a3-8bab-bebe2fb59037",
      userId: "2",
      boatId: "1",
      year: 2025,
      month: 2,
      day: 3,
      status: ReservationStatus.Pending,
      type: ReservationType.SUBSTITUTION,
      createdAtIsoDate: "02/01/2025 7:24:42 PM",
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
          <View style={styles.dayWrapper} key={`${item.year}-${item.month}-${item.day}-${index}`}>
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
