import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Appbar } from "react-native-paper";
import { List } from "react-native-paper";

const ContactScreen = ({ navigation }) => {
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
        {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View
        style={{
          marginVertical: 20,
        }}
      >
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => {
          return (
            <List.Item
              title="مهسا کریمی"
              description=" ۳۳ ارتباط"
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
        })}
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
