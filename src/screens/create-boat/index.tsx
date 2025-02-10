import { ChevronLeft } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { TabNavigatorProps } from "../../routes/app.routes";
import { TextInput } from "../../components/text-input";
import { Button } from "../../components/button";
import { useState } from "react";
import { NumberInput } from "../../components/number-input";
import { useAuth } from "../../contexts/auth";
import { colors } from "../../themes/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export function CreateBoat() {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [boatName, setBoatName] = useState('');
  const navigation = useNavigation<TabNavigatorProps>();
  const { user, updateUser } = useAuth();


  function handleGoBack() {
    navigation.goBack();
  }

  function handleCreateBoat() {
    if (!user) return;

    const updatedUser = {
      ...user,
      boats: [
        ...user.boats,
        {
          id: user.boats.length + 1,
          name: boatName,
          capacity: selectedNumber,
          adminsIds: [user.id],
        }
      ]
    };

    updateUser(updatedUser);
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bluePrimary }}>
      <View style={styles.container}>
        <View style={styles.row}>

          <Pressable onPress={handleGoBack}>
            <ChevronLeft size={30} color={"black"} />
          </Pressable>
          <Text style={styles.title}>Create Boat</Text>
        </View>

        <View style={styles.form}>
          <TextInput 
            title="Name" 
            placeholder="Name" 
            value={boatName}
            onChangeText={setBoatName}
          />
          
          <NumberInput 
            title="Capacity"
            value={selectedNumber.toString()}
            onChangeNumber={setSelectedNumber}
          />

          <Button title="Create" onPress={handleCreateBoat} />
        </View>
      </View>
    </SafeAreaView>
  );
}
