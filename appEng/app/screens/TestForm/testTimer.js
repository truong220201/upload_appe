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

class TestTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      n: [false, false, false],
      open: false,
      flexQS: 3,
      flexAnw: 6,
    };
  }

  thaydoi(i) {
    var arr = [...this.state.n];
    arr[i] = !this.state.n[i];
    this.setState({ n: arr });
    console.log(arr);
  }
  upDown() {
    if (this.state.open == true) {
      this.setState({
        flexQS: 9,
        flexAnw: 0,
        open: false,
      });
    } else {
      this.setState({
        flexQS: 3,
        flexAnw: 6,
        open: true,
      });
    }
  }

  render() {
    let id = 0;
    const fadeIn = {
      from: {
        opacity: 0,
        top: 10,
        left: 0,
      },
      to: {
        opacity: 1,
        top: 50,
        left: 100,
      },
    };
    const zoomOut = {
      0: {
        top: 10,
        opacity: 0,
        scale: 0,
      },
      0.5: {
        top: 15,
        opacity: 1,
        scale: 0.3,
      },
      1: {
        top: 20,
        opacity: 1,
        scale: 1,
      },
    };
    const source = {
      html: `
    <p style='text-align:center;'>
      Hello World!
    </p>`,
    };
    const ytb = "https://www.youtube.com/watch?v=yiZZeK-y6cI";
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    return (
      <>
        <View style={styles.container}>
          <View style={{ flex: 2, borderWidth: 0, width: "100%" }}>
            <View style={{ flex: 2, borderWidth: 0, width: "100%" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  paddingRight: 5,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => this.nopbai(false)}
                  style={styles.btnNopbai}
                >
                  <Text style={{ color: "#fff", fontSize: 15 }}>Nộp bài</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderWidth: 0,
                paddingTop: 0,
                flex: 2,
                paddingBottom: 0,
              }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ borderWidth: 0 }}
              >
                {[...Array(20)].map((o, n) => {
                  if (n % 4 == 0) {
                    return (
                      <TouchableOpacity
                        key={n}
                        onPress={() => null}
                        style={{
                          borderWidth: 0,
                          margin: 5,
                          height: windowHeight / 17,
                          width: windowHeight / 17,
                          borderRadius: 10,
                          //borderColor:'#1CC625',
                          backgroundColor: "#63cc7b",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 15 }}>
                          {n + 1}
                        </Text>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        key={n}
                        onPress={() => null}
                        style={{
                          borderWidth: 0,
                          margin: 5,
                          height: windowHeight / 22,
                          width: windowHeight / 22,
                          borderRadius: 30,
                          //borderColor:'#1CC625',
                          backgroundColor: "#63cc7b",
                          alignItems: "center",
                          alignSelf: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 15 }}>
                          {n + 1}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
          <View
            style={{ flex: this.state.flexQS, borderWidth: 0, width: "100%" }}
          >
            <View style={styles.vw2}>
              <View style={{ flex: 5, borderWidth: 0, width: "100%" }}>
                <ScrollView>
                  <Text style={styles.txtLevel}>
                    Câu 1:Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum{" "}
                  </Text>
                </ScrollView>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderColor: "black",
              }}
            >
              <TouchableOpacity onPress={() => this.upDown()}>
                <Icon
                  name={"arrow-forward-ios"}
                  size={20}
                  color={"#53ad71"}
                  style={{ margin: 5 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ flex: this.state.flexAnw, borderWidth: 0, width: "100%" }}
          >
            <Text>Đáp án...</Text>
          </View>
          <View style={{ flex: 1, borderWidth: 0, width: "100%" }}>
            <View style={styles.vw4}>
              <TouchableOpacity
                onPress={() => this.goBack(this.state.itemQ - 1)}
                style={{
                  display: this.state.hideBack,
                  flexDirection: "row",
                  height: "58%",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  justifyContent: "flex-start",
                }}
              >
                <View style={styles.btnNext}>
                  <Icon
                    name={"arrow-back-ios"}
                    size={20}
                    color={"#53ad71"}
                    style={{ margin: 5 }}
                  />
                </View>
                <Text style={styles.txtNext}>Câu trước đó</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.goNext(this.state.itemQ + 1)}
                style={{
                  display: this.state.hideNext,
                  flexDirection: "row",
                  height: "58%",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Text style={styles.txtNext}>Câu kế tiếp</Text>
                <View style={styles.btnNext}>
                  <Icon
                    name={"arrow-forward-ios"}
                    size={20}
                    color={"#53ad71"}
                    style={{ margin: 5 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
  //content question
  vw2: {
    width: "100%",
    flex: 5,
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: "center",
    borderWidth: 0,
  },
  txtLevel: {
    color: "#858585",
    fontSize: 20,
    //marginBottom:'2%',
    flexDirection: "row",
    borderWidth: 0,
  },
  //end content question

  //footer
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
  btnNext: {
    borderWidth: 2,
    margin: 5,
    height: 50,
    width: 50,
    borderRadius: 30,
    borderColor: "#1CC625",
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrev: {
    borderWidth: 2,
    margin: 5,
    height: 50,
    width: 50,
    borderRadius: 30,
    borderColor: "#1CC625",
    alignItems: "center",
    justifyContent: "center",
  },
  vw4: {
    width: "100%",
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderWidth: 0,
  },
  //end footer
});

export default TestTimer;
