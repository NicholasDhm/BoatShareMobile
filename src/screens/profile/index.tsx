import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useAuth } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";
import { Plus, User, LogOut, CalendarCheck, CalendarClock, CalendarX } from "lucide-react-native";
import { colors } from "../../themes/colors";
import { SvgIcon } from "../../components/svg";

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
            <Text style={styles.dataContainerTitle}>Account Details</Text>
            <Text style={styles.text}>Username: {user?.name}</Text>
            <Text style={styles.text}>Email: {user?.email}</Text>
          </View>



          <View style={styles.dataContainer}>
            <View style={styles.rowSpaced}>
              <Text style={styles.dataContainerTitle}>Your Boats</Text>
              <TouchableOpacity onPress={createBoat}>
                <Plus size={24} color="black" />
              </TouchableOpacity>
            </View>

            {user?.boats && user.boats.length > 0 ? (
              user.boats.map((boat) => (
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

            <View style={styles.row}>
              <CalendarCheck size={24} color="black" style={{ marginRight: 12 }} />
              <Text style={styles.text}>03/04/2025</Text>
              <Text style={styles.boatReservationName}>Wanderer</Text>
            </View>

            <View style={styles.row}>
              <CalendarClock size={24} color="black" style={{ marginRight: 12 }} />
              <Text style={styles.text}>02/03/2025</Text>
              <Text style={styles.boatReservationName}>Wanderer</Text>
            </View>

            <View style={styles.row}>
              <CalendarX size={24} color="black" style={{ marginRight: 12 }} />
              <Text style={styles.text}>08/05/2025</Text>
              <Text style={styles.boatReservationName}>Nick's Boat</Text>
            </View>
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
