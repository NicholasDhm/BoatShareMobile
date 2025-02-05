import { StyleSheet } from 'react-native';

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
});

// Função auxiliar para determinar a cor de fundo
export const getBackgroundColor = (reservationType: string, isMine: boolean, isConfirmed: boolean) => {
  if (reservationType && !isMine) return 'red';
  if (reservationType && isMine && isConfirmed) return 'blue';
  if (reservationType && isMine && !isConfirmed) return 'orange';
  return 'white';
};
