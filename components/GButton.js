import React from "react";
import { Button } from "react-native-paper";
import { View } from "react-native";

const GButton = ({
  text,
  icon,
  mode = "contained",
  color,
  buttonColor,
  style,
  onPress,
}) => {
  return (
    <View>
      <Button
        icon={icon}
        mode={mode}
        color={color}
        buttonColor={buttonColor}
        style={style}
        labelStyle={{
          fontFamily: "BoldVazir",
        }}
        onPress={onPress}
      >
        {text}
      </Button>
    </View>
  );
};

export default GButton;
