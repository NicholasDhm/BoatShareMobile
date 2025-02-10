import { Text, Pressable, View } from "react-native";
import { CalendarDayProps } from "../../types/calendar-day";
import { styles, getBackgroundColor } from "./styles";
import { Reservation } from "../../types/reservation";
import { useAuth } from "../../contexts/auth";
import { colors } from "../../themes/colors";
import { Dot, Check, Clock2, X } from "lucide-react-native";

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

  return (
    <Pressable
      onPress={onPress}
      style={getReservationStyle()}
    >
      <Text style={styles.dayText}>{day}</Text>
      {day === 10 ? (
        <Check size={12} color={colors.green} strokeWidth={5} />
      ) : (
        day === 19 || day === 22 ? (
          <Clock2 size={10} color={colors.grayDark} strokeWidth={3} />
        ) : (
          day === 23 ? (
            <X size={10} color={colors.redPrimary} strokeWidth={5} />
          ) : (
            <Dot size={10} color={colors.grayDark} strokeWidth={8} />
          )
        )
      )}
    </Pressable>
  );
}
