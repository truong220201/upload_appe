import React, { useState } from "react";
import { CheckBox, Icon } from "react-native-elements";
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
  ActivityIndicator,
  Easing,
  Dimensions,
} from "react-native";
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded,
// } from 'expo-ads-admob'
import * as Animatable from "react-native-animatable";

class thanhTich extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      n: [false, false, false],
    };
  }

  render() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    let id = 0;
    var myloop = [];

    for (let i = 0; i <= 5; i++) {
      myloop.push(
        <View key={i} style={{ zIndex: 200 }}>
          <TouchableOpacity
            onPress={() => null}
            style={{
              height: windowHeight / 10,
              backgroundColor: "#fff",
              elevation: 2,
              marginBottom: 15,
              flexDirection: "row",
              borderRadius: 4,
            }}
          >
            <View
              style={{
                flex: 1,
                padding: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ width: windowWidth / 9, height: windowWidth / 9 }}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 50,
                  }}
                  source={{
                    uri: "https://i.ytimg.com/an_webp/4tRohPoPnT4/mqdefault_6s.webp?du=3000&sqp=CKLryJQG&rs=AOn4CLBAPLoaabWILCGTjspr6Qug_DTjgg",
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 5,
                padding: 5,
                justifyContent: "center",
                borderWidth: 0,
              }}
            >
              <View style={{}}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, color: "#565659" }}
                >
                  Name
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ borderRightWidth: 1, paddingRight: 5 }}>
                    0123456789
                  </Text>
                  <Text style={{ paddingLeft: 5 }}>Name123456@gmail.com</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.pressCheckUser}
              onPress={() => null}
            >
              <View style={styles.aCenter}>
                <Icon color="black" style={{}} size={40} name="more-vert" />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <>
        <View style={styles.container}>
          {
            //Header
          }
          <View style={{ flex: 1, borderWidth: 1, width: "100%" }}></View>
          {
            //Content
          }
          <View style={{ flex: 8, borderWidth: 1, width: "100%" }}>
            <View style={styles.userInfoListView}>
              <View style={{}}>{myloop}</View>
            </View>
          </View>
          {
            //Footer
          }
          <View style={{ flex: 1, borderWidth: 1, width: "100%" }}></View>
        </View>
      </>
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
  userInfoListView: {
    borderWidth: 0,
    flex: 9,
    padding: 10,
  },
  pressCheckUser: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  aCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default thanhTich;
