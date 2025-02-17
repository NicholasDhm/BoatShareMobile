import { Text, Pressable, View } from "react-native";
import { CalendarDayProps } from "../../@types/calendar-day";
import { styles, getBackgroundColor } from "./styles";
import { Reservation } from "../../@types/reservation";
import { colors } from "../../themes/colors";
import { Dot, Check, Clock2, AlertCircle } from "lucide-react-native";
import { ReservationStatus } from "../../@types/reservation-status";
import { useInfo } from "../../contexts/info";
<<<<<<< HEAD

function parseDate(dateString: string) {
  if (!dateString) return 0;
  const [date, time] = dateString.split(' ');
  return new Date(`${date}T${time}Z`).getTime();
};


=======
import { usersApi } from "../../apis/usersApi";
>>>>>>> dd5f030d9c9d65bec2906d51287f4f8f524dd903
export function getFirstReservation(reservations: Reservation[]) {
  if (!reservations || reservations.length === 0) return null;
  return reservations.reduce((earliest, current) => {
    return parseDate(earliest.createdAt) < parseDate(current.createdAt)
      ? earliest
      : current;
  });
}

export function CalendarDay({ day, month, year, reservations, currentMonth, onPress }: CalendarDayProps) {
  const { user, currentUserReservations } = useInfo();
  const today = new Date();
  const isToday =
    today.getDate() === day &&
    today.getMonth() + 1 === month &&
    today.getFullYear() === year;

  const isOtherMonth = month !== currentMonth;
  const firstReservation = getFirstReservation(reservations);
  const currentUserHasReservation = reservations.some(r => currentUserReservations.some(cur => cur.id === r.id));
  const hasRes = currentUserHasReservation ? true : false;

  function getReservationStyle() {
    const baseStyles = [
      isOtherMonth && styles.otherMonth,
    ];

    if (!firstReservation || !user) {
      return baseStyles;
    }

    const reservationStyle = {
      backgroundColor: getBackgroundColor(firstReservation.type, hasRes),
    };

    return [...baseStyles, reservationStyle];
  }

  function getStatusIcon() {
    if (!firstReservation || !hasRes) {
      return <Dot size={10} color={colors.grayDark} strokeWidth={8} />;
    }

    switch (firstReservation.status) {
      case ReservationStatus.CONFIRMED:
        return <Check size={12} color={colors.green} strokeWidth={5} />;
      case ReservationStatus.PENDING:
        return <Clock2 size={10} color={colors.grayDark} strokeWidth={3} />;
      case ReservationStatus.UNCONFIRMED:
        return <AlertCircle size={12} color={colors.redPrimary} strokeWidth={3} />;
      default:
        return <Dot size={10} color={colors.grayDark} strokeWidth={8} />;
    }
  }

  return (
    <View style={styles.dayWrapper}>
      <Pressable
        onPress={onPress}
        style={[styles.container, getReservationStyle()]}
      >
        <Text style={styles.dayText}>{day}</Text>
        {getStatusIcon()}
      </Pressable>
    </View>
  );
}
