// import React, { useState, useEffect } from "react";
// import { View, Text, ImageBackground, StyleSheet } from "react-native";
// import { AnimatedCircularProgress } from "react-native-circular-progress";
// import { ref, onValue } from "firebase/database";
// import { db } from "./firebaseConfig"; // ✅ Import the configured database instance

// export default function DashboardScreen() {
//   const [batteryPercentage, setBatteryPercentage] = useState(0);
//   const [motorRPM, setMotorRPM] = useState(0);
//   const [voltage, setVoltage] = useState(0);
//   const [batteryTemp, setBatteryTemp] = useState(0);

//   useEffect(() => {
//     // Fetch battery percentage
//     const batteryRef = ref(db, "sensors/batteryPercentage");
//     onValue(batteryRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setBatteryPercentage(snapshot.val());
//       }
//     });

//     // Fetch motor RPM
//     const motorRef = ref(db, "sensors/motorspeed");
//     onValue(motorRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setMotorRPM(snapshot.val());
//       }
//     });

//     // Fetch voltage
//     const voltageRef = ref(db, "sensors/voltage");
//     onValue(voltageRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setVoltage(snapshot.val());
//       }
//     });

//     // Fetch battery temperature
//     const tempRef = ref(db, "sensors/batteryTemp");
//     onValue(tempRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setBatteryTemp(snapshot.val());
//       }
//     });

//     // Cleanup function to prevent memory leaks
//     return () => {
//       onValue(batteryRef, () => {}); 
//       onValue(motorRef, () => {}); 
//       onValue(voltageRef, () => {}); 
//       onValue(tempRef, () => {}); 
//     };
//   }, []);

//   return (
//     <ImageBackground 
//       source={require("../assets/images/hoplites logo.png")} 
//       style={styles.logoBackground} 
//       imageStyle={{ opacity: 0.2 }}
//     >
//       <View style={styles.container}>
//         <Text style={styles.title}>Dashboard</Text>

//        {/* Battery Percentage */}
// <View style={styles.gaugeContainer}>
//   <Text style={styles.label}>Battery %</Text>
//   <AnimatedCircularProgress
//     size={120}  // Reduced from 150 to 120
//     width={10}  // Slightly reduced stroke width
//     fill={batteryPercentage}
//     tintColor="red"
//     backgroundColor="#d3d3d3"
//   />
//   <Text style={styles.value}>{batteryPercentage}%</Text>
// </View>

// {/* Motor Speed */}
// <View style={styles.gaugeContainer}>
//   <Text style={styles.label}>Speed</Text>
//   <AnimatedCircularProgress
//     size={120}  // Reduced from 150 to 120
//     width={10}
//     fill={(motorRPM / 58) * 100}
//     tintColor="yellow"
//     backgroundColor="#d3d3d3"
//   />
//   <Text style={styles.value}>{motorRPM} KM/H</Text>
// </View>

// {/* Battery Voltage */}
// <View style={styles.gaugeContainer}>
//   <Text style={styles.label}>Voltage (V)</Text>
//   <AnimatedCircularProgress
//     size={120}  // Reduced from 150 to 120
//     width={10}
//     fill={(voltage / 60) * 100}
//     tintColor="black"
//     backgroundColor="#d3d3d3"
//   />
//   <Text style={styles.value}>{voltage} V</Text>
// </View>

// {/* Battery Temperature */}
// <View style={styles.gaugeContainer}>
//   <Text style={styles.label}>Battery Temp (°C)</Text>
//   <AnimatedCircularProgress
//     size={120}  // Reduced from 150 to 120
//     width={10}
//     fill={batteryTemp}
//     tintColor="grey"
//     backgroundColor="#d3d3d3"
//   />
//   <Text style={styles.value}>{batteryTemp}°C</Text>
// </View>

//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   logoBackground: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   container: { 
//     flex: 1, 
//     justifyContent: "center", 
//     alignItems: "center", 
//     backgroundColor: "rgba(255, 255, 255, 0.7)", 
//     width: "100%",
//     padding: 20,
//   },
//   title: { 
//     fontSize: 26, 
//     fontWeight: "bold", 
//     marginBottom: 20 
//   },
//   gaugeContainer: { 
//     marginBottom: 20, 
//     alignItems: "center" 
//   },
//   label: { 
//     fontSize: 16, 
//     fontWeight: "bold", 
//     marginBottom: 5 
//   },
//   value: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 5,
//   },
// });
