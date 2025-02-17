import { ScrollView, View, Text, Pressable } from "react-native";
import { s } from "./styles";
import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { Boat } from "../../@types/boat";
import { useInfo } from "../../contexts/info";
type DropdownListProps = {
  list: Boat[];
  onSelect?: (boat: Boat | null) => void;
};

export function DropdownList({ list, onSelect }: DropdownListProps) {
  const [viewDropdown, setViewDropdown] = useState(false);

  const { boatSelectedInDropdown, setBoatSelectedInDropdown } = useInfo();

  function handlePress() {
    setViewDropdown(!viewDropdown);
  }

  function handleSelect(item: Boat) {
    setBoatSelectedInDropdown(item);
    onSelect?.(item);
    handlePress();
  }

  return (
    <View style={s.dropdown}>
      <Pressable
        style={[s.container, list.length === 0 ? s.disabled : undefined]}
        onPress={list.length > 0 ? handlePress : undefined}
      >
        <Text style={s.placeholder}>{boatSelectedInDropdown?.name || "No boats"}</Text>

        <ChevronRight
          style={viewDropdown ? s.chevron : undefined}
          size={20}
          color={"black"}
        />
      </Pressable>

      {viewDropdown && list.length > 0 ? (
        <View style={s.dropdownList}>
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
        </View>
      ) : null}
    </View>
  );
}
