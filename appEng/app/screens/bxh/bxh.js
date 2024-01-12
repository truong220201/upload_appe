import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
  ImageBackground,
  Alert,
} from "react-native";
import { firebaseApp } from "../../../components/firebase";
import { getFirestore } from "firebase/firestore";
import data from "../../../assets/documents/topic1/learn.json";
import { WebView } from "react-native-webview";
import { ListItem, Icon } from "react-native-elements";
class Bxh extends React.Component {
  constructor(props) {
    super(props);
    //this.itemRef = getDatabase(firebaseApp);
    //console.log(this.itemRef);
    const { route, navigation } = this.props;
    const { ten, id, uid, email, myScore, listUser, listScore } = route.params;
    // console.log("id loai: ", this.id);
    this.uid = uid;
    this.email = email;
    this.ten = ten;
    this.id = id;
    this.email = email;
    this.myScore = myScore;
    this.listScore = listScore;
    this.listUser = listUser;
    this.url = "";
  }

  sortListsDescending(list1, list2) {
    // const zipped = list1
    //   .map((item, index) => ({ name: item, score: list2[index] }))
    //   .filter((obj) => obj.score !== "undefined" && obj.name !== "undefined");

    // zipped.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    // this.listUser = zipped.map((item) => item.name);
    // this.listScore = zipped.map((item) => item.score);
    const combinedArray = list1.map((name, index) => ({
      name,
      score:
        list2[index].toString() == "undefined"
          ? 0
          : parseFloat(
              list2[index].toString() != "undefined"
                ? list2[index].toString()
                : 0
            ),
    }));

    // Sắp xếp mảng theo điểm số từ lớn đến nhỏ
    combinedArray.sort((a, b) => b.score - a.score);

    // Tạo lại danh sách tên và danh sách điểm số từ mảng đã sắp xếp
    this.listUser = combinedArray.map((item) =>
      item.name == "undefined" ? "anonymous" : item.name
    );
    this.listScore = combinedArray.map((item) => item.score.toString());

    // return [sortedList1, sortedList2];
  }
  getData() {
    this.sortListsDescending(this.listUser, this.listScore);
    // console.log(this.listUser);
    console.log(this.listScore);
  }
  // componentDidMount() {
  //   this.getData();
  // }

  render() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const { navigation } = this.props;
    var Elements = [];
    this.getData();
    for (let i = 1; i <= this.listScore.length; i++) {
      Elements.push(
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              borderRadius: 100,
              borderColor: "white",
              borderWidth: 1,
              width: 50,
              height: 50,
              paddingTop: 10,
            }}
          >
            <Icon name={"user"} type="font-awesome" color={"#fff"} />
          </View>

          <View key={i} style={styles.item}>
            <Text style={styles.name}>{this.listUser[i]}</Text>
            <Text style={styles.score}>Điểm: {this.listScore[i]}</Text>
          </View>
        </View>
      );
    }
    console.log(this.listUser);
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
          {Elements}
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
        </ScrollView>
      </SafeAreaView>
    );
  }
  renderItem = ({ item }) => (
    <ListItem key={index} bottomDivider>
      <Icon name={"user"} type="font-awesome" />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{`${item.score} điểm`}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default Bxh;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    backgroundColor: "#FFA500",
    // padding: 100,
  },
  item: {
    width: 300,
    // backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  score: {
    fontSize: 16,
    color: "#fff",
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
