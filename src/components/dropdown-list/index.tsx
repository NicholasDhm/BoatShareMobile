import { View, Text, Pressable } from "react-native";
import { s } from "./styles";
import { ChevronRight } from "lucide-react-native";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth";

export type DropdownListProps = {
  list: { id: number; label: string }[];
  onSelect?: (item: { id: number; label: string } | null) => void;
  value?: { id: number; label: string } | null;
};

export function DropdownList({ list, onSelect, value }: DropdownListProps) {
  const [viewDropdown, setViewDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: number; label: string } | null>(
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

  function handleSelect(item: { id: number; label: string }) {
    setSelectedItem(item);
    onSelect?.(item);
    handlePress();
  }

  return (
    <View style={s.dropdown}>
      <Pressable style={s.container} onPress={handlePress}>
        <Text style={s.placeholder}>{selectedItem?.label || "No boats"}</Text>

        <ChevronRight
          style={viewDropdown ? s.chevron : undefined}
          size={20}
          color={"black"}
        />
      </Pressable>

      {viewDropdown && list.length > 0 ? (
        <View style={s.dropdownList}>
          {list.map((item) => (
            <Pressable
              key={item.id}
              style={[
                selectedItem?.id === item.id ? s.dropdownItemSelected : s.dropdownItem,
              ]}
              onPress={() => handleSelect(item)}
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
