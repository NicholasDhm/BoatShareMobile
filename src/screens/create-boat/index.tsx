import { ChevronLeft } from "lucide-react-native";
import { View, Text, Pressable, Alert } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { TabNavigatorProps } from "../../routes/app.routes";
import { TextInput } from "../../components/text-input";
import { Button } from "../../components/button";
import { useState } from "react";
import { NumberInput } from "../../components/number-input";
import { useInfo } from "../../contexts/info";
import { colors } from "../../themes/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { boatsApi } from "../../apis/boatsApi";
import { contractsApi } from "../../apis/contractsApi";

export function CreateBoat() {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [boatName, setBoatName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<TabNavigatorProps>();
  const { user, updateAllDataByFetchingFromApi } = useInfo();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleCreateBoat() {
    if (!user) return;

    if (!boatName.trim() || selectedNumber <= 0) {
      Alert.alert("Error", "Please enter a valid name and capacity.");
      return;
    }

    try {
      setLoading(true);

      // Create boat and save to API
      const newBoat = await boatsApi.createBoat(boatName, selectedNumber);

      // Create user-boat relationship and save to API
      await contractsApi.createContract(user.id, newBoat.id);

      // Update local storage
      await updateAllDataByFetchingFromApi();

      Alert.alert("Success", "Boat created successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error creating boat:", error);
      Alert.alert("Error", error instanceof Error ? error.message : "Failed to create boat. Please try again.");
    } finally {
      setLoading(false);
    }
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

          <Button title={loading ? "Creating..." : "Create"} onPress={handleCreateBoat} disabled={loading} />
        </View>
      </View>
    </SafeAreaView>
  );
}
