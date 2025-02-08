import { FlatList, Pressable, View } from "react-native";
import { Calendar } from "../../components/calendar";
import { InfoIcon } from "../../components/info-icon";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { ReservationType } from "../../types/reservation-type";
import { StackNavigatorProps } from "../../routes/app.routes";
import { DropdownList } from "../../components/dropdown-list";

const dropdownList = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
]

const list: { name: string; type: ReservationType }[] = [
  { name: "John Doe", type: ReservationType.STANDARD },
  { name: "Jane Doe", type: ReservationType.SUBSTITUTION },
  { name: "John Smith", type: ReservationType.CONTINGENCY },
];

export function Dashboard() {
  const navigation = useNavigation<StackNavigatorProps>();

  function handleInfoIconPress() {
    navigation.navigate("reservationTypeInfo");
  }

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>

        <View style={styles.dropdown}>
          <DropdownList list={dropdownList}/>
        </View>

        <Pressable onPress={handleInfoIconPress}>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <InfoIcon name={item.name} type={item.type} />
            )}
            numColumns={3}
            keyExtractor={(_, index) => String(index)}
            style={{
              height: "auto",
              width: 300,
              flexGrow: 0,
            }}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
          />
        </Pressable>

        <Calendar />
      </View>
    </View>
  );
}
