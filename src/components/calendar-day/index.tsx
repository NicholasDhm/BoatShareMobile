import { Text, Pressable, View } from "react-native";
import { CalendarDayProps } from "../../@types/calendar-day";
import { styles, getBackgroundColor } from "./styles";
import { Reservation } from "../../@types/reservation";
import { colors } from "../../themes/colors";
import { Dot, Check, Clock2, X } from "lucide-react-native";
import { ReservationStatus } from "../../@types/reservation-status";

export function getFirstReservation(reservations: Reservation[]) {
  if (!reservations || reservations.length === 0) return null;
  return reservations.reduce((earliest, current) => {
    return new Date(earliest.date) < new Date(current.date)
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

  const isOtherMonth = month !== currentMonth;
  const firstReservation = getFirstReservation(reservations);

  function getReservationStyle() {
    const baseStyles = [
      styles.container,
      isOtherMonth && styles.otherMonth,
    ];

    if (!firstReservation) {
      return baseStyles;
    }

    const reservationStyle = {
      backgroundColor: getBackgroundColor(firstReservation.type),
    };

    return [...baseStyles, reservationStyle];
  }

  function getStatusIcon() {
    if (!firstReservation) {
      return <Dot size={10} color={colors.grayDark} strokeWidth={8} />;
    }

    switch (firstReservation.status) {
      case ReservationStatus.CONFIRMED:
        return <Check size={12} color={colors.green} strokeWidth={5} />;
      case ReservationStatus.PENDING:
        return <Clock2 size={10} color={colors.grayDark} strokeWidth={3} />;
      case ReservationStatus.UNCONFIRMED:
        return <X size={10} color={colors.redPrimary} strokeWidth={5} />;
      default:
        return <Dot size={10} color={colors.grayDark} strokeWidth={8} />;
    }
  }

  return (
    <Pressable
      onPress={onPress}
      style={getReservationStyle()}
    >
      <Text style={styles.dayText}>{day}</Text>
      {getStatusIcon()}
    </Pressable>
  );
}
