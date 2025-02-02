import React, { useState } from "react";
import { FlatList } from "react-native";
import { CalendarHeader } from "../calendar-header";
import { CalendarDay } from "../calendar-day";
import { Container } from "./styles";
import { CalendarSubheader } from "../calendar-subheader";
import { generateCalendar } from "./methods";
import { Reservation } from "../../types/reservation";

const reservationDict: { [key: string]: Reservation[] } = {
  "2/2/2025": [
    {
      reservationId: "9266b22d-d455-4e1c-8739-190d4fd77fd6",
      userId: "a8e6596f-2517-4b18-a866-48fa9eb14d41",
      boatId: "1",
      year: 2025,
      month: 2,
      day: 2,
      status: "Confirmed",
      type: "Contingency",
      createdAtIsoDate: "02/01/2025 7:24:20 PM",
    },
  ],
  "3/2/2025": [
    {
      reservationId: "9266b22d-d455-4e1c-8739-190d4fd77fd6",
      userId: "a8e6596f-2517-4b18-a866-48fa9eb14d41",
      boatId: "1",
      year: 2025,
      month: 2,
      day: 2,
      status: "Confirmed",
      type: "Contingency",
      createdAtIsoDate: "02/01/2025 7:24:20 PM",
    },
  ],
  "2/3/2025": [
    {
      reservationId: "7b58e2f7-5ed5-4ed9-a0cc-0892fd5a4c69",
      userId: "543ee669-0838-48d6-a22d-7717a8e4a410",
      boatId: "1",
      year: 2025,
      month: 2,
      day: 3,
      status: "Unconfirmed",
      type: "Standard",
      createdAtIsoDate: "02/01/2025 7:24:06 PM",
    },
    {
      reservationId: "4ca96f74-d06b-47a3-8bab-bebe2fb59037",
      userId: "a8e6596f-2517-4b18-a866-48fa9eb14d41",
      boatId: "1",
      year: 2025,
      month: 2,
      day: 3,
      status: "Pending",
      type: "Substitution",
      createdAtIsoDate: "02/01/2025 7:24:42 PM",
    },
  ],
};

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

  // function fetchReservations(boatId: string, reservation: Reservation) {
  //   // setReservations(prevReservations => ({
  //   //   ...prevReservations,
  //   //   [boatId]: [...(prevReservations[boatId] || []), reservation]
  //   // }));
  // }

  return (
    <Container>
      <CalendarHeader
        onRightPress={handlePressRight}
        onLeftPress={handleLeftRight}
        year={currentYear}
        month={currentMonth}
      />
      <CalendarSubheader />
      <FlatList
        data={generateCalendar(currentYear, currentMonth, reservationDict)}
        renderItem={({ item }) => <CalendarDay {...item} />}
        keyExtractor={(item, index) =>
          `${item.year}-${item.month}-${item.day}-${index}`
        }
        numColumns={7}
        style={{ width: "100%" }}
      />
    </Container>
  );
}