import { StyleSheet } from 'react-native';
import { ReservationType } from '../../types/reservation-type';

export const styles = StyleSheet.create({
  container: {
    height: 48,
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 18,
  },
  defaultDay: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  }
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
      return isMine 
        ? (isConfirmed ? '#E8F5E9' : '#C8E6C9')
        : (isConfirmed ? '#E3F2FD' : '#BBDEFB');
    case ReservationType.SUBSTITUTION:
      return '#FFF3E0';
    case ReservationType.CONTINGENCY:
      return '#FFEBEE';
    default:
      return '#FFFFFF';
  }
};
