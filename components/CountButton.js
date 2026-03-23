import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";

export const CountButton = ({ text, submit }) => (
  <TouchableOpacity style={styles.button} onPress={submit}>
    <Text style={CommonStyles.textItem}>{text}</Text>
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
});
