import { Pressable, View, Text } from "react-native";
import { Calendar } from "../../components/calendar";
import { InfoIcon } from "../../components/info-icon";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { ReservationType } from "../../@types/reservation-type";
import { StackNavigatorProps } from "../../routes/app.routes";
import { DropdownList } from "../../components/dropdown-list";
import { useEffect } from "react";
import { boatsApi } from "../../apis/boatsApi";
import { useInfo } from "../../contexts/info";
import { contractsApi } from "../../apis/contractsApi";

const list: { type: ReservationType }[] = [
  { type: ReservationType.STANDARD },
  { type: ReservationType.SUBSTITUTION },
  { type: ReservationType.CONTINGENCY },
];

export function Dashboard() {
  const navigation = useNavigation<StackNavigatorProps>();
  const {
    user,
    boatSelectedInDropdown,
    setBoatSelectedInDropdown,
    fetchBoatContracts,
    currentUserBoats,
    fetchReservationsForCurrentBoat,
  } = useInfo();

  // Fetch reservations from the API
  async function fetchCalendarReservations() {
    if (!boatSelectedInDropdown) return;

    await fetchReservationsForCurrentBoat();
  }

  function handleInfoIconPress(type: ReservationType) {
    navigation.navigate("reservationDescription", { reservationType: type });
  }

  useEffect(() => {
    fetchCalendarReservations();
  }, [boatSelectedInDropdown]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome back, {user?.name}!</Text>

        <View style={styles.dropdown}>
          <Text style={styles.dropdownUpperText}>Selected Boat</Text>
          <DropdownList
            list={currentUserBoats}
            onSelect={(item) => {
              setBoatSelectedInDropdown(item!);
              fetchBoatContracts(item!.id);
            }}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.calendarContainer}>
          <View style={styles.iconGrid}>
            {list.map((item, index) => (
              <Pressable onPress={() => handleInfoIconPress(item.type)} key={index}>
                <InfoIcon type={item.type} />
              </Pressable>
            ))}
          </View>

          <Calendar />
        </View>
      </View>
    </View>
  );
}
