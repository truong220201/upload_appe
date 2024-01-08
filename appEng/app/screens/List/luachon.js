import React, { useState, useEffect } from "react";
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
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../../components/firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import HTMLView from "react-native-htmlview";
import { CheckBox } from "react-native-elements";

import * as Animatable from "react-native-animatable";
//css
import { styles } from "../Css/CssList/CssLuachon";

export default class Luachon extends React.Component {
  constructor(props) {
    super(props);
    const { route, navigation } = this.props;
    this.nvt = navigation;
    const { id, uid, email } = route.params;
    this.uid = uid;
    this.email = email;
    console.log("tesst id", id);
    //this.itemRef = getDatabase(firebaseApp);
    //console.log(this.itemRef);
    this.thing = id;
    this.state = {
      isLoading: true,
      borderColorC: [],
      savet: [],
      keys: [],
      item: [],
      nameqs: [],
      leng: 0,
      check: [],
      chontca: true,
      //kiem tra xem co du lieu khong
      kiemtradulieu: 0,
    };
  }
  async listenForItems(itemRef) {
    // console.log("idididididi = ", this.thing);
    const db = getFirestore(firebaseApp);
    //console.log(db);
    //const docRef = doc(db, "Quiz", "03ZnOo7bgWhJvJU9Th9G");
    //const docSnap = await getDoc(docRef);
    const querySnapshot = await getDocs(
      collection(db, "Category_Don_vi_kien_thuc")
    );
    querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data()}`);
      //console.log(`${doc.data().Title}`);
      //console.log(`length: ${doc.id.length}`)
      if (this.thing == `${doc.data().Id_category_dkt}`) {
        this.setState({
          //item:this.state.item.push(data)
          //item:Object.keys(`${doc.data().Title}`)
          keys: [...this.state.keys, `${doc.id}`],
          item: [
            ...this.state.item,
            `${doc
              .data()
              .Name.slice(3)
              .split("_")
              .join("")
              .split("-")
              .join("")}`,
          ],
          //nameqs:[...this.state.item,`${doc.data().name_Question}`],
          leng: `${doc.id.length}`,
          savet: [...this.state.savet, `${doc.id}`],
          borderColorC: [...this.state.borderColorC, "#ffffff00"],
          isLoading: false,
          check: [...this.state.check, true],
          kiemtradulieu: 1,
        });
      }
    });
    if (this.state.kiemtradulieu == 0) {
      console.log("ok");
      Alert.alert("Thông báo", "Chưa có dữ liệu", [
        {
          text: "về trang chủ",
          onPress: () =>
            this.nvt.navigate("home", { uid: this.uid, email: this.email }),
          style: "cancel",
        },
      ]);
    }
    //console.log('item:'+this.state.item);
    //console.log('length:'+this.state.leng);
  }
  nopbaia(n, a) {
    var arr = [...this.state.check];
    arr[a] = !this.state.check[a];
    let dem = 0;
    this.setState({ check: arr });
    //console.log("Running, a = ",a);
    //gan gia tri khi duoc tich va gan gia tri = 0 khi khong duoc tich
    if (this.state.savet[a] == 0) {
      this.state.savet[a] = n;
    } else {
      this.state.chontca = false;
      this.state.savet[a] = 0;
    }
    //chon tat ca = true neu tat ca duoc tich
    [...Array(this.state.item.length)].map((o, n) => {
      if (this.state.savet[n] == 0) {
        dem++;
      }
    });
    //
    if (dem == 0) {
      this.state.chontca = true;
    }
    console.log("savet: ", this.state.savet);
    //console.log('check: ',this.state.check);
    //console.log('color: ',this.state.borderColorC);
  }
  chontc(cd) {
    var arr = [...this.state.check];
    if (this.state.chontca == false) {
      [...Array(cd)].map((o, n) => {
        arr[n] = true;
        this.state.savet[n] = this.state.keys[n];
      });
    } else {
      [...Array(cd)].map((o, n) => {
        arr[n] = false;
        this.state.savet[n] = 0;
      });
    }
    this.setState({ check: arr });
    this.state.chontca = !this.state.chontca;
    console.log("savet: ", this.state.savet);
  }
  btntieptuc(svet, cd) {
    console.log("svet:", svet);
    let dem = 0;
    [...Array(cd)].map((o, n) => {
      if (this.state.check[n] !== false) {
        dem++;
      }
    });
    if (dem == 0) {
      Alert.alert("Nhắc nhở", "Bạn chưa chọn mục nào.", [
        {
          text: "Được",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    } else {
      this.nvt.navigate("listbt", {
        id: this.thing,
        listt: svet,
        uid: this.uid,
        email: this.email,
      });
    }
  }
  componentDidMount() {
    this.listenForItems();
  }

  render() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const { navigation } = this.props;
    var l = this.state.leng;
    //console.log(this.state.keys);
    const chieudai = this.state.item.length;
    const colorsB = this.state.borderColorC;
    //console.log('chieu dai : ',chieudai);
    //console.log('color: ',colorsB)
    const fadeIn = {
      from: {
        opacity: 0,

        left: 300,
      },
      to: {
        opacity: 1,
        left: 0,
      },
    };

    const fadeInLast = {
      from: {
        opacity: 0,

        left: 700,
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
          uri: "https://media.istockphoto.com/photos/open-book-hardback-books-on-wooden-table-education-background-back-picture-id591810668?k=20&m=591810668&s=612x612&w=0&h=XAE8mlyqycD2LLcptfWlaj-rXhl4JuZvohRBCI2fniU=",
        }}
      >
        <LinearGradient
          colors={["#aef6d68a", "#aef6d68a", "#aef6d68a", "#fff"]}
          style={styles.inContainer}
        >
          <View style={styles.vw1}></View>
          {this.state.isLoading ? (
            <ActivityIndicator
              style={styles.vw2}
              size="large"
              color="#00ff00"
            />
          ) : (
            <View style={styles.vw2}>
              <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                <View style={{ height: 80 }}></View>

                <View style={{ width: windowWidth - 20 }}>
                  {
                    //Số hàng ngang
                    [...Array(chieudai)].map((o, n) => {
                      return (
                        <Animatable.Text
                          animation={fadeIn}
                          style={{ width: windowWidth }}
                          key={n}
                        >
                          <View key={n} style={{ width: windowWidth - 20 }}>
                            <CheckBox
                              title={
                                <View style={{ flexDirection: "row" }}>
                                  <View style={{ width: 10 }}></View>
                                  <Text>{this.state.item[n]}</Text>
                                </View>
                              }
                              checked={this.state.check[n]}
                              onPress={() =>
                                this.nopbaia(this.state.keys[n], n)
                              }
                              size={30}
                              containerStyle={{
                                borderRadius: 10,
                                backgroundColor: "#fff",
                                borderWidth: 0,
                                borderColor: "#fff",
                                elevation: 4,
                              }}
                              checkedColor="#009f00"
                              uncheckedColor="#009f00"
                            />
                          </View>
                        </Animatable.Text>
                      );
                    })
                  }
                  <Animatable.Text
                    animation={fadeInLast}
                    style={{ width: windowWidth }}
                  >
                    <View style={{ width: windowWidth - 20 }}>
                      <CheckBox
                        title="Chọn tất cả"
                        checked={this.state.chontca}
                        onPress={() => this.chontc(chieudai)}
                        size={30}
                        containerStyle={{
                          borderRadius: 10,
                          backgroundColor: "#fff",
                          borderWidth: 0,
                          borderColor: "#fff",
                          elevation: 4,
                        }}
                        checkedColor="#009f00"
                        uncheckedColor="#009f00"
                      />
                    </View>
                  </Animatable.Text>
                </View>
              </ScrollView>

              <LinearGradient
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0.25 }}
                colors={["#6bdb91", "#6bdb91", "#6bdb91", "#b9f5dc"]}
                style={{
                  borderWidth: 0,
                  height: 50,
                  width: "95%",
                  alignSelf: "center",
                  borderColor: "#1CC625",
                  borderRadius: 10,
                  marginBottom: "6%",
                  elevation: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.btntieptuc(this.state.savet, chieudai)}
                  style={{ alignItems: "center" }}
                >
                  <View style={{ height: "100%", justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, color: "#fff" }}>
                      Tiếp tục
                    </Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
        </LinearGradient>
      </ImageBackground>
    );
  }
  componentDidMount() {
    this.listenForItems(this.itemRef);
  }
}
