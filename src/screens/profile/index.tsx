import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useAuth } from "../../contexts/auth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";
import { Plus, User, LogOut, CalendarCheck, Pencil } from "lucide-react-native";
import { colors } from "../../themes/colors";
import { SvgIcon } from "../../components/svg";
import { useCallback, useState } from "react";
import { Boat } from "../../@types/boat";
import { storageBoatGet } from "../../storage/boatStorage";
import { storageUserBoatGet } from "../../storage/userBoatStorage";
import { storageReservationGet } from "../../storage/reservationStorage";
import { Reservation } from "../../@types/reservation";
import { UserBoat } from "../../@types/user-boat";

export function Profile() {
  const { signOut, user } = useAuth();
  const navigation = useNavigation<StackNavigatorProps>();
  const [boats, setBoats] = useState<Boat[]>([]);
  const [userBoats, setUserBoats] = useState<UserBoat[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);


  // Fetch data from local storage when the screen is focused
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          if (user?.userId) {
            const boats = await storageBoatGet();
            const userBoats = await storageUserBoatGet();
            const userReservations = await storageReservationGet();
            setBoats(boats);
            setUserBoats(userBoats);
            setReservations(userReservations);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      if (user?.userId) {
        fetchData();
      }
    }, [])
  );

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
            {userBoats.length > 0 ? (
              userBoats.map((boat) => (
                <View key={boat.boatId} style={styles.row}>
                  <SvgIcon
                    icon="boat"
                    size={26}
                    color={colors.grayDark}
                  />
                  <Text style={styles.text && styles.boatName}>
                    {boats.find(b => b.boatId === boat.boatId)?.name}
                  </Text>

                  <User size={16} color="black" style={styles.userIcon} />
                  <Text style={styles.text}>{boats.find(b => b.boatId === boat.boatId)?.capacity}</Text>
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
            {reservations.length > 0 ? (
              reservations.map((reservation) => {
                const userBoat = userBoats.find(boat =>
                  boat.userBoatId === reservation.userBoatId
                );
                const boat = userBoats.find(b => b.boatId === userBoat?.boatId);
                return (
                  <View key={reservation.reservationId} style={styles.row}>
                    <CalendarCheck size={24} color="black" style={{ marginRight: 12 }} />
                    <Text style={styles.text}>{reservation.date}</Text>
                    <Text style={styles.boatReservationName}>
                      {boats.find(b => b.boatId === boat?.boatId)?.name}
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
