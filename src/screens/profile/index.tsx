import { View, Text, ScrollView } from "react-native";
import { styles } from "./styles";
import { Button } from "../../components/button";
import { useAuth } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";

export function Profile() {
  const { signOut, user } = useAuth();
  const navigation = useNavigation<StackNavigatorProps>();

  function createBoat() {
    navigation.navigate("createBoat");
  }

  return (
    <ScrollView 
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.dataContainer}>

        <Text style={styles.subText}>Username: {user?.name}</Text>
        {/* <SubText>Id: 1</SubText> */}
        <Text style={styles.subText}>Email: {user?.email}</Text>
        {/* <SubText>Role: Admin</SubText> */}
      </View>

      <Text style={styles.title}>Your Boats:</Text>
      {/* border bottom and a dropdown with a arrow that spins to display or not opened */}
      <View style={styles.dataContainer}>
        {/* Reutilize description from the calendar to show calendar */}
        {user?.boats ? (
          user.boats.map((boat) => (
            <Text key={boat.name} style={styles.subText}>
              {boat.name}
            </Text>
          ))
        ) : (
          <Text style={styles.subText}>No boats</Text>
        )}
        <Button title="Create Boat" onPress={createBoat} />
      </View>

      <Text style={styles.title}>Your Quotas:</Text>
      <View style={styles.dataContainer}>
        {/* Reutilize description from the calendar to show calendar */}
        <Text style={styles.subText}>Standard: 2</Text>
        <Text style={styles.subText}>Substitution: 2</Text>
        <Text style={styles.subText}>Contingency: 1</Text>
      </View>

      <Button title="Logout" onPress={signOut} />
      </View>
      {/* <History></History> */}
    </ScrollView>
  );
}
