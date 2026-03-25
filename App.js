import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { CountableRow } from "./components/CountableRow";
import { AddRow } from "./components/AddRow";
import { loadCountables, saveCountables } from "./storage/CountableStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";




export default function App() {
  const [countables, setCountables] = useState([]);

  const changeCount = (amount, name) => {
    const newState = countables.map((item) =>
      item.name === name
        ? { ...item, count: item.count + amount }
        : item
    );

    setCountables(newState);
  };

  const addNewCountable = (name) => {
    const trimmedName = name.trim();

    if (trimmedName === "") {
      Alert.alert("Error", "Name cannot be empty!");
      return;
    }

    const exists = countables.some(
      (item) => item.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (exists) {
      Alert.alert("Error", "This name already exists!");
      return;
    }

    const newState = [...countables, { name: trimmedName, count: 0 }];
    setCountables(newState);
  };

  const removeCountable = (name) => {
    const newState = countables.filter((item) => item.name !== name);
    setCountables(newState);
  };




  const editCountableName = (oldName, newName) => {
    const trimmedName = newName.trim();

    if (trimmedName === "") {
      Alert.alert("Error", "Name cannot be empty!");
      return;
    }

    const exists = countables.some(
      (item) =>
        item.name.toLowerCase() === trimmedName.toLowerCase() &&
        item.name !== oldName
    );

    if (exists) {
      Alert.alert("Error", "This name already exists!");
      return;
    }

    const newState = countables.map((item) =>
      item.name === oldName
        ? { ...item, name: trimmedName }
        : item
    );

    setCountables(newState);
  };


  const isLoaded = useRef(false);

  useEffect(() => {
    loadCountables().then((result) => {
      setCountables(result);
      isLoaded.current = true;
    });
  }, []);

  useEffect(() => {
    if (!isLoaded.current) return;
    saveCountables(countables);
  }, [countables]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          {countables.length === 0 ? (
            <Text style={styles.emptyText}>Inget att räkna ännu!</Text>
          ) : (
            [...countables]
              .sort((a, b) => b.count - a.count)
              .map((countable) => (
                <CountableRow
                  countable={countable}
                  key={countable.name}
                  changeCount={changeCount}
                  removeCountable={removeCountable}
                  editCountableName={editCountableName}
                />
              ))
          )}
        </ScrollView>

        <AddRow addNewCountable={addNewCountable} />
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#aaa",
    fontStyle: "italic",
  },
});
