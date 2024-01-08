import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Icon } from "react-native-elements";
import Home from "./app/screens/Home/Home";
import front from "./app/screens/MoDau/front";

const Tab = createMaterialBottomTabNavigator();

function BTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#5fc673"
      inactiveColor="#dadada"
      barStyle={{ backgroundColor: "#fff" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="tab khác"
        component={front}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon name="list" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
export default BTabs;
