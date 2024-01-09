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
  CardField,
  LinearGradient,
} from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../../components/firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import {
  StripeProvider,
  usePaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";
import { API_URL } from "../config/config";
import { Paystack, paystackProps } from "react-native-paystack-webview";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    //this.itemRef = getDatabase(firebaseApp);
    //console.log(this.itemRef);
    const { route, navigation } = this.props;
    const { uid, email } = route.params;
    console.log(uid);
    this.uid = uid;
    this.email = email;
    this.nvt = navigation;
    this.listUsername = [];
    this.listscore = [];
    this.state = {
      diemtl: 0,
    };
  }
  //Lay diem tu firestore
  async listenForItems(itemRef) {
    const db = getFirestore(firebaseApp);
    //console.log(db);
    //const docRef = doc(db, "Quiz", "03ZnOo7bgWhJvJU9Th9G");
    //const docSnap = await getDoc(docRef);
    const querySnapshot = await getDocs(collection(db, "User"));
    querySnapshot.forEach((doc) => {
      // var listTemp = this.listUser;
      var name = `${doc.data().Name}`.toString();
      var score = `${doc.data().Diem}`.toString();
      this.listUsername.push(name);
      this.listscore.push(score);
      // this.setState({
      //   listUser: listtemp,
      // });
      if (`${doc.data().Uid}` == this.uid) {
        this.setState({
          diemtl: `${doc.data().Diem}`,
        });
      }
    });
    //console.log('phan tu dau tien : ',this.state.keys[1]);
    //console.log('item:',this.email);
    console.log("length:" + this.listUsername);
  }
  componentDidMount() {
    this.listenForItems();
  }
  thongbao() {
    Alert.alert(
      "Thông báo",
      "Tính năng bổ sung thông tin người dùng sẽ ra mắt vào phiên bản sau, xin quý khách thông cảm.",
      [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]
    );
  }
  // const [loading, setLoading] = useEffect(false);
  render() {
    const emaila = this.email;
    const diemtla = this.state.diemtl;
    const uid = this.uid;
    console.log(diemtla);
    console.log("k:", this.email);
    const { navigation } = this.props;

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
          <Image
            style={styles.userImg}
            source={{
              uri: "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
            }}
          />
          <Text style={styles.userName}>Email: {emaila}</Text>
          <Text
            style={{
              fontSize: 15,
              fontStyle: "italic",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Id: {uid}
          </Text>
          {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
          <Text style={styles.aboutUser}>Your Score : {diemtla}</Text>
          <View style={styles.userBtnWrapper}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                this.nvt.navigate("bxh", {
                  ten: this.email,
                  email: this.email,
                  id: this.id,
                  uid: this.uid,
                  myScore: this.state.diemtl,
                  listUser: this.listUsername,
                  listScore: this.listscore,
                });
              }}
            >
              <Text style={styles.userBtnTxtH}>Bảng xếp hạng </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userBtnWrapper}>
            <TouchableOpacity
              style={styles.userBtnE}
              onPress={() => {
                this.thongbao();
              }}
            >
              <Text style={styles.userBtnTxtE}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.userBtnL}
              onPress={() => navigation.navigate("front")}
            >
              <Text style={styles.userBtnTxtL}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userBtnWrapper}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => navigation.navigate("thanhtoan")}
            >
              <Text style={styles.userBtnTxtH}>Nâng cấp tài khoản ngay! </Text>
            </TouchableOpacity>
          </View>
          {/* <PaymentScreen /> */}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.c4}
            onPress={() =>
              navigation.navigate("home", { uid: uid, email: emaila })
            }
          >
            <Icon style={{}} name="home" size={25} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.c4}
            onPress={() => navigation.navigate("ps", { loaiId: 8 })}
          >
            <Icon style={{}} name="person" size={25} color="#6bdb91" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    elevation: 3,
  },
  c4: {
    padding: 10,
    flex: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
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
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
    color: "#fa842a",
  },
  userBtnWrapperY: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
    color: "#fa842a",
  },
  userBtnY: {
    borderColor: "#fa842a",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtn: {
    borderColor: "#fa842a",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxtL: {
    color: "#fa2a2a",
  },
  userBtnL: {
    borderColor: "#fa2a2a",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnE: {
    borderColor: "#21cf30",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxtE: {
    color: "#21cf30",
  },
  userBtnTxtH: {
    color: "#fa842a",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});

const UserBuy = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    initializePaymentSheet();
  }, []);
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    console.log("aaaa:" + paymentIntent);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    console.log("run here--------");
    const { error } = await initPaymentSheet({
      merchantDisplayName: "example",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });

    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    console.log("press start--------");
    const error = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  return (
    <View style={styles.userBtnWrapper}>
      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => navigation.navigate("thanhtoan")}
      >
        <Text style={styles.userBtnTxtH}>Nâng cấp tài khoản ngay! </Text>
      </TouchableOpacity>
    </View>
  );
};
function Pay() {
  // const paystackWebViewRef = useRef<paystackProps.PayStackRef>(a);
  return (
    <View style={{ flex: 1 }}>
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
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        autoStart={true}
        // ref={paystackWebViewRef}
      />
    </View>
  );
}
