import { RadioButtons, SegmentedControls } from "react-native-radio-buttons";
import React, { useState, useEffect } from "react";
import {
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Button,
  StyleSheet,
  Alert,
  BackHandler,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

// import React from "react";

const Stack = createNativeStackNavigator();
export default class Ketqua extends React.Component {
  constructor(props) {
    super(props);
    const { navigation, route } = this.props;
    const {
      diem,
      item,
      itemK,
      ds,
      bailam,
      cauhoi,
      d0,
      d1,
      d2,
      d3,
      dapan,
      socau,
      uid,
      email,
    } = route.params;
    //this.itemRef = getDatabase(firebaseApp);
    //console.log(this.itemRef);
    //console.log(baitap)
    this.diems = diem;
  }

  render() {
    const { navigation, route } = this.props;
    const {
      diem,
      item,
      itemK,
      ds,
      bailam,
      cauhoi,
      d0,
      d1,
      d2,
      d3,
      dapan,
      socau,
      uid,
      email,
    } = route.params;
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    return (
      <ImageBackground
        style={{
          flex: 4,
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          height: windowHeight,
          width: windowWidth,
          backgroundColor: "#f5f5f500",
          zIndex: 100,
          flexDirection: "column",
          borderRadius: 20,
          borderWidth: 1,
          padding: 20,
        }}
        source={{
          uri: "https://images.template.net/wp-content/uploads/2015/12/Green-Zoom-Background.jpg",
        }}
      >
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={styles.wh}>
            Điểm số của bạn là :{this.diems}/{socau}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("xemLaiTestScreen", {
                diem: diem,
                item: item,
                itemK: itemK,
                ds: ds,
                bailam: bailam,
                cauhoi: cauhoi,
                d0: d0,
                d1: d1,
                d2: d2,
                d3: d3,
                dapan: dapan,
                socau: socau,
                uid: uid,
                email: email,
              })
            }
            style={styles.btnStart}
          >
            <Text style={styles.testy}>Xem lại bài Test</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("home", { uid: uid, email: email })
            }
            style={styles.btnStart}
          >
            <Text style={styles.testy}>Về trang chủ</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  wh: {
    paddingTop: 60,
    width: "100%",
    height: 300,
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "white",
  },
  testy: {
    fontWeight: "bold",

    color: "#fff",
    fontSize: 20,
  },
  btnStart: {
    borderRadius: 15,
    backgroundColor: "#0a9737",
    margin: 10,
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
