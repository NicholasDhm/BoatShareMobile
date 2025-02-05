import { StyleSheet } from 'react-native';
import { ReservationType } from '../../types/reservation-type';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  otherMonth: {
    opacity: 0.3,
  },
});

// Função auxiliar para determinar a cor de fundo
export const getBackgroundColor = (
  type: ReservationType,
  isMine: boolean,
  isConfirmed: boolean
): string => {
  if (!type) return '#FFFFFF';

  switch (type) {
    case ReservationType.STANDARD:
      return '#E8F5E9';  // very light green
    case ReservationType.SUBSTITUTION:
      return '#E3F2FD';  // very light blue
    case ReservationType.CONTINGENCY:
      return '#FFEBEE';  // very light red
    default:
      return '#FFFFFF';
  }
};
