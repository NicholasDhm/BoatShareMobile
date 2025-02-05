import { View, Text } from "react-native";
import { styles } from "./styles";

export function Profile() {
    return (
    // <Header></Header>
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.dataContainer}>
        <Text style={styles.subText}>Username: Nick</Text>
        {/* <SubText>Id: 1</SubText> */}
        <Text style={styles.subText}>Email: nick@gmail.com</Text>
        <Text style={styles.subText}>Password: nickisthebesthumanalive</Text>
        {/* <SubText>Role: Admin</SubText> */}
      </View>

      <Text style={styles.title}>Your Boats:</Text>
      {/* border bottom and a dropdown with a arrow that spins to display or not opened */}
      <View style={styles.dataContainer}>
        {/* Reutilize description from the calendar to show calendar */}
        <Text style={styles.subText}>Standard: 2</Text>
        <Text style={styles.subText}>Substitution: 2</Text>
        <Text style={styles.subText}>Contingency: 1</Text>
      </View>

      <Text style={styles.title}>Your Quotas:</Text>
      <View style={styles.dataContainer}>
        {/* Reutilize description from the calendar to show calendar */}
        <Text style={styles.subText}>Standard: 2</Text>
        <Text style={styles.subText}>Substitution: 2</Text>
        <Text style={styles.subText}>Contingency: 1</Text>
      </View>

      {/* <History></History> */}
    </View>
  );
}
