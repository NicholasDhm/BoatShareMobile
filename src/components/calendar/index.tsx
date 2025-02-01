import React, { useState } from "react";
import { FlatList } from "react-native";
import { CalendarHeader } from "../calendar-header";
import { CalendarDay } from "../calendar-day";
import { Container } from "./styles";
import { CalendarSubheader } from "../calendar-subheader";
import { Reservation } from "../../types/reservation";
import { generateCalendar } from "./methods";

// reservations: { [key: string]: IReservation[] } = {};
// method to return all reservations for a given boat that aren't of type legacy

const reservations = [
  {
      "reservationId": "9266b22d-d455-4e1c-8739-190d4fd77fd6",
      "userId": "a8e6596f-2517-4b18-a866-48fa9eb14d41",
      "boatId": "1",
      "year": 2025,
      "month": 2,
      "day": 1,
      "status": "Confirmed",
      "type": "Contingency",
      "createdAtIsoDate": "02/01/2025 7:24:20 PM"
  },
  {
      "reservationId": "2886a28a-fc0a-4970-bbfd-a4b989bdd3cc",
      "userId": "c89bcb19-08f4-43f4-b1b7-7508e18d3104",
      "boatId": "ce9fa110-2dc1-448f-90cd-675a7ab27c9b",
      "year": 2025,
      "month": 2,
      "day": 2,
      "status": "Unconfirmed",
      "type": "Standard",
      "createdAtIsoDate": "01/28/2025 10:12:03 PM"
  },
  {
      "reservationId": "004ace60-a40e-4ae2-bbc5-9fca3c532792",
      "userId": "a8e6596f-2517-4b18-a866-48fa9eb14d41",
      "boatId": "1",
      "year": 2025,
      "month": 2,
      "day": 5,
      "status": "Pending",
      "type": "Standard",
      "createdAtIsoDate": "02/01/2025 7:24:16 PM"
  },
  {
      "reservationId": "ee4466ee-40a3-4025-a395-1016b84a0093",
      "userId": "543ee669-0838-48d6-a22d-7717a8e4a410",
      "boatId": "1",
      "year": 2025,
      "month": 2,
      "day": 2,
      "status": "Unconfirmed",
      "type": "Standard",
      "createdAtIsoDate": "02/01/2025 7:24:04 PM"
  },
  {
      "reservationId": "7b58e2f7-5ed5-4ed9-a0cc-0892fd5a4c69",
      "userId": "543ee669-0838-48d6-a22d-7717a8e4a410",
      "boatId": "1",
      "year": 2025,
      "month": 2,
      "day": 3,
      "status": "Unconfirmed",
      "type": "Standard",
      "createdAtIsoDate": "02/01/2025 7:24:06 PM"
  },
  {
      "reservationId": "1c8f7d7d-3bcf-4814-bdb5-28239d77b545",
      "userId": "a8e6596f-2517-4b18-a866-48fa9eb14d41",
      "boatId": "1",
      "year": 2025,
      "month": 2,
      "day": 6,
      "status": "Pending",
      "type": "Standard",
      "createdAtIsoDate": "02/01/2025 7:24:18 PM"
  },
  {
      "reservationId": "c2862980-f758-4796-bd75-828e438251a3",
      "userId": "a8e6596f-2517-4b18-a866-48fa9eb14d41",
      "boatId": "1",
      "year": 2025,
      "month": 1,
      "day": 31,
      "status": "Unconfirmed",
      "type": "Standard",
      "createdAtIsoDate": "01/28/2025 11:57:18 PM"
  },
  {
    "reservationId": "4ca96f74-d06b-47a3-8bab-bebe2fb59037",
    "userId": "a8e6596f-2517-4b18-a866-48fa9eb14d41",
    "boatId": "1",
    "year": 2025,
    "month": 2,
    "day": 3,
    "status": "Pending",
    "type": "Substitution",
    "createdAtIsoDate": "02/01/2025 7:24:42 PM"
  }
]

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [reservations, setReservations] = useState<{[key: string]: Reservation[] }>({});

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
    <Container>
      <CalendarHeader
        onRightPress={handlePressRight}
        onLeftPress={handleLeftRight}
        year={currentYear}
        month={currentMonth}
      />
      <CalendarSubheader />
      <FlatList
        data={generateCalendar(currentYear, currentMonth)}
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
