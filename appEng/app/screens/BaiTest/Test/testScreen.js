import React, { useState, useEffect } from "react";
import {
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../../../components/firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RadioButtons } from "react-native-radio-buttons";
import { LinearGradient } from "expo-linear-gradient";
import { doc, setDoc } from "firebase/firestore";

import HTMLView from "react-native-htmlview";
import { WebView } from "react-native-webview";

//css
import { styles } from "../../Css/CssBaiTest";
//
import * as Animatable from "react-native-animatable";

const Stack = createNativeStackNavigator();

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    const { route, navigation } = this.props;
    this.nvt = navigation;
    const {
      baitap,
      n,
      ten,
      uid,
      email,
      itemK,
      nameqs,
      opt0,
      opt1,
      opt2,
      opt3,
      trueAns,
      socau,
      tg,
    } = route.params;
    console.log("uid form test:", uid);

    //doi mau
    this.tagsStyles = {
      span: {
        color: "black",
        fontSize: 18,
      },
    };
    this.tagsStylesB = {
      span: {
        color: "black",
        fontSize: 17,
      },
    };
    this.tagsStylesC = {
      span: {
        color: "#fff",
        fontSize: 17,
      },
    };
    //
    //khai bao cac bien
    this.uid = uid;
    this.email = email;
    this.i = baitap;
    this.detai = ten;
    this.num = n;
    this.diems = 0;
    //

    //state
    this.state = {
      socau: socau,
      isLoading: true,
      hideBack: "flex",
      hideNext: "flex",
      keys: [],
      itemQ: 1,
      opt0: opt0,
      opt1: opt1,
      opt2: opt2,
      opt3: opt3,
      itemK: itemK,
      nameqs: nameqs,
      tgian: tg,
      leng: 0,
      trueAns: trueAns,
      //test
      q: "",
      a1: "",
      a2: "",
      a3: "",
      a4: "",
      //
      selectedOption: "",
      optList: [],
      o: ["", "", "", ""],
      ans: "",
      answ: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
      ],
      idO: "",
    };
  }

  render() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    var l = this.state.itemQ;
    const questiona = this.state.q;

    const duoilentren = {
      from: {
        opacity: 0,
        top: 700,
      },
      to: {
        opacity: 1,
        top: 0,
      },
    };

    if (l == 1) {
      this.state.hideBack = "none";
    } else if (l == 10) {
      this.state.hideNext = "none";
    } else {
      this.state.hideNext = "flex";
      this.state.hideBack = "flex";
    }
    console.log("itemK=" + this.state.itemK);
    return (
      <SafeAreaView style={styles.container}>
        <Animatable.Text animation={duoilentren} style={{ width: windowWidth }}>
          <View style={{ width: windowWidth, height: windowHeight }}>
            <View style={styles.vw1}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  borderWidth: 0,
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    flex: 1,
                    justifyContent: "flex-start",
                    flexDirection: "row",
                  }}
                  onPress={() => this.qsExit()}
                >
                  <Icon
                    name={"arrow-back-ios"}
                    size={20}
                    color={"black"}
                    style={{ margin: 5 }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 5,
                  }}
                >
                  <CountdownTimer
                    onTimerEnd={() => this.nopbai(true)}
                    num={!this.chiatg() ? 10 : 50}
                  />
                  <Icon
                    name={"alarm"}
                    size={20}
                    color={"#1CC625"}
                    style={{ margin: 5 }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    paddingRight: 5,
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
                  paddingTop: 10,
                  flex: 2,
                  paddingBottom: 10,
                }}
              >
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ borderWidth: 0 }}
                >
                  {[...Array(this.state.socau)].map((o, n) => {
                    if (n + 1 == l) {
                      return (
                        <TouchableOpacity
                          key={n}
                          onPress={() => null}
                          style={{
                            borderWidth: 0,
                            margin: 5,
                            height: windowHeight / 17,
                            width: windowHeight / 17,
                            borderRadius: 30,
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
                      if (this.state.answ[n] != 0) {
                        return (
                          <TouchableOpacity
                            key={n}
                            onPress={() => this.goto(n + 1)}
                            style={{
                              borderWidth: 0,
                              margin: 5,
                              height: windowHeight / 17,
                              width: windowHeight / 17,
                              borderRadius: 30,
                              //borderColor:'#1CC625',
                              backgroundColor: "#79c98b8f",
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
                            onPress={() => this.goto(n + 1)}
                            style={{
                              borderWidth: 1,
                              margin: 5,
                              height: windowHeight / 17,
                              width: windowHeight / 17,
                              borderRadius: 30,
                              borderColor: "#b9b9b9",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text style={{ color: "#b9b9b9", fontSize: 15 }}>
                              {n + 1}
                            </Text>
                          </TouchableOpacity>
                        );
                      }
                    }
                  })}
                </ScrollView>
              </View>
            </View>
            <View style={{ flex: 5, borderWidth: 0 }}>
              {this.state.isLoading ? (
                <ActivityIndicator
                  style={styles.vw2}
                  size="large"
                  color="#00ff00"
                />
              ) : (
                <ScrollView
                  style={{ width: windowWidth }}
                  showsScrollIndicator={false}
                >
                  <View style={styles.vw2}>
                    <Text style={styles.txtLevel}>Câu {this.state.itemQ}</Text>

                    <HTMLView stylesheet={this.tagsStyles} value={questiona} />
                  </View>

                  <View
                    style={{
                      flex: 10,
                      borderWidth: 0,
                      width: "100%",
                      alignItems: "center",
                      padding: 20,
                    }}
                  >
                    <RadioButtons
                      options={this.state.o}
                      onSelection={this.setSelectedOption.bind(this)}
                      selectedOption={this.state.selectedOption}
                      renderOption={(option, selected, onSelect, index) => {
                        const windowWidth = Dimensions.get("window").width;
                        if (option == this.state.answ[this.state.itemQ - 1]) {
                          return (
                            <LinearGradient
                              key={index}
                              start={{ x: 0, y: 0.75 }}
                              end={{ x: 1, y: 0.25 }}
                              colors={[
                                "#6bdb91",
                                "#6bdb91",
                                "#6bdb91",
                                "#b9f5dc",
                              ]}
                              style={{
                                borderWidth: 0,
                                borderColor: "#1CC625",
                                borderRadius: 10,
                                padding: 15,
                                marginBottom: "6%",
                                elevation: 1,
                                height: windowHeight / 10,
                              }}
                            >
                              <TouchableOpacity
                                onPress={onSelect}
                                style={{
                                  flexDirection: "row",
                                  width: "100%",
                                  height: "100%",
                                }}
                              >
                                <Text style={styles.abcd}></Text>
                                <View
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderWidth: 0,
                                    borderRadius: 10,
                                    backgroundColor: "#ffffff",
                                  }}
                                >
                                  <WebView
                                    originWhitelist={["*"]}
                                    source={{ html: option }}
                                    style={{
                                      width: "280%",
                                      height: "280%",
                                      backgroundColor: "#ffffff00",
                                      borderWidth: 0,
                                      color: "red",
                                    }}
                                  />
                                </View>
                              </TouchableOpacity>
                            </LinearGradient>
                          );
                        } else {
                          return (
                            <TouchableOpacity
                              onPress={onSelect}
                              key={index}
                              style={{
                                //borderWidth:1,
                                //borderColor:'#b9b9b9',
                                elevation: 5,
                                backgroundColor: "white",
                                borderRadius: 10,
                                padding: 15,
                                flexDirection: "row",
                                marginBottom: "6%",
                                height: windowHeight / 10,
                              }}
                            >
                              <Text style={styles.abcd}></Text>
                              <View
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderWidth: 0,
                                  backgroundColor: "#ffffff00",
                                }}
                              >
                                <WebView
                                  originWhitelist={["*"]}
                                  source={{ html: option }}
                                  style={{ width: "280%", height: "280%" }}
                                />
                              </View>
                            </TouchableOpacity>
                          );
                        }
                      }}
                      index={9}
                      renderContainer={this.renderContainer}
                    />
                  </View>
                </ScrollView>
              )}

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
        </Animatable.Text>
      </SafeAreaView>
    );
  }
  //Thay doi bai tap
  check(inum) {
    console.log("bai : ", inum);
    console.log("length: ", this.state.item.length);
    //console.log('inum: ',inum)
    if (this.state.itemQ.length >= inum) {
      this.listenForItems(inum);
    } else {
      Alert.alert("Thông báo", "Phần này chưa có đủ bài tập...", [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    }
  }

  //reset sau moi lan lap
  reset() {
    this.setState({
      o: [],
      q: "",
      ans: "",
    });
    //loại bỏ số 1 sau mảng item sau mỗi lần lặp
    const valueToRemove = 1;
    const new_arr = this.state.itemK.filter((item) => item !== valueToRemove);
    this.setState({
      itemK: new_arr,
    });
  }

  //dat va lay du lieu user
  async setUser(email, diem, uid) {
    const db = getFirestore(firebaseApp);
    console.log("uiddddddd:", uid);
    await setDoc(doc(db, "User", uid), {
      Email: email,
      Diem: diem,
      Uid: uid,
    });
  }

  async getUser(uid) {
    const db = getFirestore(firebaseApp);
    const querySnapshotUser = await getDocs(collection(db, "User"));

    querySnapshotUser.forEach((doc) => {
      //console.log(`name qs : ${doc.data().Id_cate_mtct}`);

      console.log("uida:", uid);
      console.log("user: ", `${doc.data().Uid}`);
      if (`${doc.data().Uid}` == uid) {
        if (`${doc.data().Uid}` == 0) {
          this.diems = 0;
          this.setUser(this.email, this.diems, uid);
        } else {
          this.diems = this.diems + parseInt(`${doc.data().Diem}`);
          this.setUser(this.email, this.diems, uid);
        }
      } else {
        this.setUser(this.email, this.diems, uid);
      }
    });
  }

  listenForItems(inum) {
    if (this.state.itemK.length >= inum) {
      this.setState({
        itemK: [...this.state.itemK, 1],
        //
        itemQ: inum,
        q: this.state.nameqs[inum - 1],
        o: [
          this.state.opt0[inum - 1],
          this.state.opt1[inum - 1],
          this.state.opt2[inum - 1],
          this.state.opt3[inum - 1],
        ],
        ans: this.state.trueAns[inum - 1],
        isLoading: false,
      });
    } else {
      Alert.alert("Thông báo", "Phần này chưa có đủ bài tập...", [
        {
          text: "Ok",
          onPress: () =>
            this.nvt.navigate("huongdan", {
              id: this.id,
              ten: this.ten,
              uid: this.uid,
              email: this.email,
              socau: 10,
              tg: 15,
            }),
          style: "cancel",
        },
      ]);
    }
  }

  //dap an duoc chon
  setSelectedOption(selectedOption) {
    this.setState({
      optList: [...this.state.optList, selectedOption],
      //answ:[...this.state.answ[this.state.itemQ-1]=this.state.trueAns[this.state.itemQ-1]],

      selectedOption,
    });
    this.state.answ[this.state.itemQ - 1] = selectedOption;
    console.log(this.state.answ);
  }

  renderContainer(optionNodes) {
    return <View>{optionNodes}</View>;
  }

  //xu ly su kien cho nhung button chuyen bai tap
  goto(g) {
    //this.check(g);
    this.reset();
    this.listenForItems(g);
  }
  goNext(g) {
    if (g > 10) {
      this.reset();
      this.listenForItems(1);
    } else {
      this.reset();
      this.listenForItems(g);
    }
  }
  goBack(g) {
    if (g < 1) {
      this.reset();
      this.listenForItems(10);
    } else {
      this.reset();
      this.listenForItems(g);
    }
  }

  //su kien cho nut back, exit
  qsExit = () =>
    Alert.alert(
      "Nhắc nhở",
      "Bạn muốn hủy bài kiểm tra?",
      [
        {
          text: "Không",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Có",
          onPress: () => {
            clearInterval(this.interval);
            // this.nvt.goBack;
            this.nvt.navigate("huongdan", {
              id: this.id,
              ten: this.ten,
              uid: this.uid,
              email: this.email,
              socau: 10,
              tg: 15,
            });
          },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  backAction = () => {
    //Khong ho tro tieng Viet
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          this.nvt.navigate("huongdan", { id: this.i, ten: this.detai });
        },
      },
    ]);
    return true;
  };

  //tinh diem sau khi nop bai
  dvt() {
    console.log("so cau: ", this.state.socau.length);
    console.log("answ: ", this.state.answ);
    console.log("trueAns: ", this.trueAns);
    for (var n = 0; n < 10; n++) {
      for (var m = 0; m < 10; m++) {
        if (this.state.answ[n] == this.state.trueAns[m]) {
          this.diems++;
        } else {
          //console.log('hihi')
        }
      }
    }
    console.log("diem : ", this.diems);
  }

  //luu diem len firestore
  luudiem() {
    this.getUser();
    console.log(this.uid);
  }

  //su kien nut nop bai
  nopbai(y) {
    if (y == true) {
      this.nvt.navigate("kq", {
        diem: this.diems,
        item: this.state.itemK,
        itemK: this.state.itemK,
        ds: this.state.o,
        bailam: this.state.answ,
        cauhoi: this.state.nameqs,
        d0: this.state.opt0,
        d1: this.state.opt1,
        d2: this.state.opt2,
        d3: this.state.opt3,
        dapan: this.state.trueAns,
        socau: this.state.socau,
        uid: this.uid,
        email: this.email,
      });
    } else {
      Alert.alert(
        "Nhắc nhở",
        "Bạn muốn nộp bài?",
        [
          {
            text: "Không",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Có",
            onPress: () => {
              this.getUser(this.uid);
              console.log("nop bai");
              this.dvt();
              this.nvt.navigate("kq", {
                diem: this.diems,
                item: this.state.itemK,
                itemK: this.state.itemK,
                ds: this.state.o,
                bailam: this.state.answ,
                cauhoi: this.state.nameqs,
                d0: this.state.opt0,
                d1: this.state.opt1,
                d2: this.state.opt2,
                d3: this.state.opt3,
                dapan: this.state.trueAns,
                socau: this.state.socau,
                uid: this.uid,
                email: this.email,
              });
            },
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              "This alert was dismissed by tapping outside of the alert dialog."
            ),
        }
      );
      console.log(this.uid);
    }
  }

  chiatg() {
    if (this.state.tgian == 50) {
      return true;
    } else {
      return false;
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.listenForItems(this.num);

    this.interval = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
      1000
    );
  }

  componentDidUpdate() {
    if (this.state.timer === 1) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

const CountdownTimer = ({ onTimerEnd, num }) => {
  const [seconds, setSeconds] = useState(num * 60); // 10 minutes in seconds
  const [countdownEnded, setCountdownEnded] = useState(false);
  useEffect(() => {
    // const interval = setInterval(async () => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => {
        // console.log("clearInterval!");

        clearInterval(interval);
      };
    } else {
      setCountdownEnded(true);
    }

    // }
    // );
  }, [seconds]);

  useEffect(() => {
    if (countdownEnded) {
      onTimerEnd();
    }
  }, [countdownEnded, onTimerEnd]);

  const displayTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return (
    <View>
      <Text>{displayTime()}</Text>
    </View>
  );
};
