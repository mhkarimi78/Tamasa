import React from "react";
import { ScrollView, StyleSheet, Image, View } from "react-native";
import { Avatar, Button, Card, Text, Appbar } from "react-native-paper";

const RelationDetailScreen = ({ navigation, route: { params: params } }) => {
  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title=""
          style={{
            alignItems: "center",
          }}
          titleStyle={{
            fontFamily: "BoldVazir",
          }}
        />
        {/* <Appbar.Action icon="calendasr" onPress={() => {}} /> */}
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View>
        <Image
          style={{
            width: "100%",
            height: 300,
            borderRadius: 10,
          }}
          source={{
            // adventurer-neutral
            // micah
            // open-peeps
            uri: `https://avatars.dicebear.com/api/adventurer-neutral/${params?.relationType}.svg?b=%239da5e2&scale=50`,
          }}
        />
        <View style={style.container}>
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Text variant="displayMedium" style={style.title}>
              {params?.relationType}
            </Text>
            <Text variant="titleMedium">۲۴ دی ۱۴۰۱</Text>
          </View>
          <Text variant="headlineMedium" style={style.text}>
            با علی علوی و حسن کریمی و رضا خلوتی و علی نساب
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RelationDetailScreen;

const style = StyleSheet.create({
  container: {
    margin: 20,
    padding: 8,
  },
  title: {
    fontFamily: "BoldVazir",
    textAlign: "right",
  },
  text: {
    fontFamily: "RegularVazir",
    textAlign: "right",
  },
});
