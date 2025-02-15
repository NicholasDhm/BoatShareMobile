import { StyleSheet } from 'react-native';
import { ReservationType } from '../../@types/reservation-type';
import { colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  dayWrapper: {
    width: `${92 / 7}%`,
    aspectRatio: 0.9,
    // padding: 1,
    borderWidth: 1.2,
    borderColor: colors.grayBorder,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    gap: 4,
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

export const getBackgroundColor = (
  type: ReservationType,
): string => {
  if (!type) return colors.blueLightSecondary;

  switch (type) {
    case ReservationType.STANDARD:
      return colors.blueLightSecondary;
    case ReservationType.SUBSTITUTION:
      return colors.redLightSecondary;
    case ReservationType.CONTINGENCY:
      return colors.orangeLightSecondary;
    default:
      return colors.blueLightSecondary;
  }
};