import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { CalendarHeader } from "../calendar-header";
import { styles } from "./styles";
import { CalendarSubheader } from "../calendar-subheader";
import { generateCalendar } from "./methods";
import { Reservation } from "../../@types/reservation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";
import { CalendarDayProps } from "../../@types/calendar-day";
import { CalendarDay } from "../calendar-day";

interface CalendarProps {
  reservations: Reservation[];
  userBoatId: string;
}

export function Calendar({ reservations, userBoatId }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigation = useNavigation<StackNavigatorProps>();

  function handlePressDay(item: CalendarDayProps) {
    navigation.navigate("reservationInfo", { calendarDay: item, userBoatId: userBoatId });
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
        {generateCalendar(currentYear, currentMonth, reservations).map((item, index) => (
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
