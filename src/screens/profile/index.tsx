import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useAuth } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorProps } from "../../routes/app.routes";
import { Plus, User, LogOut, CalendarCheck, CalendarClock, CalendarX} from "lucide-react-native";
import { useState } from "react";
import { colors } from "../../themes/colors";
import { SvgIcon } from "../../components/svg";

export function Profile() {
  const { signOut, user } = useAuth();
  const navigation = useNavigation<StackNavigatorProps>();
  const [isBoatsExpanded, setIsBoatsExpanded] = useState(false);

  function createBoat() {
    navigation.navigate("createBoat");
  }

  return (
    <ScrollView 
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>

        <View style={styles.rowSpaced}>
          <Text style={styles.pageTitle}>Profile</Text>
          <TouchableOpacity onPress={signOut}>
            <LogOut size={24} color="black"/>
          </TouchableOpacity>
        </View>

      <View style={styles.dataContainer}>
        <Text style={styles.subText}>Username: {user?.name}</Text>
        {/* <SubText>Id: 1</SubText> */}
        <Text style={styles.subText}>Email: {user?.email}</Text>
        {/* <SubText>Role: Admin</SubText> */}
      </View>

    <View style={styles.dataContainer}>
      <View style={styles.rowSpaced}>
          <Text style={styles.title}>Your Boats</Text>
          <TouchableOpacity onPress={createBoat}>

            <Plus size={24} color="black"/>
          </TouchableOpacity>
      </View>

        {user?.boats && user.boats.length > 0 ? (
          user.boats.map((boat) => (
            <View style={styles.row}>
              <SvgIcon
                icon="boat"
                size={26}
                color={colors.grayDark}
              />
              <Text style={styles.subText && styles.boatName}>
                {boat.name}
              </Text>
              <User size={16} color="black" style={styles.userIcon}/>
              <Text style={styles.subText}>{boat.capacity}</Text>
            </View>

          ))


        ) : (
          <View style={styles.boatContainer}>
            <Text style={styles.subText}>You don't have any boats yet</Text>
          </View>
        )}
      </View>
      
      <View style={styles.dataContainer}>
        <View style={styles.row}>
          <Text style={styles.title}>Your Reservations</Text>
        </View>
        {/* Reutilize description from the calendar to show calendar */}

          <View style={styles.row}>
            <CalendarCheck size={24} color="black" style={{marginRight: 12}}/>
            <Text style={styles.subText}>03/04/2025</Text>
            <Text style={styles.boatReservationName}>Wanderer</Text>
          </View>
          <View style={styles.row}>
            <CalendarClock size={24} color="black" style={{marginRight: 12}}/>

            <Text style={styles.subText}>02/03/2025</Text>
            <Text style={styles.boatReservationName}>Wanderer</Text>
          </View>
          <View style={styles.row}>
            <CalendarX size={24} color="black" style={{marginRight: 12}}/>
            <Text style={styles.subText}>08/05/2025</Text>
            <Text style={styles.boatReservationName}>Nick's Boat</Text>
          </View>
      </View>



      <View style={styles.dataContainer}>
        <View style={styles.row}>
          <Text style={styles.title}>Your Quotas</Text>
        </View>
        {/* Reutilize description from the calendar to show calendar */}
        <Text style={styles.subText}>Standard: 2</Text>
        <Text style={styles.subText}>Substitution: 2</Text>
        <Text style={styles.subText}>Contingency: 1</Text>
      </View>


      </View>
      {/* <History></History> */}
    </ScrollView>
  );
}
