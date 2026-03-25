import { TouchableOpacity, Text, StyleSheet, Pressable } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";

export const CountButton = ({ text, submit, disabled, textStyle }) => (
  <TouchableOpacity
    style={[
      styles.button,
      disabled && styles.disabledButton
    ]}
    onPress={submit}
    disabled={disabled}
  >
    <Text style={[CommonStyles.textItem, textStyle]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    borderColor: "#e9e9e9",
    backgroundColor: "#e9e9e9",
    borderWidth: 1,
    margin: 5,

    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.20,
  },
});
