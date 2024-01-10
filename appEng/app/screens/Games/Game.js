import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import data from "../../../assets/documents/topic1/topic.json";
import { Overlay } from "react-native-elements";
import { StackActions } from "@react-navigation/native";
const Store = createContext({});

const Option = ({ text, top, left }) => {
  const { hanleNext, className, loading } = useContext(Store);
  return (
    <TouchableOpacity
      style={[
        {
          // position: "absolute",
          // top: top,
          // left: left,
          textAlign: "center",
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 20,
          marginTop: 30,
          padding: 20,
        },
        text &&
          className?.text === text &&
          (className?.res ? styles.succes : styles.fail),
      ]}
      onPress={() => !loading && hanleNext(text)}
    >
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Text style={{ fontSize: 22, color: "green" }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
const Options = ({ qes }) => {
  const [bool, setBool] = useState(true);
  const { setPosition } = useContext(Store);
  useEffect(() => {
    setBool(Math.floor(Math.random() * 3));
  }, [qes?.qs]);
  useEffect(() => {
    bool == 0
      ? setPosition([qes?.as, qes?.temp, qes?.temp2])
      : bool == 1
      ? setPosition([qes?.temp, qes?.as, qes?.temp2])
      : setPosition([qes?.temp, qes?.temp2, qes?.as]);
  }, [bool]);
  return (
    <>
      {bool == 0 ? (
        <>
          <Option text={qes?.as} />
          <Option text={qes?.temp} />
          <Option text={qes?.temp2} />
        </>
      ) : bool == 1 ? (
        <>
          <Option text={qes?.temp} />
          <Option text={qes?.as} />
          <Option text={qes?.temp2} />
        </>
      ) : (
        <>
          <Option text={qes?.temp} />
          <Option text={qes?.temp2} />
          <Option text={qes?.as} />
        </>
      )}
    </>
  );
};

export default function Game({ route, navigation }) {
  const { id } = route.params;

  const [arr, setArr] = useState(data.topic[id - 1].transfers);
  const [question, setQuestion] = useState();
  const [counter, setCounter] = useState(null);
  const [className, setClassName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState([]);

  function addQuestion() {
    const arrQues = [].concat(data.topic[id - 1].transfers);
    const quetion = arr[Math.floor(Math.random() * arr.length)];
    setArr(arr.filter((e) => e.id !== quetion.id));
    arrQues.splice(quetion.id - 1, 1);
    const temp = arrQues[Math.floor(Math.random() * arrQues.length)];
    arrQues.splice(temp.id - 1, 1);
    let temp2 = temp;
    while (temp2.id == temp.id) {
      temp2 = arrQues[Math.floor(Math.random() * arrQues.length)];
    }
    const bool = Math.round(Math.random());
    bool
      ? setQuestion({
          checkEsAudio: false,
          qs: quetion.vi,
          as: quetion.es,
          temp: temp.es,
          temp2: temp2.es,
        }) //lay tieng viet lam cau hoi
      : setQuestion({
          checkEsAudio: true,
          qs: quetion.es,
          as: quetion.vi,
          temp: temp.vi,
          temp2: temp2.vi,
        }); //lay tieng anh lam  cau hoi
  }
  useEffect(() => {
    setCounter({ numAnswer: 0, allQues: [], current: 1, size: arr.length });
  }, []);

  useEffect(() => {
    // if (counter?.current == 2) setModalVisible(true);

    if (
      counter &&
      counter.current !== 1 &&
      counter?.current === counter?.size
    ) {
      setModalVisible(true);
    } else
      setTimeout(() => {
        setLoading(false);
        addQuestion();
        setClassName(null);
      }, 1000);
    return clearTimeout();
  }, [counter]);
  // const sound = new Audio.Sound();

  const handleAudio = () => {
    try {
      const word = question.checkEsAudio ? question.qs : question.as;
      console.log(question);
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        .then((res) => res.json())
        .then(async (arr) => {
          try {
            const { phonetics } = arr[0];
            const obj = phonetics[0];
            if (!obj.audio) {
              return;
            }
            const link = "https://" + obj.audio.substring(2);
            // await sound.loadAsync({
            //   uri: link,
            // });
            // const checkLoaded = await sound.getStatusAsync();
            if (checkLoaded.isLoaded) {
              // await sound.playAsync();
            } else {
              console.log("Error in Loading mp3");
            }
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  //Vi tri cau
  const hanleNext = async function (rs) {
    setLoading(true);
    handleAudio();
    if (rs === question?.as) {
      setClassName({ text: rs, res: true });
      const posYours = position.indexOf(rs);
      const posAsYours = position.indexOf(question.as);
      const ques = {
        num: counter.numAnswer + 1,
        ...question,
        posAS: posAsYours,
        yourS: posYours,
        pos: position,
      };
      const arrQues = [...counter.allQues, ques];
      setCounter((e) => {
        return {
          ...counter,
          allQues: arrQues,
          numAnswer: e?.numAnswer + 1,
          current: e?.current + 1,
        };
      });
    } else {
      setClassName({ text: rs, rss: false });
      const posYours = position.indexOf(rs);
      const posAsYours = position.indexOf(question.as);
      const ques = {
        num: counter.numAnswer + 1,
        ...question,
        posAS: posAsYours,
        yourS: posYours,
        pos: position,
      };
      const arrQues = [...counter.allQues, ques];
      setCounter((e) => {
        return {
          ...counter,
          allQues: arrQues,
          current: e?.current + 1,
        };
      });
    }
  };
  //load thoi // xay dung danh sach cau tl
  console.log(counter);
  const onCloseModal = () => {
    const arrQ = data.topic[id - 1].transfers;
    setCounter({ numAnswer: 0, allQues: [], current: 1, size: arrQ.length });
    setArr(arrQ);
    setModalVisible(false);
  };
  const hanleNextScore = () => {
    navigation.navigate("Điểm", counter);
    setModalVisible(false);
  };
  const hanleBack = () => {
    navigation.dispatch(StackActions.pop(1));
    setModalVisible(false);
  };
  // {navigation.dispatch(StackActions.pop(1))}
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <ImageBackground
      style={{
        // height: windowWidth,
        width: windowWidth,
        backgroundColor: "#f5f5f500",
        zIndex: 100,
        flexDirection: "column",
        borderRadius: 20,
        // borderWidth: 1,
      }}
      source={{
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYO0u07nDm35gsnfEO-zxF_ev6HpLrGT_mJQ&usqp=CAU",
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={["#ffffff00", "#ffffffc4", "#ffffffc4", "#aef6d6"]}
        style={styles.vw1}
      >
        <Store.Provider value={{ hanleNext, className, setPosition, loading }}>
          <View style={styles.container}>
            <Overlay isVisible={modalVisible} onBackdropPress={onCloseModal}>
              <View style={styles.viewTrans}>
                <Text style={styles.title}>Hoàn thành</Text>
                <View
                  style={{
                    width: 200,
                    borderBottomColor: "#cbcaca",
                    borderBottomWidth: 1,
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                />
                <Text style={styles.textCount}>Điểm: {counter?.numAnswer}</Text>
                <Text style={styles.textCount}>
                  {counter?.numAnswer < counter?.size
                    ? "Cần cố gắng hơn"
                    : "Tuyệt vời"}
                </Text>
                <View style={styles.listButton}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#008CBA" }]}
                    onPress={hanleNextScore}
                  >
                    <Text style={{ fontSize: 22, color: "white" }}>
                      Xem điểm
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.listButton}>
                  <TouchableOpacity
                    onPress={hanleBack}
                    style={[styles.button, { backgroundColor: "#e7e7e7" }]}
                  >
                    <Text style={{ fontSize: 22 }}>Thoát</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#4CAF50" }]}
                  >
                    <Text style={{ fontSize: 22, color: "white" }}>
                      Làm lại
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Overlay>
            <View style={{ height: 100 }}></View>
            <View>
              <Text style={styles.title}>Từ vựng</Text>
              <Text style={styles.question}>{question?.qs}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.title}>Trả lời</Text>
            </View>
            <View>
              <Options qes={question} />
            </View>
          </View>
          <View style={styles.viewCount}>
            <Text style={styles.textCount}>Điểm: {counter?.numAnswer}</Text>
            <Text style={styles.textCount}>
              Câu: {counter?.current}/{counter?.size}
            </Text>
          </View>
        </Store.Provider>
      </LinearGradient>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: "relative",
  },
  title: {
    fontSize: 24,
    color: "#ea901d",
    fontWeight: "bold",
    textAlign: "center",
  },
  question: {
    marginTop: 20,
    fontSize: 23,
    color: "green",
    textAlign: "center",
  },
  option: {
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 30,
    padding: 20,
  },
  succes: {
    backgroundColor: "#32f032",
  },
  fail: {
    backgroundColor: "red",
  },
  viewCount: {
    // position: "absolute",
    // bottom: 200,
    borderColor: "green",
    borderWidth: 1,
    marginTop: 110,
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textCount: {
    color: "red",
    textAlign: "center",
    fontSize: 22,
  },
  viewTrans: {
    padding: 10,
  },
  listButton: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    fontSize: 22,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    width: 130,
    padding: 5,
    textAlign: "center",
  },
});