import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { ReservationType } from "../../types/reservation-type";
import { SvgIcon } from "../svg";

export function InfoIcon({ type }: { type: ReservationType }) {
  const backgroundColor =
    type === ReservationType.STANDARD
      ? "blue"
      : type === ReservationType.SUBSTITUTION
      ? "red"
      : type === ReservationType.CONTINGENCY
      ? "orange"
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
