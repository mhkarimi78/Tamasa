import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import userServices from "../services/users";

var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("اکانت ندارم. ثبت نام");
  const incompleteForm = !phone && !email && !confirmPass && !password;

  const registerService = () => {
    let uuid = uuidv4();
    var hash = bcrypt.hashSync(password, salt);
    userServices
      .register(email, password, confirmPass, phone)
      .then((res) => {
        if (res.data.hasError == true) {
          setError("");
        } else {
          userServices.login(email, password).then((res) => {
            localStorage.setItem("token", res?.data?.result);
            var decoded = jwt_decode(res.data.result);
            localStorage.setItem("userId", decoded.userId);
          });
        }
      })
      .catch((err) => {
        console.log("hottt", err);
        return err;
      });
  };
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
          }}
        >
          تماسا
        </Text>
      </View>
      <Text style={style.stepsText}>شماره همراه خود را وارد کنید</Text>
      <TextInput
        placeholder="شماره همراه "
        keyboardType="phone-pad"
        value={phone}
        style={style.textInput}
        onChangeText={(text) => setPhone(text)}
      />
      <Text style={style.stepsText}> ایمیل خود را وارد کنید </Text>
      <TextInput
        placeholder="ایمیل خود را وارد کنید"
        value={email}
        keyboardType="email-address"
        style={style.textInput}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={style.stepsText}>رمز عبور را وارد کنید </Text>
      <TextInput
        placeholder="رمز عبور"
        value={password}
        style={style.textInput}
        textContentType="password"
        // maxLength={2}
        keyboardType="numeric"
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="تکرار رمز عبور"
        value={confirmPass}
        style={style.textInput}
        textContentType="password"
        // maxLength={2}
        keyboardType="numeric"
        onChangeText={(text) => setConfirmPass(text)}
      />
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
        onPress={registerService}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "BoldVazir",
          }}
        >
          ثبت نام
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const style = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    alignItems: "center",
    flex: 1,
  },
  swiperContainer: {
    flex: 10,
    marginTop: -50,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  card: {
    flex: 0.9,
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
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
    // fontSize: 20,
  },
  textInput: {
    padding: 2,
    textAlign: "center",
    borderWidth: 0,
    fontFamily: "ThinVazir",
    // fontSize: 14,
  },
});
