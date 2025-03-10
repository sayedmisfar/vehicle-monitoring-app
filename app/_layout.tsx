import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="index" options={{ drawerLabel: "Home", title: "Home" }} />
      {/* <Drawer.Screen name="dashboard" options={{ drawerLabel: "Dashboard", title: "Dashboard" }} /> */}
      <Drawer.Screen name="heartrate" options={{ drawerLabel: "Heart Rate", title: "Heart Rate Monitor" }} />
      <Drawer.Screen name="alcohol" options={{ drawerLabel: "Alcohol Test", title: "Alcohol Detection" }} />
      <Drawer.Screen name="voltage" options={{ drawerLabel: "Voltage", title: "Voltage detection" }} />
    </Drawer>
  );
}
