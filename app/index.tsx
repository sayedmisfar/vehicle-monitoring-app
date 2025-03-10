import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { listenForAlcoholAlerts } from "./firebaseConfig"; // ✅ Import listener

export default function HomeScreen() {
  useEffect(() => {
    listenForAlcoholAlerts(); // ✅ Start listening for Firebase alerts
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/hoplites logo.png")} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Welcome to Team Hoplites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 500,
    height: 500,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
});
