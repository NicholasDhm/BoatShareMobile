import { ScrollView, View, Text, Pressable } from "react-native";
import { s } from "./styles";
import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { Boat } from "../../@types/boat";
import { useInfo } from "../../contexts/info";
import Animated, { FadeInUp, FadeOut, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type DropdownListProps = {
  list: Boat[];
  onSelect?: (boat: Boat | null) => void;
};

export function DropdownList({ list, onSelect }: DropdownListProps) {
  const [viewDropdown, setViewDropdown] = useState(false);
  const { boatSelectedInDropdown, setBoatSelectedInDropdown, fetchBoatContracts } = useInfo();

  // Animation stuff
  const rotation = useSharedValue(270);

  function handlePress() {
    setViewDropdown(!viewDropdown);

    rotation.value = withSpring(
      viewDropdown ? 270 : 360,
      {
        stiffness: 300,
        damping: 15,
      }
    )

  }

  function handleSelect(item: Boat) {
    setBoatSelectedInDropdown(item);
    fetchBoatContracts(item.id);
    onSelect?.(item);
    handlePress();
  }

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value + "deg" }],
    };
  });

  return (
    <View style={s.dropdown}>
      <Pressable
        style={[s.container, list.length === 0 ? s.disabled : undefined]}
        onPress={list.length > 0 ? handlePress : undefined}
      >
        <Text style={s.placeholder}>{boatSelectedInDropdown?.name || "No boats"}</Text>
        <Animated.View style={animatedContainerStyle}>
          <ChevronRight
            style={s.chevron}
            size={20}
            color={"black"}
          />
        </Animated.View>

      </Pressable>

      {viewDropdown && list.length > 0 ? (
        <Animated.View style={[s.dropdownList]} entering={FadeInUp.withInitialValues({opacity: 0, transform: [{ translateY: -10 }]})} exiting={FadeOut}>
          <ScrollView style={s.scrollView} nestedScrollEnabled>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  boatSelectedInDropdown?.id === item.id
                    ? s.dropdownItemSelected
                    : s.dropdownItem,
                  pressed ? s.dropdownItemPressed : {},
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={
                    boatSelectedInDropdown?.id === item.id
                      ? s.dropdownItemTextSelected
                      : s.dropdownItemText
                  }
                >
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>
      ) : null}
    </View>
  );
}
