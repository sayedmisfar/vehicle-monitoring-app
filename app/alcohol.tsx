import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { ref, onValue, set } from "firebase/database";
import { db } from "./firebaseConfig";

export default function AlcoholLevel() {
  const [alcoholRaw, setAlcoholRaw] = useState(0);
  const [alcoholPercentage, setAlcoholPercentage] = useState(0);
  const [threshold, setThreshold] = useState(90);
  const [alertTriggered, setAlertTriggered] = useState(false);

  useEffect(() => {
    const alcoholRef = ref(db, "sensors/alcoholLevel");

    const unsubscribe = onValue(alcoholRef, (snapshot) => {
      if (snapshot.exists()) {
        const rawValue = snapshot.val();
        const percentage = Math.min(Math.max((rawValue / 4095) * 100, 0), 100);

        setAlcoholRaw(rawValue);
        setAlcoholPercentage(percentage);

        // 🚨 Handle alert logic
        if (percentage > threshold && !alertTriggered) {
          Alert.alert("🚨 High Alcohol Level!", `Alcohol level is at ${percentage.toFixed(1)}%!`);
          setAlertTriggered(true);
          set(ref(db, "/alerts/alcoholWarning"), true);
        } else if (percentage <= threshold && alertTriggered) {
          setAlertTriggered(false);
          set(ref(db, "/alerts/alcoholWarning"), false);
        }
      }
    });

    return () => unsubscribe();
  }, [threshold, alertTriggered]);

  // ✅ Updates threshold & resets alert state if needed
  const handleThresholdChange = (text:string) => {
    const newThreshold = parseInt(text) || 0;
    setThreshold(newThreshold);

    if (alcoholPercentage <= newThreshold && alertTriggered) {
      setAlertTriggered(false);
      set(ref(db, "/alerts/alcoholWarning"), false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Alcohol Level (%)</Text>
      <AnimatedCircularProgress
        size={200}
        width={18}
        fill={alcoholPercentage}
        tintColor={alcoholPercentage > threshold ? "red" : "#800080"}
        backgroundColor="#d3d3d3"
      />
      <Text style={styles.value}>{alcoholPercentage.toFixed(1)}%</Text>
      <Text style={styles.rawValue}>Analog Value: {alcoholRaw}</Text>

      {/* <TextInput
        style={styles.input}
        placeholder="Set Threshold (%)"
        keyboardType="numeric"
        value={threshold.toString()}
        onChangeText={handleThresholdChange}
      />
      <Button title="Set Threshold" onPress={() => Alert.alert("✅ Threshold Updated!")} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 80,
  },
  label: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  value: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  rawValue: {
    fontSize: 19,
    color: "#666",
    marginTop: 5,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginTop: 20,
    borderRadius: 5,
    textAlign: "center",
  },
});
