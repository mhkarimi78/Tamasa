import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Appbar, ActivityIndicator, MD2Colors } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { List } from "react-native-paper";
import contactsService from "../services/contacts";

const ContactScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyName, setPropertyName] = useState("contactName");
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState([]);

  const getMyContactsService = () => {
    setLoading(true);
    contactsService
      .getMyContacts()
      .then((res) => {
        setLoading(false);
        console.log("getMyContacts", res?.data?.result);
        setContactData(res?.data?.result);
      })
      .catch((err) => {
        setLoading(false);
        return err;
      });
  };
  const searchOnMyContactsService = () => {
    setLoading(true);
    contactsService
      .searchOnMyContacts(searchTerm)
      .then((res) => {
        console.log("searchOnMyContacts", res.data);
        setContactData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        return err;
        setLoading(false);
      });
  };
  useEffect(() => {
    getMyContactsService();
  }, []);
  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      searchTerm.length > 0 ? searchOnMyContactsService() : setLoading(false);
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="مخاطبین"
          style={{
            alignItems: "center",
          }}
          titleStyle={{
            fontFamily: "BoldVazir",
          }}
        />
        <Appbar.Action
          icon="plus"
          onPress={() => navigation.navigate("AddNewContact")}
        />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            getMyContactsService();
            setShowSearch(!showSearch);
          }}
        />
      </Appbar.Header>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: "10%",
        }}
      >
        {showSearch && (
          <View style={{ margin: 4 }}>
            <Searchbar
              placeholder="جستجو"
              onChangeText={(query) => setSearchTerm(query)}
              value={searchTerm}
            />
          </View>
        )}
        {loading ? (
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            style={{ marginTop: 20 }}
          />
        ) : contactData.length == 0 ? (
          <Text style={[style.title, { textAlign: "center", marginTop: 20 }]}>
            شما مخاطبی ندارید
          </Text>
        ) : (
          contactData?.map((res) => {
            return (
              <List.Item
                title={res?.name}
                description={res?.phoneNumber}
                style={style.container}
                titleStyle={style.title}
                descriptionStyle={style.description}
                // left={(props) => <List.Icon {...props} icon="account" />}
                right={(props) => (
                  <List.Icon
                    {...props}
                    icon="account"
                    style={{
                      borderWidth: 1,
                      borderRadius: 25,
                      width: 50,
                      height: 50,
                      marginLeft: 16,
                    }}
                  />
                )}
              />
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default ContactScreen;
const style = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    direction: "rtl",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: "10%",
  },
  title: {
    textAlign: "right",
    // fontSize: 12,
    // fontWeight: "bold",
    fontFamily: "RegularVazir",
  },
  description: {
    textAlign: "right",
    fontSize: 12,
    // fontWeight: "bold",
    fontFamily: "ThinVazir",
  },
});
