import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useInfo } from "../../contexts/info";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";
import { Plus, User, LogOut, CalendarCheck, Pencil } from "lucide-react-native";
import { colors } from "../../themes/colors";
import { SvgIcon } from "../../components/svg";
import { Boat } from "../../@types/boat";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

export function Profile() {
  const { signOut, user, currentUserBoats, currentUserReservations, currentUserLegacyReservations, currentUserContracts, fetchBoats, fetchReservations } = useInfo();
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

  function handleNavigateToBoatDetails(boat: Boat) {
    navigation.navigate("boatDetails", { boat });
  }

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.grayLight }}
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
            <View style={styles.dataContainerContent}>

              {currentUserBoats.length > 0 ? (
                currentUserBoats.map((boat) => (
                  <AnimatedTouchableOpacity entering={FadeInUp} key={boat.id} onPress={() => handleNavigateToBoatDetails(boat)}
                    style={styles.dataContainerItem}>
                    <View style={styles.boatName}>
                      <SvgIcon
                        icon="boat"
                        size={26}
                        color={colors.grayDark}
                      />
                      <Text style={styles.text}>
                        {boat.name}
                      </Text>
                    </View>
                    <View style={styles.boatCapacity}>
                      <User size={16} color="black" />
                      <Text style={styles.text}>{boat.capacity}</Text>
                    </View>
                    {/* <Info size={16} color="black" style={styles.userIcon} /> */}
                  </AnimatedTouchableOpacity>
                ))
              ) : (
                <View style={styles.boatContainer}>
                  <Text style={styles.text}>You don't have any boats yet</Text>
                </View>
              )}
            </ View>
          </View>

          <View style={styles.dataContainer}>
            <View style={styles.row}>
              <Text style={styles.dataContainerTitle}>Your active reservations</Text>
            </View>
            <Text style={styles.text}>active - in queue - legacy</Text>

            <View style={styles.reservationList}>
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
          </View>

          {/* Show all legacy reservations */}
          <View style={styles.dataContainer}>
            <View style={styles.row}>
              <Text style={styles.dataContainerTitle}>Your legacy reservations</Text>
            </View>

            <View style={styles.reservationList}>
              {currentUserLegacyReservations.length > 0 ? (

                currentUserLegacyReservations.map((reservation) => {
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
                <Text style={styles.text}>You don't have any legacy reservations</Text>
              )}
            </View>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}
