import { Text, View, StyleSheet } from "react-native";
import { CountButton } from "./CountButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount, index }) => (
  <View style={CommonStyles.row}>
    <View style={styles.nameColumn}>
      <Text style={CommonStyles.textItem}>{countable.name}</Text>
      <Text style={CommonStyles.textItem}>{countable.count}</Text>
    </View>
    <View style={styles.buttonColumn}>
      <CountButton
        text={"+"}
        submit={() => {
          changeCount(1, index);
        }}
      />
      <CountButton
        text={"-"}
        submit={() => {
          changeCount(-1, index);
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.8,
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
  buttonColumn: {
    flex: 0.2,
  },
});
