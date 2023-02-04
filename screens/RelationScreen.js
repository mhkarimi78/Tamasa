import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Chip } from "react-native-paper";
import DatePicker from "react-native-datepicker";
import relationsService from "../services/relations";
import contactsService from "../services/contacts";

const RelationScreen = ({ route: { params: params }, navigation }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("09-10-2021");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [contactArr, setContactArr] = useState([]);
  const [contactList, setContactList] = useState([]);
  const incompleteForm = !description || !date;

  const addRelationService = () => {
    relationsService
      .createRelation(contactId, params?.relationTypeId, location, description)
      .then((res) => {
        console.log("createRelation", res);
      })
      .catch((err) => {
        return err;
      });
    navigation.goBack();
  };
  const searchOnMyContactsService = () => {
    contactsService
      .searchOnMyContacts(searchTerm)
      .then((res) => {
        console.log("searchOnMyContacts", res);
      })
      .catch((err) => {
        return err;
      });
  };
  const getMyContactsService = () => {
    contactsService
      .getMyContacts()
      .then((res) => {
        setContactList();
        console.log("getMyContacts", res);
      })
      .catch((err) => {
        return err;
      });
  };
  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2) searchOnMyContactsService();
      else {
        setLoading(false);
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);

      if (event.key === "Enter" && searchTerm != "") {
        console.log("fun", searchTerm);
        // event.preventDefault();
        const arr = contactArr;
        var index = arr.findIndex((x) => x.name == searchTerm);
        // here you can check specific property for an object whether it exist in your array or not

        index === -1
          ? arr.push({ name: searchTerm })
          : console.log("object already exists");

        setContactArr(arr);
        setSearchTerm("");
        console.log("hi", arr, searchTerm);
        // 👇️ your logic here
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      // document.removeEventListener("keydown", keyDownHandler);
    };
  }, [searchTerm]);

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
        placeholder="مخاطبین"
        value={searchTerm}
        style={style.textInput}
        onChangeText={(text) => {
          console.log("sss", text);
          setSearchTerm(text);
        }}
      />
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          marginHorizontal: 10,
          marginVertical: 4,
          justifyContent: "center",
        }}
      >
        {contactArr.map((data) => {
          return (
            <Chip
              style={{ fontSize: 20, margin: 2 }}
              onClose={() => console.log("Pressed")}
            >
              {data.name}
            </Chip>
          );
        })}
      </View>
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
