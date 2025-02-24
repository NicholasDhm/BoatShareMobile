import React, { useState, useEffect } from "react";
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
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue, runOnJS } from "react-native-reanimated";

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

  function handlePressLeft() {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function generateCalendarDays() {
    return generateCalendar(currentYear, currentMonth, currentBoatReservations).map((item, index) => (
      <CalendarDay
        key={`${index}`}
        {...item}
        currentMonth={currentMonth}
        onPress={() => handlePressDay(item)}
      />
    ))
  }

  // useEffect(() => {
  //   generateCalendarDays();
  // }, [currentBoatReservations]);

  const calendarGesture = useSharedValue(0);

  const onPan = Gesture.Pan().onUpdate(({ translationX }) => {
    calendarGesture.value = translationX;
  }).onEnd(() => {
    if (calendarGesture.value > 80) {
      runOnJS(handlePressLeft)();
    }
    else if (calendarGesture.value < -80) {
      runOnJS(handlePressRight)();
    }
    calendarGesture.value = 0;
  });
  return (
    <GestureDetector gesture={onPan}>
      <View>
        <CalendarHeader
          onRightPress={handlePressRight}
          onLeftPress={handlePressLeft}
          year={currentYear}
          month={currentMonth}
        />

        <CalendarSubheader />

        <View style={styles.calendarGrid}>
          {generateCalendarDays()}
        </View>
      </View>
    </GestureDetector>
  );
} 
