import { Pressable, View, Text } from "react-native";
import { Calendar } from "../../components/calendar";
import { InfoIcon } from "../../components/info-icon";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { ReservationType } from "../../types/reservation-type";
import { StackNavigatorProps } from "../../routes/app.routes";
import { DropdownList, DropdownListProps } from "../../components/dropdown-list";
import { useAuth } from "../../contexts/auth";
import { useEffect } from "react";
import { useState } from "react";
import { boatsApi } from "../../apis/boatsApi";
import { userBoatsApi } from "../../apis/userBoatsApi";

const list: { type: ReservationType }[] = [
  { type: ReservationType.STANDARD },
  { type: ReservationType.SUBSTITUTION },
  { type: ReservationType.CONTINGENCY },
];

export function Dashboard() {
  const navigation = useNavigation<StackNavigatorProps>();
  const { user } = useAuth();

  const [dropdownList, setDropdownList] = useState<DropdownListProps["list"]>([]);

  useEffect(() => {
    async function fetchUserBoats() {
      try {
        if (user) {
          const boats = await boatsApi.getBoatsByUserId(user.userId);
          setDropdownList(boats.map((boat) => ({
            id: boat.boatId,
            label: boat.name,
          })));
        }
      } catch (error) {
        console.error("Error fetching boats:", error);
      }
    }
  
    if (user?.userId) {
      fetchUserBoats();
    }
  }, [user]);
  

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
