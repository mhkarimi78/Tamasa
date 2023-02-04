import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Chip } from "react-native-paper";
import userServices from "../services/users";

const ModalScreen = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passWord, setPassWord] = useState("");
  const [relationTypes, setRelationTypes] = useState([]);
  const incompleteForm = !email || !phone || !passWord;
  const userId = localStorage.getItem("userId");

  const getUserInfoService = () => {
    userServices
      .getUserInfo()
      .then((res) => {
        console.log("getUserInfo", res);
        setRelationTypes;
      })
      .catch((err) => {
        return err;
      });
  };
  const updateMyInfoService = () => {
    userServices
      .updateMyInfo(email, phone, passWord)
      .then((res) => {
        console.log("updateMyInfo", res);
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    getUserInfoService();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          // flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Image
          style={style.img}
          resizeMode="contain"
          source={require("../static/logo.png")}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: "BoldVazir",
            marginTop: 10,
          }}
        >
          تماسا
        </Text>
      </View>
      <Text style={style.welcomeText}>خوش آمدید</Text>
      <Text style={style.stepsText}>ایمیل خود را به روز رسانی کنید</Text>
      <TextInput
        placeholder="ایمیل"
        value={email}
        style={style.textInput}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={style.stepsText}>شماره همراه جدید خود را وارد کنید</Text>
      <TextInput
        placeholder="شماره همراه"
        value={phone}
        style={style.textInput}
        onChangeText={(text) => setPhone(text)}
      />
      <Text style={style.stepsText}>رمز عبور جدید خود را بنویسید</Text>
      <TextInput
        placeholder="رمز عبور"
        value={passWord}
        style={style.textInput}
        textContentType="password"
        keyboardType="numeric"
        onChangeText={(text) => setPassWord(text)}
      />
      {/* <Text style={style.stepsText}>انواع روابط من</Text> */}
      {/* {contactArr.map((data) => {
        return (
          <Chip
            style={{ fontSize: 20, margin: 2 }}
            onClose={() => console.log("Pressed")}
          >
            {data.name}
          </Chip>
        );
      })} */}
      <TouchableOpacity
        style={{
          width: 150,
          borderRadius: 10,
          backgroundColor: incompleteForm ? "gray" : "#6495ED",
          padding: 15,
          position: "absolute",
          bottom: 20,
        }}
        disabled={incompleteForm}
        onPress={updateMyInfoService}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "BoldVazir",
          }}
        >
          به روز رسانی پروفایل
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;

const style = StyleSheet.create({
  img: {
    height: 80,
    width: 80,
    borderRadius: 5,
    marginRight: 5,
  },
  welcomeText: {
    color: "gray",
    marginTop: 20,
    fontWeight: "bold",
    fontFamily: "BoldVazir",
  },
  stepsText: {
    color: "#6495ED",
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 4,
    fontFamily: "BoldVazir",
  },
  textInput: {
    padding: 2,
    textAlign: "center",
    borderWidth: 0,
    fontFamily: "ThinVazir",
  },
});
