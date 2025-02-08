import { View, Text, Pressable } from "react-native";
import { CalendarDayProps } from "../../types/calendar-day";
import { styles, getBackgroundColor } from "./styles";
import { ReservationStatus } from "../../types/reservation-status";
import { Reservation } from "../../types/reservation";
import { useAuth } from "../../contexts/auth";

export function getFirstReservation(reservations: Reservation[]) {
  if (reservations?.length === 0) return null;
  return reservations?.reduce((earliest, current) => {
    return new Date(earliest.createdAtIsoDate) <
      new Date(current.createdAtIsoDate)
      ? earliest
      : current;
  });
}

export function CalendarDay({ day, month, year, reservations, currentMonth, onPress }: CalendarDayProps) {
  const today = new Date();
  const isToday = 
    today.getDate() === day && 
    today.getMonth() + 1 === month && 
    today.getFullYear() === year;
  const { user } = useAuth();
  
  const isOtherMonth = month !== currentMonth;


  const firstReservation = getFirstReservation(reservations);
  const isMine = firstReservation ? firstReservation.userId === user?.id : false;
  const isConfirmed = firstReservation ? firstReservation.status === ReservationStatus.Confirmed : false;

  function getReservationStyle() {
    const baseStyles = [
      styles.container,
      isOtherMonth && styles.otherMonth
    ];

    if (!firstReservation) {
      return baseStyles;
    }

    const reservationStyle = {
      backgroundColor: getBackgroundColor(firstReservation.type, isMine, isConfirmed),
    };


    return [...baseStyles, reservationStyle];
  }

  return (
    <Pressable
      onPress={onPress}
      style={getReservationStyle()}
    >
      <Text style={styles.dayText}>{day}</Text>
    </Pressable>
  );
}
