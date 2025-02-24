import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useInfo } from "../../contexts/info";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";
import { Plus, User, LogOut, CalendarCheck } from "lucide-react-native";
import { colors } from "../../themes/colors";
import { SvgIcon } from "../../components/svg";
import { Boat } from "../../@types/boat";
import Animated, { 
  FadeInUp, 
} from "react-native-reanimated";

export function Profile() {
  const { signOut, user, currentUserBoats, currentUserReservations, currentUserLegacyReservations, currentUserContracts } = useInfo();
  const navigation = useNavigation<StackNavigatorProps>();

  function handleNavigateToAddBoat() {
    navigation.navigate("createBoat");
  }

  function handleNavigateToBoatDetails(boat: Boat) {
    navigation.navigate("boatDetails", { boat });
  }

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100}}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <User size={30} color={colors.prussianBluePrimary} />
            </View>
            <View>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={signOut}>
            <LogOut size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentUserBoats.length}</Text>
            <Text style={styles.statLabel}>Boats</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentUserReservations.length}</Text>
            <Text style={styles.statLabel}>Active Reservations</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentUserLegacyReservations.length}</Text>
            <Text style={styles.statLabel}>Past Trips</Text>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Animated.View entering={FadeInUp.delay(100)} style={styles.dataContainer}>
          <View style={styles.rowSpaced}>
            <Text style={styles.sectionTitle}>Your Boats</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleNavigateToAddBoat}
            >
              <Plus size={20} color="white" />
            </TouchableOpacity>
          </View>
          {currentUserBoats.map((boat, index) => (
            <AnimatedTouchableOpacity
              entering={FadeInUp.delay(150 * index)}
              key={boat.id}
              style={styles.boatCard}
              onPress={() => handleNavigateToBoatDetails(boat)}
            >
              <SvgIcon icon="boat" size={32} color={colors.prussianBluePrimary} />
              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={styles.boatName}>{boat.name}</Text>
                <Text style={styles.boatCapacity}>Capacity: {boat.capacity} people</Text>
              </View>
            </AnimatedTouchableOpacity>
          ))}
        </Animated.View>

                <Animated.View 
          entering={FadeInUp.delay(200)}
          style={styles.dataContainer}
        >
          <Text style={styles.sectionTitle}>Active Reservations</Text>
          
          {currentUserReservations.map((reservation, index) => {
            const contract = currentUserContracts.find(c => c.id === reservation.contractId);
            const boat = currentUserBoats.find(b => b.id === contract?.boatId);
            return (
              <Animated.View
                key={reservation.id}
                entering={FadeInUp.delay(150 * index)}
                style={styles.reservationCard}
              >
                <CalendarCheck size={24} color={colors.prussianBluePrimary} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.reservationBoatName}>{boat?.name}</Text>
                  <Text style={styles.reservationDate}>{reservation.date}</Text>
                </View>
              </Animated.View>
            );
          })}
        </Animated.View>
      </View>
    </ScrollView>
  );
}