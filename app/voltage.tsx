import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "./firebaseConfig"; 

export default function VoltageScreen() {
  const [voltage1, setVoltage1] = useState(0); // Sensor 1
  // const [voltage2, setVoltage2] = useState(0); // Sensor 2

  useEffect(() => {
    const dbRef = getDatabase();

    // Fetch voltage1 (Junction 1)
    onValue(ref(dbRef, "sensors/voltage1"), (snapshot) => {
      if (snapshot.exists()) {
        setVoltage1(snapshot.val());
      }
    });

    // Fetch voltage2 (Junction 2)
    // onValue(ref(dbRef, "sensors/voltage2"), (snapshot) => {
    //   if (snapshot.exists()) {
    //     setVoltage2(snapshot.val());
    //   }
    // });

  }, []);

  // ⚡ Calculate voltage difference
  // const voltageDifference = Math.abs(voltage1 - voltage2);

  return (
    <ImageBackground 
      source={require("../assets/images/hoplites logo.png")}  
      style={styles.background}
      imageStyle={{ opacity: 0.1 }} // Light background effect
    >
      <View style={styles.container}>
        <Text style={styles.title}>Voltage Monitoring</Text>

        {/* Voltage Sensor 1 */}
        <View style={styles.voltageBar}>
          <Text style={styles.voltageText}>Junction 1: {voltage1} V</Text>
        </View>

        {/* Voltage Sensor 2
        <View style={styles.voltageBar}>
          <Text style={styles.voltageText}>Junction 2: {voltage2} V</Text>
        </View> */}

        {/* Voltage Difference */}
        {/* <Text style={styles.differenceText}>
          Voltage Difference: {voltageDifference.toFixed(2)} V
        </Text> */}
      </View>
    </ImageBackground>
  );
}

// ✅ Styling
const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  voltageBar: {
    width: "80%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  voltageText: { color: "white", fontSize: 18, fontWeight: "bold" },
  differenceText: { fontSize: 20, fontWeight: "bold", marginTop: 20 },
});
