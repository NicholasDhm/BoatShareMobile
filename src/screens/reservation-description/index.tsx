import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigatorProps, StackRoutes } from "../../routes/app.routes";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../themes/colors";
import { ReservationType } from "../../@types/reservation-type";
import { ReservationStatus } from "../../@types/reservation-status";
import { Reservation } from "../../@types/reservation";
import { useInfo } from "../../contexts/info";
import { StandardDescription } from "./components/standard";
import { SubstitutionDescription } from "./components/substitution";
import { ContingencyDescription } from "./components/contingency";

type ReservationDescriptionRouteProp = RouteProp<StackRoutes, 'reservationDescription'>;

export type ReservationDescriptionProps = {
  reservationsNotReserved?: Reservation[];
  reservationsPending?: Reservation[];
  reservationsUnconfirmed?: Reservation[];
  reservationsConfirmed?: Reservation[];
  reservationsConfirmedByOtherUser?: Reservation[];
};

export function ReservationDescription() {
  const { user } = useInfo();
  const navigation = useNavigation<StackNavigatorProps>();
  const route = useRoute<ReservationDescriptionRouteProp>();
  const reservationType = route.params.reservationType;
  const primaryColor = reservationType === ReservationType.STANDARD
    ? colors.prussianBluePrimary
    : reservationType === ReservationType.SUBSTITUTION
      ? colors.tealPrimary
      : reservationType === ReservationType.CONTINGENCY
        ? colors.orangePrimary
        : 'transparent';

  function handleGoBack() {
    navigation.goBack();
  }

  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const reservationNotReserved: Reservation[] = [];
  const reservationPending: Reservation[] = [
    {
      id: user!.id,
      contractId: 'contract1',
      createdAt: new Date().toISOString(),
      date: `${year}-${month}-${day}`,
      status: ReservationStatus.PENDING,
      type: reservationType,
    },
  ];
  const reservationUnconfirmed: Reservation[] = [
    {
      id: user!.id,
      contractId: 'contract2',
      createdAt: new Date().toISOString(),
      date: `${year}-${month}-${day}`,
      status: ReservationStatus.UNCONFIRMED,
      type: reservationType,
    },
  ];
  const reservationConfirmed: Reservation[] = [
    {
      id: user!.id,
      contractId: 'contract3',
      createdAt: new Date().toISOString(),
      date: `${year}-${month}-${day}`,
      status: ReservationStatus.CONFIRMED,
      type: reservationType,
    },
  ];
  const reservationConfirmedByOtherUser: Reservation[] = [
    {
      id: '112431412',
      contractId: 'contract4',
      createdAt: new Date().toISOString(),
      date: `${year}-${month}-${day}`,
      status: ReservationStatus.CONFIRMED,
      type: reservationType,
    },
  ];

  function renderReservationInfo() {
    switch (reservationType) {
      case ReservationType.STANDARD:
        return (
          <StandardDescription
            reservationsNotReserved={reservationNotReserved}
            reservationsPending={reservationPending}
            reservationsUnconfirmed={reservationUnconfirmed}
            reservationsConfirmed={reservationConfirmed}
          />
        );
      case ReservationType.SUBSTITUTION:
        return (
          <SubstitutionDescription
            reservationsNotReserved={reservationNotReserved}
            reservationsPending={reservationPending}
            reservationsUnconfirmed={reservationUnconfirmed}
            reservationsConfirmed={reservationConfirmed}
            reservationsConfirmedByOtherUser={reservationConfirmedByOtherUser}
          />
        );
      case ReservationType.CONTINGENCY:
        return (
          <ContingencyDescription
            reservationsNotReserved={reservationNotReserved}
            reservationsPending={reservationPending}
            reservationsUnconfirmed={reservationUnconfirmed}
            reservationsConfirmed={reservationConfirmed}
          />
        );
      default:
        return null;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primaryColor }}>
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Pressable onPress={handleGoBack}>
            <ChevronLeft size={30} color={"black"} />
          </Pressable>
          <Text style={styles.title}>Reservation Types</Text>
        </View>

        { renderReservationInfo() }
      </ScrollView>
    </SafeAreaView>
  );
}