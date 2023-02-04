import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import userServices from "../services/users";
import jwt_decode from "jwt-decode";

const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("اکانت ندارم. ثبت نام");
  const navigation = useNavigation();
  const incompleteForm = !email || !password;

  const loginService = () => {
    userServices
      .login(email, password)
      .then((res) => {
        console.log("d", res.data);
        if (res.data.hasError == true) {
          if (res.data.error == "This User does  Not Exist")
            setError("چنین اکانتی موجود نیست، ثبت نام کنید");
        } else {
          var decoded = jwt_decode(res.data.result);
          localStorage.setItem("token", res.data.result);
          localStorage.setItem("userId", decoded.userId);
        }
      })
      .catch((err) => {
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
            fontFamily: "regularvazir",
          }}
        >
          تماسا
        </Text>
      </View>
      {/* <Text style={style.welcomeText}>Welcome Mahsa Karimi</Text> */}
      {/* <Text style={style.stepsText}>Step 1: The profile Pic</Text> */}
      <Text style={style.stepsText}>ایمیل خود را وارد کنید</Text>
      <TextInput
        placeholder="ایمیل"
        value={email}
        style={style.textInput}
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={style.stepsText}>رمز عبور خود را وارد کنید</Text>
      <TextInput
        placeholder="رمز عبور"
        value={password}
        style={style.textInput}
        textContentType="password"
        keyboardType="numeric"
        onChangeText={(text) => setPassword(text)}
      />
      <View style={{ margin: 20 }}>
        <Text
          style={[style.textInput, { fontFamily: "regularvazir" }]}
          onPress={() => navigation.navigate("SignUp")}
        >
          {error}
        </Text>
      </View>
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
        onPress={loginService}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "BoldVazir",
          }}
        >
          ورود
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
    height: 80,
    width: 80,
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
  stepsText: {
    color: "#6495ED",
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 4,
    fontFamily: "BoldVazir",
    // fontSize: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "BoldVazir",
  },
  textInput: {
    padding: 2,
    textAlign: "center",
    borderWidth: 0,
    fontFamily: "ThinVazir",
    // fontSize: 14,
  },
});
