import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { Appbar, ActivityIndicator, MD2Colors } from "react-native-paper";
import contactsService from "../services/contacts";

const AddNewContactScreen = ({ navigation }) => {
  const [contactName, setContactName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [contactDescription, setContactDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const incompleteForm = !contactName || !contactPhoneNumber;

  const createContactService = () => {
    setLoading(true);
    contactsService
      .createContact(contactName, contactPhoneNumber, contactDescription)
      .then((data) => {
        console.log("createContact", data);
        setLoading(false);
        data?.status == 200 && navigation.goBack();
      })
      .catch((err) => {
        setLoading(false);
        return err;
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // alignItems: "center",
        // marginTop: 20,
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="افزودن مخاطب"
          style={{
            alignItems: "center",
          }}
          titleStyle={{
            fontFamily: "BoldVazir",
          }}
        />
      </Appbar.Header>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={style.stepsText}>نام مخاطبی که می خواهید اضافه کنید</Text>
        <TextInput
          placeholder="نام مخاطب"
          value={contactName}
          style={style.textInput}
          onChangeText={(text) => setContactName(text)}
        />
        <Text style={style.stepsText}>شماره همراه مخاطب</Text>
        <TextInput
          placeholder="شماره همراه"
          value={contactPhoneNumber}
          style={style.textInput}
          onChangeText={(text) => setContactPhoneNumber(text)}
        />
        <Text style={style.stepsText}>توضیحات درباره مخاطب</Text>
        <TextInput
          placeholder="توضیحات"
          value={contactDescription}
          style={{
            height: 40,
            padding: 2,
            textAlign: "center",
            borderWidth: 0,
          }}
          multiline
          onChangeText={(text) => setContactDescription(text)}
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
          onPress={createContactService}
        >
          {loading ? (
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "white",
              }}
            >
              ثبت مخاطب
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddNewContactScreen;

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
