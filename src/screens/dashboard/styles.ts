import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  subcontainer: {
    height: '75%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  dropdown: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
  },
});