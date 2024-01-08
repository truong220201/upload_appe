import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { firebaseApp } from "../../../components/firebase";
import { getFirestore } from "firebase/firestore";
import data from "../../../assets/documents/topic1/learn.json";
import { WebView } from "react-native-webview";
class Learn extends React.Component {
  constructor(props) {
    super(props);
    //this.itemRef = getDatabase(firebaseApp);
    //console.log(this.itemRef);
    const { route, navigation } = this.props;
    const { loaiId, ten, id, uid, email } = route.params;
    // console.log("id loai: ", this.id);
    this.uid = uid;
    this.email = email;
    this.loaiId = loaiId;
    this.ten = ten;
    this.id = id;
    this.email = email;
    this.url = "";
  }
  getData() {
    // console.log("id loai: ", this.loaiId);
    var arr = data;
    console.log(arr);
    for (var i = 0; i < arr.learn.length; i++) {
      if (arr.learn[i].id == this.loaiId) {
        // console.log("ok");
        this.url = arr.learn[i].url;
        // console.log(this.name);
      }
    }
  }
  // componentDidMount() {
  //   this.getData();
  // }
  render() {
    const { navigation } = this.props;

    this.getData();
    if (this.url != "") {
      return (
        <WebView
          source={{
            uri: this.url,
          }} // Thay đổi URL tại đây
          style={{ flex: 1 }} // Chỉnh sửa style tùy theo nhu cầu của bạn
        />
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("home", {
                  id: this.id,
                  ten: this.ten,
                  uid: this.uid,
                  email: this.email,
                })
              }
              style={styles.btnStart}
            >
              <Text style={styles.testy}>Về trang chủ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("menuScreen", {
                  id: this.id,
                  ten: this.ten,
                  uid: this.uid,
                  email: this.email,
                })
              }
              style={styles.btnStart}
            >
              <Text style={styles.testy}>Quay lại</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

export default Learn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 100,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },

  btnStart: {
    borderRadius: 15,
    backgroundColor: "#0a9737",
    margin: 10,
    width: 150,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    elevation: 5,
  },
  testy: {
    color: "#fff",
    alignSelf: "center",
  },
});
