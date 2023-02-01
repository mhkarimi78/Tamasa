import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ModalScreen = () => {
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {};

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
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
          Tamasa
        </Text>
      </View>
      <Text style={style.welcomeText}>Welcome Mahsa Karimi</Text>
      <Text style={style.stepsText}>Step 1: The profile Pic</Text>
      <TextInput
        placeholder="Enter a profile Pic Url"
        value={image}
        style={style.textInput}
        onChangeText={(text) => setImage(text)}
      />
      <Text style={style.stepsText}>Step 2: The Job</Text>
      <TextInput
        placeholder="Enter your job"
        value={job}
        style={style.textInput}
        onChangeText={(text) => setJob(text)}
      />
      <Text style={style.stepsText}>Step 1: The Age</Text>
      <TextInput
        placeholder="Enter your age"
        value={age}
        style={style.textInput}
        maxLength={2}
        keyboardType="numeric"
        onChangeText={(text) => setAge(text)}
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
        onPress={updateUserProfile}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;

const style = StyleSheet.create({
  img: {
    height: 50,
    width: 50,
    borderRadius: 5,
    marginRight: 5,
  },
  welcomeText: {
    color: "gray",
    marginTop: 20,
    fontWeight: "bold",
  },
  stepsText: {
    color: "#6495ED",
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 4,
  },
  textInput: {
    padding: 2,
    textAlign: "center",
    borderWidth: 0,
  },
});
