import { Platform } from "react-native";

// Address to stripe server running on local machine
const LOCAL_URL =
  Platform.OS === "android" ? "http://10.0.2.2:4242" : "http://localhost:4242";
// Address to stripe server running on Glitch
const GLITCH_URL = "https://api.stripe.com";

export const API_URL = GLITCH_URL;
