import { View, Text, Pressable, Alert, TextInput } from "react-native";
import { styles } from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../routes/app.routes";
import { RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Crown, Trash2, User } from "lucide-react-native";
import { colors } from "../../themes/colors";
import { StackNavigatorProps } from "../../routes/app.routes";
import { useState, useEffect } from "react";
import { contractsApi } from "../../apis/contractsApi";
import { usersApi } from "../../apis/usersApi";
import { useInfo } from "../../contexts/info";
import { Contract } from "../../@types/contract";

import { Plus, RectangleVertical } from "lucide-react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

type BoatDetailsRouteProp = RouteProp<StackRoutes, 'boatDetails'>;

type Partner = {
  id: string;
  name: string;
  role: string;
}

export function BoatDetails() {
  const { user } = useInfo();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [userContract, setUserContract] = useState<Contract | null>(null);
  const [email, setEmail] = useState<string>("");
  const { boat } = useRoute<BoatDetailsRouteProp>().params;
  const navigation = useNavigation<StackNavigatorProps>();

  // Animation stuff
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

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
        if (contract.userId === user?.id) {
          setUserContract(contract);
        }
        return {
          id: fetchedUser.id,
          name: fetchedUser.name,
          role: contract.role
        };
      }));
      setPartners(partnersNames.filter((partner): partner is Partner => partner !== undefined));
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch partners");
    }
  }

  function addPressIn() {
    scale.value = withSpring(0.8);
  }
  function addPressOut() {
    scale.value = withSpring(1);
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

        <View style={[styles.row, { justifyContent: "center", gap: 20, marginTop: 18 }]}>
          <View style={styles.row}>
            <RectangleVertical size={20} fill={colors.bluePrimary} />
            <Text >{userContract?.standardQuota}</Text>
          </View>
          <View style={styles.row}>
            <RectangleVertical size={20} fill={colors.redPrimary} />
            <Text >{userContract?.substitutionQuota}</Text>
          </View>
          <View style={styles.row}>
            <RectangleVertical size={20} fill={colors.orangePrimary} />
            <Text >{userContract?.contingencyQuota}</Text>
          </View>
        </View>

        <View style={styles.partnersContainer}>
          <View style={styles.spacedRow}>
            <Text style={styles.partnersTitle}>Partners ({partners.length}/{boat.capacity})</Text>
          </View>
          <View style={styles.partnersList}>
            {userContract?.role === "admin" && (
              <View style={styles.partnerInputContainer}>
                <TextInput
                  placeholder="Enter partner email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.partnerInput}
                />
                <Animated.View style={[styles.addPartnerButton, animatedStyle]}>
                  <Pressable onPress={() => handleAddPartner(email)} onPressIn={addPressIn} onPressOut={addPressOut}>
                    <Plus size={20} color={"black"} />
                  </Pressable>
                </Animated.View>
              </View>
            )}
            {partners.map((partner, index) => (
              <View style={styles.partnerItem} key={index}>
                <View style={styles.partnerInfo}>
                  {partner.role === 'admin' ? (
                    <Crown size={20} color={"black"}></Crown>
                  ) : (<User size={20} color={"black"} />)}
                  <Text style={styles.partnerName}>{partner.name}</Text>
                  {partner.id === user?.id && (
                    <Text style={styles.detailText}>(You)</Text>
                  )}
                </View>
                {userContract?.role === "admin" && user?.id !== partner.id && (
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