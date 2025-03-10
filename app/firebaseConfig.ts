import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database"; // ✅ Import Firebase Realtime Database
import { getFirestore } from "firebase/firestore"; 
import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyBzEYkA2oQf7qrL8f8G36KTYPV6UdwQoU4",
  authDomain: "ekart-3b7f0.firebaseapp.com",
  databaseURL: "https://ekart-3b7f0-default-rtdb.firebaseio.com/",
  projectId: "ekart-3b7f0",
  storageBucket: "ekart-3b7f0.appspot.com",
  messagingSenderId: "94516208033",
  appId: "1:94516208033:android:360fb4f91e691515852be0",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); // Realtime Database
export const firestore = getFirestore(app);

// ✅ Listen for Alcohol Alerts in Firebase
export function listenForAlcoholAlerts() {
  const alertRef = ref(db, "/alerts/alcoholWarning");

  onValue(alertRef, (snapshot) => {
    const alertStatus = snapshot.val();
    if (alertStatus) {
      Alert.alert("🚨 Alcohol Alert!", "High alcohol level detected!");
    }
  });
}
