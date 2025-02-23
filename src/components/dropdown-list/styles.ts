import { StyleSheet } from "react-native";
import { colors } from "../../themes/colors";

export const s = StyleSheet.create({
  dropdown: {
    position: "relative",
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.grayLight,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 220,
    borderWidth: 1,
    borderColor: colors.grayBorder,
  },
  placeholder: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.grayDark,
  },
  chevron: {
    transform: [{ rotate: "90deg" }],
    // transition: "transform 0.2s ease-in-out",
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 5,
    flexDirection: "column",

    maxHeight: 200,
    overflow: "scroll",

    backgroundColor: colors.white,
    marginTop: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.grayBorder,
  },
  scrollView: {
    maxHeight: 200,
  },
  dropdownItem: {
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: 220,
    borderRadius: 6,
  },
  dropdownItemSelected: {
    backgroundColor: colors.prussianBluePrimary,
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: 220,
    borderRadius: 6,
  },
  dropdownItemText: {
    fontSize: 14,
    color: colors.grayDark,
  },
  dropdownItemTextSelected: {
    color: colors.white,
  },
  dropdownItemPressed: {
    backgroundColor: "#F0F0F0",
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.grayBorder,
  },
  disabledText: {
    color: "#888888",
  },
});
