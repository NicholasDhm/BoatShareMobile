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
    color: colors.grayDark,
  },
  otherMonth: {
    opacity: 0.3,
  },
  pastDays: {
    backgroundColor: colors.grayLightSecondary,
  },
});

export const getBackgroundColor = (
  type: ReservationType,
  currentUserReservation: boolean,
): string => {
  if (!currentUserReservation) return colors.tealLightSecondary;
  if (!type) return colors.prussianBlueLightSecondary;

  switch (type) {
    case ReservationType.STANDARD:
      return colors.prussianBlueLightSecondary;
    case ReservationType.SUBSTITUTION:
      return colors.tealLightSecondary;
    case ReservationType.CONTINGENCY:
      return colors.orangeLightSecondary;
    default:
      return colors.prussianBlueLightSecondary;
  }
};