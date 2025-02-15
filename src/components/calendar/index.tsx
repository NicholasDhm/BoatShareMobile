import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { CalendarHeader } from "../calendar-header";
import { styles } from "./styles";
import { CalendarSubheader } from "../calendar-subheader";
import { generateCalendar } from "./methods";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";
import { CalendarDayProps } from "../../@types/calendar-day";
import { CalendarDay } from "../calendar-day";
import { useInfo } from "../../contexts/info";

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigation = useNavigation<StackNavigatorProps>();
  const { currentBoatReservations } = useInfo();

  function handlePressDay(calendarDay: CalendarDayProps) {
    navigation.navigate("reservationInfo", { calendarDay: calendarDay });
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
        {generateCalendar(currentYear, currentMonth, currentBoatReservations).map((item, index) => (
          <CalendarDay
            key={`${index}`}
            {...item}
            currentMonth={currentMonth}
            onPress={() => handlePressDay(item)}
          />
        ))}
      </View>
    </View>
  );
} 
