import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Front from "./app/screens/MoDau/front";
import Chontrinhdo from "./app/screens/TestForm/chontrinhdo";
//layer trang chủ
import Home from "./app/screens/Home/Home";
//layer sau khi ấn vào từng danh mục tại menu
import MenuScreen from "./app/screens/List/menuScreen";
//layer footer
import BTabs from "./bottomTabs";
//layer hướng dẫn trước khi kiểm tra
import Huongdan from "./app/screens/HuongDan/huongdan";
//layer kiểm tra
import TestScreen from "./app/screens/BaiTest/Test/testScreen";
//xem ket qua
import Ketqua from "./app/screens/BaiTest/KetQua/ketqua";
//
import Xemlai from "./app/screens/BaiTest/KetQua/XemLai/xemlaibaitest";
//test
import TestTimer from "./app/screens/TestForm/testTimer";
//dang nhap dang ki
import LoginScreen from "./app/screens/DangNhapDangKy/dangnhap";
import SignUpScreen from "./app/screens/DangNhapDangKy/dangki";
//
import Luachon from "./app/screens/List/luachon";
//
import Listbt from "./app/screens/List/listbt";
//
import ProfileScreen from "./app/screens/User/userInfo";
//
import GioiThieu from "./app/screens/TestForm/gioithieu";
//
import Speech from "./app/screens/HocSpeech/speech";
import Speechadd from "./app/screens/HocSpeech/speechadd";
import Sound from "./app/screens/HocSpeech/sound";
import Learnspeech from "./app/screens/HocSpeech/learnspeech";
//thanh tich
import ThanhTich from "./app/screens/TestForm/thanhtich";
import Game from "./app/screens/Games/Game";
import Score from "./app/screens/Games/score/Score";
import Learn from "./app/screens/Learn/learn";
import Bxh from "./app/screens/bxh/bxh";
import "expo-dev-client";
import {
  StripeProvider,
  usePaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";
import Thanhtoan from "./app/screens/thanhtoan/thanhtoan";
const Stack = createNativeStackNavigator();
//set màu cho screen
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "red",
  },
};

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <StripeProvider
        publishableKey="pk_test_51OWWwgDQwQuSaQu5LHsxqhalvyLlV71pMba1HN8wEEjJ2EpYIEFwJAgWxgHfDM7EKN2hm4yFuownakypnX0XHs6600lxdFqwu8"
        // stripeAccountId="cus_PLFgrmegR09BGo"
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="front"
            screenOptions={{ headerShown: true }}
          >
            <Stack.Screen
              name="front"
              component={Front}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="game"
              component={Game}
              options={{
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="chontrinhdo"
              component={Chontrinhdo}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="menuScreen"
              component={MenuScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="huongdan"
              component={Huongdan}
              options={{
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="Điểm"
              component={Score}
              options={{
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="thanhtoan"
              component={Thanhtoan}
              options={{
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "black",
              }}
            />
            <Stack.Screen
              name="testScreen"
              component={TestScreen}
              options={{
                headerShown: false,
                title: "",
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerRight: () => (
                  <TouchableOpacity style={styles.btnNopbai}>
                    <Text style={{ color: "white", fontSize: 15 }}>
                      Nộp bài
                    </Text>
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="tm"
              component={TestTimer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="btab"
              component={BTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="kq"
              component={Ketqua}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="xemLaiTestScreen"
              component={Xemlai}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="dangnhap"
              component={LoginScreen}
              options={{
                headerShown: true,
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="dangky"
              component={SignUpScreen}
              options={{
                headerShown: true,
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="luachon"
              component={Luachon}
              options={{
                headerShown: true,
                title: "Kiến thức cần thiết cho bạn",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "#009f00",
              }}
            />
            <Stack.Screen
              name="listbt"
              component={Listbt}
              options={{
                headerShown: true,
                title: "Chi tiết",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "#009f00",
              }}
            />
            <Stack.Screen
              name="ps"
              component={ProfileScreen}
              options={{
                headerShown: true,
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="gioithieu"
              component={GioiThieu}
              options={{
                headerShown: true,
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="learn"
              component={Learn}
              options={{
                headerShown: true,
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="speech"
              component={Speech}
              options={{
                headerShown: true,
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="speechadd"
              component={Speechadd}
              options={{
                headerShown: true,
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="sound"
              component={Sound}
              options={{
                headerShown: true,
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="learnspeech"
              component={Learnspeech}
              options={{
                headerShown: true,
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="thanhtich"
              component={ThanhTich}
              options={{
                headerShown: true,
                title: "",
                headerTransparent: true,
                headerShadowVisible: false,
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="bxh"
              component={Bxh}
              options={{ title: "Bảng xếp hạng" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnNopbai: {
    backgroundColor: "#4fad68",
    borderRadius: 5,
    width: 100,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  timer: {
    alignSelf: "center",
    width: 150,
  },
});
