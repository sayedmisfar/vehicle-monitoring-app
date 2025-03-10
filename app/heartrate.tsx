import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { ref, onValue } from "firebase/database";
import { db } from "./firebaseConfig"; // Ensure correct path

export default function HeartRate() {
  const [heartRate, setHeartRate] = useState(0);

  useEffect(() => {
    const heartRateRef = ref(db, "sensors/heartRateBPM"); // Firebase path

    onValue(heartRateRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log("Heart Rate:", snapshot.val()); // Debugging
        setHeartRate(snapshot.val());
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Heart Rate (BPM)</Text>
      <AnimatedCircularProgress
        size={220} // Smaller gauge
        width={20}
        fill={(heartRate / 200) * 100} // Assume max BPM = 200
        tintColor="#ff007f"
        backgroundColor="#d3d3d3"
      />
      <Text style={styles.value}>{heartRate} BPM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    alignItems: "center", 
    marginVertical: 100 
  },
  label: { 
    fontSize: 23, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
});
  