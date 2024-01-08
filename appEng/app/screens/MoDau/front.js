import React, { useState } from "react";
import {
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

export default class DanhSach extends React.Component {
  render() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const { navigation } = this.props;
    return (
      <ImageBackground
        style={styles.vw1a}
        source={{
          uri: "https://images.unsplash.com/photo-1543109740-4bdb38fda756?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVhcm4lMjBlbmdsaXNofGVufDB8fDB8fHww",
        }}
      >
        <LinearGradient
          colors={["#e6e6e60a", "#e6e6e60a", "#e6e6e60a", "#fff"]}
          style={styles.container}
        >
          <View
            style={{
              flex: 2,
              width: "100%",
              alignItems: "center",
              top: windowHeight / 5,
            }}
          >
            <Animatable.Text
              animation="slideInDown"
              iterationCount={1}
              direction="alternate"
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 50,
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                }}
              >
                Learn EngLish
              </Text>
            </Animatable.Text>
          </View>
          <Image
            style={{
              width: windowWidth / 2.2,
              height: windowHeight / 15,
              top: 120,
              marginLeft: "50%",
            }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn2pNjDggT92ubZnLHpoPFtKVUA4ey89I8fQ5gaVdOSxcuoiPe81wgkPRcJH0cxf3SeRc&usqp=CAU",
            }}
          />
          <Image
            style={{
              width: windowWidth / 2.2,
              height: windowHeight / 15,
              top: "19%",
              marginLeft: "50%",
            }}
            source={{
              uri: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/287378086/original/9d73baaa267576342d8001e57bea52be18832033/design-better-elegant-amazing-online-ielts-training-logo.png",
            }}
          />
          <View
            style={{
              flex: 2,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              justifyContent: "flex-end",
            }}
          >
            <TouchableHighlight
              style={styles.btnStart}
              onPress={() =>
                navigation.navigate("home", { uid: "0", email: "Anonymous" })
              }
              underlayColor="white"
            >
              <View>
                <Text style={styles.btnTextStart}>BẮT ĐẦU NGAY NÀO</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnLoggin}
              onPress={() => navigation.navigate("dangnhap")}
              underlayColor="white"
            >
              <View>
                <Text style={styles.btnTextLoggin}>TÔI ĐÃ CÓ TÀI KHOẢN</Text>
              </View>
            </TouchableHighlight>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  vw1a: {
    height: "100%",
    width: "100%",
    zIndex: 100,
  },
  btnStart: {
    marginBottom: 20,
    width: "90%",
    height: "17%",
    alignItems: "center",
    backgroundColor: "#6bdb90",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 2,
  },
  btnLoggin: {
    marginBottom: 30,
    width: "90%",
    height: "17%",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 2,
  },
  btnTextStart: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  btnTextLoggin: {
    textAlign: "center",
    color: "#69d69e",
    fontSize: 20,
  },
});
