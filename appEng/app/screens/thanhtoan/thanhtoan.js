import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Paystack, paystackProps } from "react-native-paystack-webview";
class Thanhtoan extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const { navigation } = this.props;
    var Elements = [];
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Paystack
          paystackKey="pk_test_be6835db92f7860c7fdfef8f58b74714d5426597"
          // paystackSecretKey="sk_test_a83fc5d0daf2d464c79bcf210ce7e6c0f0b8e1a3"
          // paymentIntentClientSecret="sk_test_a83fc5d0daf2d464c79bcf210ce7e6c0f0b8e1a3"
          currency="USD"
          // channels={JSON.stringify(["card", "ussd"])}
          amount={"25000"}
          phone="0923719421"
          billingEmail="sakurain199@gmail.com"
          activityIndicatorColor="green"
          onCancel={(e) => {
            // handle response here
            console.log("ok");
            navigation.navigate("front");
          }}
          onSuccess={(res) => {
            // handle response here
            console.log("ok");
            navigation.navigate("front");
          }}
          autoStart={true}
          // ref={paystackWebViewRef}
        />
      </SafeAreaView>
    );
  }
  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>Điểm: {item.score}</Text>
    </View>
  );
}

export default Thanhtoan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  score: {
    fontSize: 16,
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
