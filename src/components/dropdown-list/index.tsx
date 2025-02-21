import { ScrollView, View, Text, Pressable } from "react-native";
import { s } from "./styles";
import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { Boat } from "../../@types/boat";
import { useInfo } from "../../contexts/info";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

type DropdownListProps = {
  list: Boat[];
  onSelect?: (boat: Boat | null) => void;
};

export function DropdownList({ list, onSelect }: DropdownListProps) {
  const [viewDropdown, setViewDropdown] = useState(false);
  // Animation stuff
  const rotation = useSharedValue(270);
  const opacity = useSharedValue(0);
  const offset = useSharedValue(0);
  const scale = useSharedValue(1);

  const { boatSelectedInDropdown, setBoatSelectedInDropdown } = useInfo();

  function handlePress() {
    setViewDropdown(!viewDropdown);

    rotation.value = withSpring(
      viewDropdown ? 270 : 360,
      {
        stiffness: 300,
        damping: 15,
      }
    )
    opacity.value = withTiming(
      viewDropdown ? 0 : 1,
      {
        duration: 200,
      }
    );
    offset.value = withSpring(
      viewDropdown ? -5 : 0,
      {
        stiffness: 300,
        damping: 20,
      }
    );
    scale.value = withSpring(
      viewDropdown ? 0.9 : 1,
      {
        stiffness: 300,
        damping: 20,
      }
    );

  }

  function handleSelect(item: Boat) {
    setBoatSelectedInDropdown(item);
    onSelect?.(item);
    handlePress();
  }

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value + "deg" }],
    };
  });

  const animatedDropdownListStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: offset.value }, { scale: scale.value }],
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
        <Animated.View style={[s.dropdownList, animatedDropdownListStyle]}>
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
