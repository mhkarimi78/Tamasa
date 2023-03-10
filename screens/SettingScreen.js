import React from "react";
import { Appbar } from "react-native-paper";

const SettingScreen = ({ navigation }) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content
        title="تنظیمات"
        style={{
          alignItems: "center",
        }}
        titleStyle={{
          fontFamily: "BoldVazir",
        }}
      />
      {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
      {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
    </Appbar.Header>
  );
};

export default SettingScreen;
