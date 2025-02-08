import { StyleSheet } from 'react-native';


export const s = StyleSheet.create({
  dropdown: {
    position: 'relative',
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 200,
  },
  placeholder: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  chevron: {
    transform: [{ rotate: '90deg' }],
  },
  dropdownList: {
    position: 'absolute',
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 40,
    borderRadius: 4,
  },
  dropdownItem: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 200,
  },
  dropdownItemSelected: {
    backgroundColor: 'lightgrey',
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 200,
  },
  first: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  last: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});