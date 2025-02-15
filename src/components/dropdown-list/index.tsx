import { View, Text, Pressable } from "react-native";
import { s } from "./styles";
import { ChevronRight } from "lucide-react-native";
import { useState, useEffect } from "react";
import { Boat } from "../../@types/boat";
export type DropdownListProps = {
  list: Boat[];
  onSelect?: (boat: Boat | null) => void;
  value?: Boat | null;
};

export function DropdownList({ list, onSelect, value }: DropdownListProps) {
  const [viewDropdown, setViewDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Boat | null>(
    value || (list.length > 0 ? list[0] : null)
  );

  useEffect(() => {
    if (list.length > 0 && selectedItem === null) {
      setSelectedItem(list[0]);
    }
  }, [list]);



  function handlePress() {
    setViewDropdown(!viewDropdown);
  }

  function handleSelect(item: Boat) {
    setSelectedItem(item);
    onSelect?.(item);
    handlePress();
  }

  return (
    <View style={s.dropdown}>
      <Pressable style={s.container} onPress={handlePress}>
        <Text style={s.placeholder}>{selectedItem?.name || "No boats"}</Text>

        <ChevronRight
          style={viewDropdown ? s.chevron : undefined}
          size={20}
          color={"black"}
        />
      </Pressable>

      {viewDropdown && list.length > 0 ? (
        <View style={s.dropdownList}>
          {list.map((item, index) => (
            <Pressable
              key={index}
              style={[
                selectedItem?.id === item.id ? s.dropdownItemSelected : s.dropdownItem,
              ]}
              onPress={() => handleSelect(item)}
            // onPressOut={() => setSelectedItem(null)}
            >
              <Text>{item.name}</Text>
            </Pressable>

          ))}
        </View>
      ) : null}
    </View>
  );
}
