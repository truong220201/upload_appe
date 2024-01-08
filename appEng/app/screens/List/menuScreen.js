import React, { useState } from "react";
import {
  Dimensions,
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
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";

import * as Animatable from "react-native-animatable";

//css
import { styles } from "../Css/CssList/CssMenu";

export default class LayerMenu extends React.Component {
  constructor(props) {
    super(props);
    const { route, navigation } = this.props;
    const { uid, email, idLoai, id } = route.params;
    this.uid = uid;
    this.idLoai = idLoai;
    this.email = email;
    this.nvt = navigation;
    this.id = id;
  }

  render() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    console.log(this.id);
    const tsp = {
      from: {
        opacity: 0,
        left: 700,
      },
      to: {
        opacity: 1,
        left: 0,
      },
    };
    const pst = {
      from: {
        opacity: 0,
        left: -700,
      },
      to: {
        opacity: 1,
        left: 0,
      },
    };
    return (
      <ImageBackground
        style={styles.container}
        source={{
          uri: "https://img.freepik.com/premium-vector/back-school-green-chalkboard-doodles-office-supplies-education-school-chalkboard_101087-2207.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1703289600&semt=ais",
        }}
      >
        <LinearGradient
          style={styles.inContainer}
          colors={["#40d7779e", "#40d7779e", "#ffffff9e", "#fff"]}
        >
          <View style={styles.vw1}>
            <Text style={styles.txtTitle}></Text>
          </View>
          <View style={styles.vw2}>
            <Animatable.Text animation={pst} style={{ width: windowWidth }}>
              <View style={{ width: windowWidth }}>
                <TouchableOpacity
                  onPress={() => {
                    this.nvt.navigate("gioithieu", {
                      id: 0,
                      idLoai: this.idLoai,
                      ten: 0,
                      uid: this.uid,
                      email: this.email,
                    });
                  }}
                  style={styles.btnInfo}
                >
                  <View
                    style={{
                      height: "100%",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      color={"#6dde9e"}
                      size={35}
                      name="lightbulb-outline"
                    />
                  </View>
                  <View
                    style={{
                      height: "100%",
                      flex: 4,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      Giới thiệu
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "100%",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Icon color={"#88e7c6"} size={35} name="done" />
                  </View>
                </TouchableOpacity>
              </View>
            </Animatable.Text>
            <Animatable.Text animation={pst} style={{ width: windowWidth }}>
              <View style={{ width: windowWidth }}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("pressss");
                    this.nvt.navigate("learn", {
                      loaiId: this.idLoai,
                      id: this.idLoai,
                      ten: 0,
                      uid: this.uid,
                      email: this.email,
                    });
                  }}
                  style={styles.btnInfo}
                >
                  <View
                    style={{
                      height: "100%",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      color={"#6dde9e"}
                      size={35}
                      name="lightbulb-outline"
                    />
                  </View>
                  <View
                    style={{
                      height: "100%",
                      flex: 4,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      Học ngay
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "100%",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Icon color={"#88e7c6"} size={35} name="done" />
                  </View>
                </TouchableOpacity>
              </View>
            </Animatable.Text>
            <Animatable.Text animation={tsp} style={{ width: windowWidth }}>
              <View style={{ width: windowWidth }}>
                <TouchableOpacity
                  onPress={() => {
                    this.nvt.navigate("huongdan", {
                      id: this.id,
                      ten: this.ten,
                      uid: this.uid,
                      email: this.email,
                      socau: 10,
                      tg: 15,
                    });
                  }}
                  style={styles.btnInfo}
                >
                  <View
                    style={{
                      height: "100%",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Icon color={"#6dde9e"} size={35} name="auto-awesome" />
                  </View>
                  <View
                    style={{
                      height: "100%",
                      flex: 4,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      Làm bài test
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "100%",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Icon color={"#88e7c6"} size={35} name="done" />
                  </View>
                </TouchableOpacity>
              </View>
            </Animatable.Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }
}
