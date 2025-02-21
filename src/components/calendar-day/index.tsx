import { Text, Pressable, View } from "react-native";
import { CalendarDayProps } from "../../@types/calendar-day";
import { styles, getBackgroundColor } from "./styles";
import { colors } from "../../themes/colors";
import { Dot, Check, Clock2, AlertCircle, X } from "lucide-react-native";
import { ReservationStatus } from "../../@types/reservation-status";

export function CalendarDay({ day, month, year, currentMonth, isReserved, type, status, onPress }: CalendarDayProps) {
  const isCurrentMonth = month === currentMonth;
  let otherUserHasConfirmedReservation = false;

  console.log(day, month, year, isReserved, type, status)

  //Verify if date is past today and disable date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateToCompare = new Date(year, month - 1, day);
  const isPast = dateToCompare < today;

  if (status === null && type === null) {
    otherUserHasConfirmedReservation = true;
  }

  function getReservationStyle() {
    if (isPast && isCurrentMonth) {
      return [styles.pastDays];
    }

    const baseStyles = [
      !isCurrentMonth && styles.otherMonth,
    ];

    if (!isReserved || type === null) {
      return baseStyles;
    }
    const reservationStyle = {
      backgroundColor: getBackgroundColor(type, status !== null),
    };

    return [...baseStyles, reservationStyle];
  }

  function getStatusIcon() {
    if (isPast) {
      return <X size={10} color={colors.grayDark} strokeWidth={0} />;
    }
    if (!isReserved) {
      return <Dot size={10} color={colors.grayDark} strokeWidth={8} />;
    }

    if (type && status === null) {
      return <Dot size={10} color={colors.grayDark} strokeWidth={8} />;
    }

    switch (status) {
      case ReservationStatus.CONFIRMED:
        return <Check size={12} color={colors.green} strokeWidth={5} />;
      case ReservationStatus.PENDING:
        return <Clock2 size={10} color={colors.grayDark} strokeWidth={3} />;
      case ReservationStatus.UNCONFIRMED:
        return <AlertCircle size={12} color={colors.redPrimary} strokeWidth={3} />;
      case null:
        return <X size={10} color={colors.grayDark} strokeWidth={5} />;
      default:
        return <Dot size={10} color={colors.grayDark} strokeWidth={8} />;
    }
  }

  return (
    <View style={styles.dayWrapper}>
      <Pressable
        onPress={onPress}
        disabled={isPast}
        style={[styles.container, getReservationStyle()]}
      >
        <Text style={styles.dayText}>{day}</Text>
        {getStatusIcon()}
      </Pressable>
    </View>
  );
}
