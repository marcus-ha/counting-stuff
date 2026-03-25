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

  const changeCount = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;
    setCountables(newState);
  };

  const addNewCountable = (name) => {
    const trimmedName = name.trim();

    // Stoppa tomma namn och dubbletter
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

  const removeCountable = (index) => {
    const newState = countables.filter((_, i) => i !== index);
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
            <Text style={styles.emptyText}>
              Inget att räkna ännu!
            </Text>
          ) : (
            countables.map((countable, index) => (
              <CountableRow
                countable={countable}
                key={countable.name}
                changeCount={changeCount}
                index={index}
                removeCountable={removeCountable}
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
