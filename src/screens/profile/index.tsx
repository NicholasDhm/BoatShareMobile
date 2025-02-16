import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useInfo } from "../../contexts/info";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";
import { Plus, User, LogOut, CalendarCheck, Pencil } from "lucide-react-native";
import { colors } from "../../themes/colors";
import { SvgIcon } from "../../components/svg";
import { useCallback } from "react";

export function Profile() {
  const { signOut, user, currentUserBoats, currentUserReservations, currentUserContracts, fetchBoats, fetchReservations } = useInfo();
  const navigation = useNavigation<StackNavigatorProps>();

  // Fetch data from local storage when the screen is focused
  // useFocusEffect(
  //   useCallback(() => {
  //     async function fetchData() {
  //       await fetchReservations();
  //     }
  //     fetchData();
  //   }, [])
  // );

  function handleNavigateToAddBoat() {
    navigation.navigate("createBoat");
  }

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <View style={styles.rowSpaced}>
            <Text style={styles.headerText}>Profile</Text>
            <TouchableOpacity onPress={signOut}>
              <LogOut size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>

          <View style={styles.dataContainer}>
            <View style={styles.rowSpaced}>
              <Text style={styles.dataContainerTitle}>Account Details</Text>
              <TouchableOpacity>
                <Pencil size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>Username: {user?.name}</Text>
            <Text style={styles.text}>Email: {user?.email}</Text>


          </View>



          <View style={styles.dataContainer}>
            <View style={styles.rowSpaced}>
              <Text style={styles.dataContainerTitle}>Your Boats</Text>
              <TouchableOpacity onPress={handleNavigateToAddBoat}>
                <Plus size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* show all boats that the user has */}
            {currentUserBoats.length > 0 ? (
              currentUserBoats.map((boat) => (
                <View key={boat.id} style={styles.row}>
                  <SvgIcon
                    icon="boat"
                    size={26}
                    color={colors.grayDark}
                  />
                  <Text style={styles.text && styles.boatName}>
                    {boat.name}
                  </Text>

                  <User size={16} color="black" style={styles.userIcon} />
                  <Text style={styles.text}>{boat.capacity}</Text>
                </View>
              ))
            ) : (
              <View style={styles.boatContainer}>
                <Text style={styles.text}>You don't have any boats yet</Text>
              </View>
            )}
          </View>

          <View style={styles.dataContainer}>
            <View style={styles.row}>
              <Text style={styles.dataContainerTitle}>Your Reservations</Text>
            </View>

            {/* show all reservations that the user has */}
            {currentUserReservations.length > 0 ? (
              currentUserReservations.map((reservation) => {
                const contract = currentUserContracts.find(contract =>
                  contract.id === reservation.contractId
                );
                const boat = currentUserBoats.find(b => b.id === contract?.boatId);
                return (
                  <View key={reservation.id} style={styles.row}>
                    <CalendarCheck size={24} color="black" style={{ marginRight: 12 }} />
                    <Text style={styles.text}>{reservation.date}</Text>
                    <Text style={styles.boatReservationName}>
                      {boat?.name}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={styles.text}>You don't have any reservations</Text>
            )}
          </View>

          <View style={styles.dataContainer}>
            <View style={styles.row}>
              <Text style={styles.dataContainerTitle}>Your Quotas</Text>
            </View>
            <Text style={styles.text}>Standard: 2</Text>
            <Text style={styles.text}>Substitution: 2</Text>
            <Text style={styles.text}>Contingency: 1</Text>
          </View>

        </View>
      </View>
      {/* <History></History> */}
    </ScrollView>
  );
}
