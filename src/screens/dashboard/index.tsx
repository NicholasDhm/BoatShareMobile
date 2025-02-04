import { FlatList } from "react-native";
import { Calendar } from "../../components/calendar";
import { InfoIcon } from "../../components/info-icon";
import { Container } from "./styles";

const list = [
  { name: "John Doe", type: "Standard" },
  { name: "Jane Doe", type: "Substitution" },
  { name: "John Smith", type: "Contingency" },
]

export function Dashboard() {
  return (
    <Container>

      <FlatList
        data={list}
        renderItem={({ item }) => <InfoIcon name = {item.name} type = {item.type} />}
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

      <Calendar />
    </Container>
  );
}
