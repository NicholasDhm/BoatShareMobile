import { View, Text, Pressable } from "react-native";
import { s } from "./styles";
import { ChevronRight } from "lucide-react-native";
import { useState } from "react";

type DropdownListProps = {
  list: { id: number; label: string }[];
};

export function DropdownList({ list }: DropdownListProps) {
  const [viewDropdown, setViewDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: number; label: string }>(list[0]);

  function handlePress() {
    setViewDropdown(!viewDropdown);
  }

  return (
    <View style={s.dropdown}>
      <Pressable style={s.container} onPress={handlePress}>
        <Text style={s.placeholder}>{selectedItem.label}</Text>

        <ChevronRight
          style={viewDropdown ? s.chevron : undefined}
          size={20}
          color={"black"}
        />
      </Pressable>

      {viewDropdown ? (
        <View style={s.dropdownList}>
          {list.map((item) => (
            <Pressable
              key={item.id}
              style={[
                s.dropdownItem,
                selectedItem.id === 1 && s.first,
                selectedItem.id === list.length && s.last,
                selectedItem.id === item.id && s.dropdownItemSelected,
              ]}
              onPress={() => { setSelectedItem(item); handlePress(); }}
              // onPressOut={() => setSelectedItem(null)}
            >
              <Text>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}
