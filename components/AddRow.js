import { useState } from "react";
import { View, TextInput } from "react-native";
import { CommonStyles } from "../styles/CommonStyles";
import { CountButton } from "./CountButton";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />

      <CountButton
        text="Add"
        submit={() => {
          if (name.trim() !== "") {
            addNewCountable(name);
            setName("");
          }
        }}
      />
    </View>
  );
};

const styles = {
  row: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e9e9e9",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#e9e9e9",
  },
};