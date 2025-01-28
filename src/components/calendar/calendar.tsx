import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysOfMonth = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
// const weeks = [];
const week = [1,2,3,4,5,6,7]

// function getWeeks() {
//   for (let i = 0; i < daysOfMonth.length; i += 7) {
//     weeks.push(daysOfMonth.slice(i, i + 7));
//   }
//   return weeks;
// }

export function Calendar() {
  return (
    <View style={styles.container}>
      <View style={styles.week}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.text}>{day}</Text>
        ))}
      </View>
      <Text style={styles.text}>Calendar Component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  week: {
    display: 'flex',
    flexDirection: 'row',

  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});