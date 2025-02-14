import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { ReservationType } from "../../@types/reservation-type";
import { SvgIcon } from "../svg";
import { colors } from "../../themes/colors";

export function InfoIcon({ type }: { type: string }) {
  const backgroundColor =
    type === ReservationType.STANDARD
      ? colors.bluePrimary
      : type === ReservationType.SUBSTITUTION
        ? colors.redPrimary
        : type === ReservationType.CONTINGENCY
          ? colors.orangePrimary
          : "transparent";

  return (
    <View style={[styles.container]}>
      <SvgIcon
        icon="boat"
        size={20}
        color={backgroundColor}
      />
      <Text style={[styles.text]}>{type}</Text>
    </View>
  );
}
