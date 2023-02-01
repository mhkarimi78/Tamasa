import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-datepicker";
import relationsService from "../services/relations";

const RelationScreen = ({ route: { params: params }, navigation }) => {
  const [description, setDescription] = useState("");
  const [people, setPeople] = useState("");
  const [date, setDate] = useState("09-10-2021");
  const [location, setLocation] = useState("");
  const incompleteForm = !description || !date;

  const addRelationService = () => {
    relationsService
      .addRelation(params?.relationType, location, description, date, people)
      .then((res) => {
        console.log("e", res);
      })
      .catch((err) => {
        return err;
      });
    navigation.goBack();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Text style={style.titleText}>{params?.relationType}</Text>
      <Text style={style.stepsText}>
        فرد یا افرادی که با آنها ارتباط برقرار شد
      </Text>
      <TextInput
        placeholder="افراد"
        value={people}
        style={style.textInput}
        onChangeText={(text) => setPeople(text)}
      />
      <Text style={style.stepsText}>تاریخ ارتباطی که برقرار شد</Text>
      <DatePicker
        placeholder="تاریخ را انتخاب کنید"
        date={date}
        mode="date"
        style={style.datePickerStyle}
        format="DD/MM/YYYY"
        minDate="01-01-1900"
        maxDate="01-01-2000"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            right: -5,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            borderColor: "gray",
            alignItems: "flex-start",
            borderWidth: 0,
            borderBottomWidth: 1,
          },
          placeholderText: {
            fontSize: 17,
            color: "gray",
          },
          dateText: {
            fontSize: 17,
          },
        }}
        onDateChange={(date) => {
          setDate(date);
        }}
      />
      <Text style={style.stepsText}>مکانی که ارتباط در آن برقرار شد</Text>
      <TextInput
        placeholder="مکان"
        value={location}
        style={style.textInput}
        onChangeText={(text) => setLocation(text)}
      />
      <Text style={style.stepsText}>توضیحات درباره ارتباطی که برقرار شد</Text>
      <TextInput
        placeholder="توضیحات"
        value={description}
        style={{
          height: 40,
          padding: 2,
          textAlign: "center",
          borderWidth: 0,
        }}
        multiline
        onChangeText={(text) => setDescription(text)}
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
        onPress={addRelationService}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          ادامه
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RelationScreen;

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
    margin: 8,
    fontFamily: "thinVazir",
  },
  textInput: {
    padding: 2,
    textAlign: "center",
    borderWidth: 0,
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "BoldVazir",
  },
});
