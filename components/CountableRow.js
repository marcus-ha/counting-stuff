import { Text, View, StyleSheet, Alert } from "react-native";
import { CountButton } from "./CountButton";
import { CommonStyles } from "../styles/CommonStyles";

export const CountableRow = ({ countable, changeCount, index, removeCountable }) => {
  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      { text: "Yes", onPress: () => removeCountable(index) },
    ]);
  };

  return (
    <View style={CommonStyles.row}>
      <View style={styles.nameColumn}>
        <Text style={CommonStyles.textItem}>{countable.name}</Text>
        <Text style={CommonStyles.textItem}>{countable.count}</Text>
      </View>

      <View style={styles.buttonColumn}>
        <CountButton text="+" submit={() => changeCount(1, index)} />
        <CountButton
          text="-"
          submit={() => changeCount(-1, index)}
          disabled={countable.count === 0}
        />
      </View>

      <View style={styles.deleteColumn}>
        <CountButton text="X" submit={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameColumn: {
    flex: 0.6,
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
  buttonColumn: {
    flex: 0.25,
    justifyContent: "center",
  },
  deleteColumn: {
    flex: 0.15,
    justifyContent: "center",
  },
});