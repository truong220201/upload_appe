import React, { useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";
import { collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../../../components/firebaseConfig";
import { getFirestore } from "firebase/firestore";

import * as Animatable from "react-native-animatable";

export default class Huongdan extends React.Component {
  constructor(props) {
    super(props);
    //this.itemRef = getDatabase(firebaseApp);
    //console.log(this.itemRef);
    const { route, navigation } = this.props;
    this.nvt = navigation;
    const { baitap, name, n, ten, uid, email, socau, tg } = route.params;
    const { loaiId, id } = route.params;
    console.log("baitap:", socau);
    //console.log('uid form test:',uid)

    this.uid = uid;
    this.email = email;
    this.i = id;
    this.detai = ten;
    this.num = n;
    this.diems = 0;
    this.state = {
      socau: socau,
      tg: tg,
      isLoading: true,
      hideBack: "flex",
      hideNext: "flex",
      timer: 500,
      keys: [],
      item: [],
      itemQ: 1,
      opt0: [],
      opt1: [],
      opt2: [],
      opt3: [],
      //itemK : tat ca id cua Question_ver2
      itemK: [],
      nameqs: [],
      leng: 0,
      trueAns: [],
      //test
      q: "",
      a1: "",
      a2: "",
      a3: "",
      a4: "",
      //
      selectedOption: "",
      optList: [],
      o: [],
      ans: "",
      answ: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //id option
      idOpt: [],
    };
    (this.socau = socau),
      (this.tg = tg),
      (this.isLoading = true),
      (this.hideBack = "flex"),
      (this.hideNext = "flex"),
      (this.timer = 500),
      (this.keys = []),
      (this.item = []),
      (this.itemQ = 1),
      (this.opt0 = []),
      (this.opt1 = []),
      (this.opt2 = []),
      (this.opt3 = []),
      //itemK : tat ca id cua Question_ver2
      (this.itemK = []),
      (this.nameqs = []),
      (this.leng = 0),
      (this.trueAns = []),
      (this.selectedOption = ""),
      (this.optList = []),
      (this.o = []),
      (this.ans = ""),
      (this.answ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      //id option
      (this.idOpt = []);

    //this.opt = this.state.options;
  }

  async listenForItemsQS(inum) {
    const db = getFirestore(firebaseApp);
    const querySnapshotQS = await getDocs(collection(db, "Question_ver2"));

    querySnapshotQS.forEach((doc) => {
      [...Array(this.i.length)].map((o, n) => {
        if (
          (this.i[n] == `${doc.data().Id_cate_mtct}` &&
            `${doc.data().Don_Kep}` != 1) ||
          (this.state.socau == 50 && `${doc.data().Don_Kep}` != 1)
        ) {
          // console.log(
          //   "---------- don_kep: ",
          //   `${doc.data().Don_Kep}`.toString(),
          //   `${doc.id}`.toString()
          // );
          this.itemK = [...this.itemK, `${doc.id}`];
          this.nameqs = [...this.nameqs, `${doc.data().Content_Question}`];
          this.opt0 = [...this.opt0, `${doc.data().Option_ans[0]}`];
          this.opt1 = [...this.opt1, `${doc.data().Option_ans[1]}`];
          this.opt2 = [...this.opt2, `${doc.data().Option_ans[2]}`];
          this.opt3 = [...this.opt3, `${doc.data().Option_ans[3]}`];
          this.trueAns = [...this.trueAns, `${doc.data().True_ans}`];
          this.isLoading = false;
        }
      });
    });
    // console.log("render", this.trueAns);

    this.shuffle(
      this.itemK,
      this.nameqs,
      this.opt0,
      this.opt1,
      this.opt2,
      this.opt3,
      this.trueAns
    );
    console.log("random done");
  }

  componentDidMount() {
    this.listenForItemsQS();
  }
  full() {
    this.listenForItemsQS();
  }
  // random cau hoi/ tra loi
  shuffle(arraya, arrayb, arrayc, arrayd, arraye, arrayf, arrayg) {
    let currentIndex = arraya.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      //itemK:
      [arraya[currentIndex], arraya[randomIndex]] = [
        arraya[randomIndex],
        arraya[currentIndex],
      ];
      [arrayb[currentIndex], arrayb[randomIndex]] = [
        arrayb[randomIndex],
        arrayb[currentIndex],
      ];
      [arrayc[currentIndex], arrayc[randomIndex]] = [
        arrayc[randomIndex],
        arrayc[currentIndex],
      ];
      [arrayd[currentIndex], arrayd[randomIndex]] = [
        arrayd[randomIndex],
        arrayd[currentIndex],
      ];
      [arraye[currentIndex], arraye[randomIndex]] = [
        arraye[randomIndex],
        arraye[currentIndex],
      ];
      [arrayf[currentIndex], arrayf[randomIndex]] = [
        arrayf[randomIndex],
        arrayf[currentIndex],
      ];
      [arrayg[currentIndex], arrayg[randomIndex]] = [
        arrayg[randomIndex],
        arrayg[currentIndex],
      ];
    }

    return arraya;
  }

  render() {
    const { navigation, route } = this.props;
    const { loaiId, ten, id, name, uid, email } = route.params;

    this.uid = uid;
    this.email = email;
    //console.log('itemK :',this.state.itemK)

    //console.log('item :',this.state.item)

    const tsp = {
      from: {
        opacity: 0,
        //left:700,
      },
      to: {
        opacity: 1,
        //left:0
      },
    };
    const pst = {
      from: {
        opacity: 0,
        //left:-700,
      },
      to: {
        opacity: 1,
        //left:0
      },
    };

    return (
      <View style={styles.container}>
        <View style={styles.vw1}>
          <Text style={styles.txtTitle}>Quy định làm bài</Text>
        </View>
        <View style={styles.vw2}>
          <Animatable.Text animation={pst} style={styles.yellowView}>
            <View
              style={{
                flex: 1,
                height: "60%",
                margin: 10,
                borderRadius: 20,
                flexDirection: "row",
                padding: 10,
              }}
            >
              <View style={styles.iconA}>
                <Icon name={"lock-clock"} size={40} color={"orange"} />
              </View>
              <View style={styles.contentA}>
                <Text style={styles.txtA}>Thời gian</Text>
                <Text style={styles.txtB}>{this.tg} Phút</Text>
              </View>
            </View>
          </Animatable.Text>
          <Animatable.Text animation={tsp} style={styles.blueView}>
            <View
              style={{
                flex: 1,
                height: "60%",
                borderColor: "#4c93f9",
                margin: 10,
                borderRadius: 20,
                flexDirection: "row",
                padding: 10,
              }}
            >
              <View style={styles.iconA}>
                <Icon name={"contact-support"} size={40} color={"#4c93f9"} />
              </View>
              <View style={styles.contentA}>
                <Text style={styles.txtA}>Số câu</Text>
                <Text style={styles.txtB}>{this.socau}</Text>
              </View>
            </View>
          </Animatable.Text>
        </View>
        <View style={styles.vw3}>
          <View style={styles.contentView}>
            <View style={styles.viewTxtC}>
              <Icon
                name={"content-paste"}
                size={40}
                color={"#656565"}
                style={{ margin: 5 }}
              />
              <Text style={styles.txtC}>Hướng dẫn</Text>
            </View>
            <View>
              <Text style={styles.txtD}>
                1. Trả lời đúng câu hỏi để được điểm
              </Text>
              <Text style={styles.txtD}>2. Trả lời sai không bị trừ điểm</Text>
              <Text style={styles.txtD}>3. Nộp bài để nhận kết quả</Text>
            </View>
          </View>
        </View>
        <View style={styles.vw4}>
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
              onPress={() =>
                navigation.navigate("testScreen", {
                  baitap: id,
                  n: 1,
                  ten: ten,
                  uid: uid,
                  email: email,
                  itemK: this.itemK,
                  nameqs: this.nameqs,
                  opt0: this.opt0,
                  opt1: this.opt1,
                  opt2: this.opt2,
                  opt3: this.opt3,
                  trueAns: this.trueAns,
                  socau: this.socau,
                  tg: this.tg,
                })
              }
              style={{ alignItems: "center" }}
            >
              <View style={{ height: "100%", justifyContent: "center" }}>
                <Text style={{ fontSize: 20, color: "#fff" }}>Làm bài</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  txtTitle: {
    top: 40,
    margin: 10,
    fontSize: 24,
  },
  vw1: {
    justifyContent: "center",
    width: "100%",
    flex: 2,
  },
  vw2: {
    width: "100%",
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  vw3: {
    width: "100%",
    flex: 5,
    padding: 10,
  },
  vw4: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  yellowView: {
    flex: 1,
    borderWidth: 2,
    height: "60%",
    borderColor: "#e97430",
    margin: 10,
    borderRadius: 20,
    flexDirection: "row",
    padding: 10,
  },
  blueView: {
    flex: 1,
    borderWidth: 2,
    height: "60%",
    borderColor: "#4c93f9",
    margin: 10,
    borderRadius: 20,
    flexDirection: "row",
    padding: 10,
  },
  iconA: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentA: {
    flex: 2,
    justifyContent: "center",
  },
  txtA: {
    fontSize: 17,
    color: "#7e7e7e",
  },
  txtB: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewTxtC: {
    flexDirection: "row",
  },
  txtC: {
    fontSize: 25,
    top: 8,
    color: "#656565",
  },
  txtD: {
    fontSize: 19,
    marginTop: 5,
    marginBottom: 5,
    color: "#656565",
  },
  contentView: {
    borderWidth: 3,
    borderColor: "#f0f0f0",
    borderRadius: 20,
    padding: 20,
  },
  btnStart: {
    width: "50%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#6ee0a0",
    elevation: 2,
  },
  txtStart: {
    color: "#fff",
    fontSize: 18,
    textShadowColor: "#ffffffb3",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
