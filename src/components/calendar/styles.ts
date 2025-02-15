import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: "100%",

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
    gap: 4,
  },
});
