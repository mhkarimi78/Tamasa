import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text, Appbar } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import relationsService from "../services/relations";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const MyRelationsScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [relationData, setRelationData] = useState([]);
  const getAllRelationsService = () => {
    console.log("here");
    relationsService
      .getMyRelation()
      .then((res) => {
        console.log("re", res);
        setRelationData(res.data.result);
      })
      .catch((err) => {
        console.log("err");
        return err;
      });
  };
  useEffect(() => {
    getAllRelationsService();
  }, []);

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="روابط من"
          style={{
            alignItems: "center",
          }}
          titleStyle={{
            fontFamily: "BoldVazir",
          }}
        />
        {/* <Appbar.Action icon="calendasr" onPress={() => {}} /> */}
        <Appbar.Action
          icon="magnify"
          onPress={() => setShowSearch(!showSearch)}
        />
      </Appbar.Header>
      <View
        style={{
          marginVertical: 20,
        }}
      >
        {showSearch && (
          <View style={{ margin: 4, marginHorizontal: "10%" }}>
            <Searchbar
              placeholder="جستجو"
              onChangeText={(query) => setSearchTerm(query)}
              value={searchTerm}
            />
          </View>
        )}
        {[1, 1, 1, 1, 1, 1, 1].map(() => {
          return (
            <Card
              style={style.container}
              onPress={() =>
                navigation.navigate("RelationDetail", {
                  relationType: " سفر کاری",
                })
              }
            >
              <Card.Cover
                source={{
                  uri: `https://avatars.dicebear.com/api/adventurer-neutral/${"phone call"}.svg?b=%239da5e2&scale=50`,
                }}
              />
              <Card.Content style={style.title}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={style.description} variant="titleLarge">
                    ۲۴ دی ۱۴۰۰
                  </Text>
                  <Text style={style.title} variant="titleLarge">
                    سفر کاری
                  </Text>
                </View>
                <Text style={style.description} variant="bodyMedium">
                  با علی علوی
                </Text>
              </Card.Content>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default MyRelationsScreen;

const style = StyleSheet.create({
  container: {
    // alignItems: "flex-end",
    // direction: "rtl",
    // borderWidth: 1,
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 60,
    cursor: "pointer",
  },
  title: {
    textAlign: "right",
    fontSize: 20,
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
