import { Pressable, View, Text } from "react-native";
import { Calendar } from "../../components/calendar";
import { InfoIcon } from "../../components/info-icon";
import { styles } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ReservationType } from "../../@types/reservation-type";
import { StackNavigatorProps } from "../../routes/app.routes";
import { DropdownList, DropdownListProps } from "../../components/dropdown-list";
import { useAuth } from "../../contexts/auth";
import { useCallback } from "react";
import { useState } from "react";
import { boatsApi } from "../../apis/boatsApi";
import { userBoatsApi } from "../../apis/userBoatsApi";
import { storageUserBoatGet } from "../../storage/userBoatStorage";
import { storageBoatGet } from "../../storage/boatStorage";
import { Boat } from "../../@types/boat";
import { UserBoat } from "../../@types/user-boat";

const list: { type: ReservationType }[] = [
  { type: ReservationType.STANDARD },
  { type: ReservationType.SUBSTITUTION },
  { type: ReservationType.CONTINGENCY },
];

export function Dashboard() {
  const navigation = useNavigation<StackNavigatorProps>();
  const { user } = useAuth();

  const [dropdownList, setDropdownList] = useState<DropdownListProps["list"]>([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchUserBoats() {
        try {
          if (user) {
            const userBoats = await storageUserBoatGet();
            const boats = await storageBoatGet();
            setDropdownList(userBoats.map((userBoat) => ({
              key: Number(userBoat.boatId),
              id: Number(userBoat.boatId),
              label: boats.find((boat) => boat.boatId === userBoat.boatId)?.name || "",
            })));
          }
        } catch (error) {
          console.error("Error fetching boats:", error);
        }
      }

      if (user?.userId) {
        fetchUserBoats();
      }
    }, [])
  );


  function handleInfoIconPress(type: ReservationType) {
    navigation.navigate("reservationTypeInfo", { reservationType: type });
  }

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome back, {user?.name}!</Text>

        <View style={styles.dropdown}>
          <Text style={styles.dropdownUpperText}>Selected Boat</Text>
          <DropdownList list={dropdownList} />
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
