import { Pressable, View, Text } from "react-native";
import { Calendar } from "../../components/calendar";
import { InfoIcon } from "../../components/info-icon";
import { styles } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ReservationType } from "../../@types/reservation-type";
import { StackNavigatorProps } from "../../routes/app.routes";
import { DropdownList, DropdownListProps } from "../../components/dropdown-list";
import { useAuth } from "../../contexts/auth";
import { useCallback, useEffect, useState } from "react";
import { boatsApi } from "../../apis/boatsApi";
import { userBoatsApi } from "../../apis/userBoatsApi";
import { storageUserBoatGet } from "../../storage/userBoatStorage";
import { storageBoatGet } from "../../storage/boatStorage";
import { reservationsApi } from "../../apis/reservationsApi";
import { Reservation } from "../../@types/reservation";
const list: { type: ReservationType }[] = [
  { type: ReservationType.STANDARD },
  { type: ReservationType.SUBSTITUTION },
  { type: ReservationType.CONTINGENCY },
];

export function Dashboard() {
  const navigation = useNavigation<StackNavigatorProps>();
  const { user } = useAuth();

  const [dropdownList, setDropdownList] = useState<DropdownListProps["list"]>([]);
  const [selectedBoat, setSelectedBoat] = useState<DropdownListProps["value"]>();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Fetch reservations from the API
  async function fetchReservations() {
    if (!selectedBoat) return;

    try {
      const data = await reservationsApi.getReservationsByBoatId(selectedBoat.id);
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  }

  // Fetch user boats from local storage and set the dropdown list
  async function fetchUserBoats() {
    const userBoats = await storageUserBoatGet();
    const boats = await storageBoatGet();
    const boatsList = userBoats.map((userBoat) => ({
      key: Number(userBoat.boatId),
      id: userBoat.boatId,
      label: boats.find((boat) => boat.boatId === userBoat.boatId)?.name || "",
    }));
    setDropdownList(boatsList);

    // Set initial selected boat if none is selected
    if (!selectedBoat && boatsList.length > 0) {
      setSelectedBoat(boatsList[0]);
    }
  }

  // Fetch data from local storage when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchUserBoats();
    }, [])
  );

  function handleInfoIconPress(type: ReservationType) {
    navigation.navigate("reservationTypeInfo", { reservationType: type });
  }

  // Fetch reservations from the API when the selected boat changes
  useEffect(() => {
    fetchReservations();
  }, [selectedBoat]);

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome back, {user?.name}!</Text>

        <View style={styles.dropdown}>
          <Text style={styles.dropdownUpperText}>Selected Boat</Text>
          <DropdownList
            list={dropdownList}
            onSelect={setSelectedBoat}
            value={selectedBoat}
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

          <Calendar reservations={reservations} />
          <Pressable onPress={async () => {
            const boats = await boatsApi.getBoats();
            console.log(JSON.stringify(boats, null, 2));
          }}>
            <Text>Show All Boats</Text>
          </Pressable>
          <Pressable onPress={async () => {
            const userBoats = await userBoatsApi.getUserBoats();
            console.log(JSON.stringify(userBoats, null, 2));
          }}>
            <Text>Show All UserBoats</Text>
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
