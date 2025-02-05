import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CALENDAR_WIDTH = width * 0.8; // 80% of screen width

export const styles = StyleSheet.create({
  container: {
    width: CALENDAR_WIDTH,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 8,
    padding: 16,
  },
  calendarContainer: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  calendarGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayWrapper: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: 1,
  },
});
