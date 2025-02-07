import { ChevronLeft } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";
import { TextInput } from "../../components/text-input";
import { Button } from "../../components/button";
import { useState } from "react";
import { NumberInput } from "../../components/number-input";
import { useAuth } from "../../contexts/auth";

export function CreateBoat() {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [boatName, setBoatName] = useState('');
  const navigation = useNavigation<StackNavigatorProps>();
  const {user} = useAuth();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleCreateBoat() {
    console.log(boatName, selectedNumber);
    navigation.navigate("profile");
    user?.boats.push({
      id: user.boats.length + 1,
      name: boatName,
      capacity: selectedNumber,
      adminsIds: [user.id],
    });

  }




  return (
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
  );
}
