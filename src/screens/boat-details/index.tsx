import { View, Text, Pressable, Alert } from "react-native";
import { styles } from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../routes/app.routes";
import { RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Crown, Trash2, User } from "lucide-react-native";
import { colors } from "../../themes/colors";
import { StackNavigatorProps } from "../../routes/app.routes";
import { Button } from "../../components/button";
import { TextInput } from "../../components/text-input";
import { useState, useEffect } from "react";
import { contractsApi } from "../../apis/contractsApi";
import { usersApi } from "../../apis/usersApi";
import { useInfo } from "../../contexts/info";
type BoatDetailsRouteProp = RouteProp<StackRoutes, 'boatDetails'>;

type Partner = {
  id: string;
  name: string;
  role: string;
}

export function BoatDetails() {
  const { user } = useInfo();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [email, setEmail] = useState<string>("");
  const { boat } = useRoute<BoatDetailsRouteProp>().params;
  const navigation = useNavigation<StackNavigatorProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleAddPartner(email: string) {
    try {
      const partner = await usersApi.getUserByEmail(email);
      await contractsApi.createMemberContract(partner.id, boat.id);
      await fetchPartners();
      setEmail("")
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add partner");
    }
  }

  async function handleRemovePartner(partnerId: string) {
    try {
      const partnerContract = await contractsApi.getContractByBoatAndUserId(boat.id, partnerId);
      await contractsApi.deleteContract(partnerContract.id);
      await fetchPartners();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to remove partner");
    }
  }

  async function fetchPartners() {
    try {
      const response = await contractsApi.getContractsByBoatId(boat.id);
      const partnersNames = await Promise.all(response.map(async (contract) => {
        const fetchedUser = await usersApi.getUserById(contract.userId);
        if (fetchedUser.id !== user?.id) {
          return {
            id: fetchedUser.id,
            name: fetchedUser.name,
            role: contract.role
          };
        }
      }));
      setPartners(partnersNames.filter((partner): partner is Partner => partner !== undefined));
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch partners");
    }
  }

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bluePrimary }}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Pressable onPress={handleGoBack}>
            <ChevronLeft size={30} color={"black"} />
          </Pressable>
          <Text style={styles.title}>Boat management</Text>
        </View>

        <Text style={styles.boatName}>{boat.name}</Text>

        <View style={styles.form}>
          <TextInput
            title="Partner email"
            placeholder="joe@email.com"
            onChangeText={setEmail}
            value={email}
          />

          <Button title="Add partner" onPress={() => handleAddPartner(email)} disabled={email.length === 0} />
        </View>

        <View style={styles.partnersContainer}>
          <Text style={styles.partnersTitle}>Partners</Text>
          <View style={styles.partnersList}>
            {partners.map((partner, index) => (
              <View style={styles.partnerItem} key={index}>
                <View style={styles.partnerInfo}>
                  {partner.role === 'admin' ? (
                    <Crown size={20} color={"black"}></Crown>
                  ) : (<User size={20} color={"black"} />)}
                  <Text>{partner.name}</Text>
                </View>
                {partner.role !== 'admin' && (
                  <Pressable onPress={() => handleRemovePartner(partner.id)} style={styles.removePartnerButton}>
                    <Trash2 size={20} color={"black"} />
                  </Pressable>
                )}
              </View>
            ))}

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}