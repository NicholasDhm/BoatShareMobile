import { Pressable, View, Text } from "react-native";
import { Calendar } from "../../components/calendar";
import { InfoIcon } from "../../components/info-icon";
import { styles } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ReservationType } from "../../@types/reservation-type";
import { StackNavigatorProps } from "../../routes/app.routes";
import { DropdownList } from "../../components/dropdown-list";
import { useCallback, useEffect } from "react";
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
  const { user, boatSelectedInDropdown, setBoatSelectedInDropdown, currentUserBoats, setCurrentBoatReservations, currentUserReservations, currentUserContracts } = useInfo();

  // Fetch reservations from the API
  async function fetchCalendarReservations() {
    if (!boatSelectedInDropdown) return;

    try {
      const currentBoatContract = currentUserContracts.find(contract => contract.boatId === boatSelectedInDropdown.id);
      setCurrentBoatReservations(currentUserReservations.filter((reservation) => reservation.contractId === currentBoatContract?.id));
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  }


  function handleInfoIconPress(type: ReservationType) {
    navigation.navigate("reservationTypeInfo", { reservationType: type });
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
            onSelect={(item) => setBoatSelectedInDropdown(item!)}
            value={boatSelectedInDropdown}
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

          <Pressable onPress={async () => {
            const boats = await boatsApi.getBoats();
            console.log(JSON.stringify(boats, null, 2));
          }}>
            <Text>Show All Boats</Text>
          </Pressable>
          <Pressable onPress={async () => {
            const contracts = await contractsApi.getContractsByUserId(user?.id || "");
            console.log(JSON.stringify(contracts, null, 2));
          }}>
            <Text>Show All User Contracts</Text>
          </Pressable>

          {/* <Pressable onPress={async () => {
            const newBoat = { name: "Wanderer", capacity: 4 };
            await boatsApi.createBoat("Wanderer", 4);
            console.log("Boat added:", newBoat);
          }}>
            <Text>Add Boat</Text>
          </Pressable> */}
        </View>
      </View>

    </View>
  );
}
