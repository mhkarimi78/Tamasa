import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingScreen from "./screens/SettingScreen";
import useAuth from "./hooks/useAuth";
import ModalScreen from "./screens/ModalScreen";
import RelationScreen from "./screens/RelationScreen";
import MyRelationsScreen from "./screens/MyRelationsScreen";
import SignUpScreen from "./screens/SignUpScreen";
import RelationDetailScreen from "./screens/RelationDetailScreen";
import AddNewContactScreen from "./screens/AddNewContactScreen";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Contacts" component={ContactScreen} />
            <Stack.Screen
              name="AddNewContact"
              component={AddNewContactScreen}
            />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="Relation" component={RelationScreen} />
            <Stack.Screen name="MyRelations" component={MyRelationsScreen} />
            <Stack.Screen
              name="RelationDetail"
              component={RelationDetailScreen}
            />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "modal",
            }}
          >
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
