import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dialog, Portal, Provider, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import Swiper from "react-native-deck-swiper";
import { AntDesign } from "@expo/vector-icons";
import GButton from "../components/GButton";
import relationsService from "../services/relations";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [disableSwipeRight, setDisableSwipeRight] = useState(false);
  const [disableSwipeLeft, setDisableSwipeLeft] = useState(true);
  const [relationTypeData, setRelationTypeData] = useState([]);
  const [newRelationType, setNewRelationType] = React.useState("");
  const swipeRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const getRelationTypesService = () => {
    relationsService
      .getRelationTypes()
      .then((res) => {
        setRelationTypeData([
          ...res.data.result,
          { id: 0, relations: "ارتباط خود را اضافه کن" },
        ]);
      })
      .catch((err) => {
        return err;
      });
  };
  const createRelationTypeService = () => {
    relationsService
      .createRelationType(newRelationType)
      .then((res) => {
        console.log("۲۲rr", res);
        getRelationTypesService();
      })
      .catch((err) => {
        return err;
      });
  };
  useEffect(() => {
    getRelationTypesService();
    // "سفرکاری" "رستوران" 'سینما' "خانوادگی" "تماس تلفنی"
    // createRelationTypeService("سفرکاری");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
      <Provider>
        <View style={style.header}>
          <TouchableOpacity onPress={() => navigation.navigate("MyRelations")}>
            <Ionicons size={40} color={"#6495ED"} name="people" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
            <Image style={style.img} source={require("../static/logo.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              () => localStorage.setItem("token", "undefined")
              //  navigation.navigate("Setting")
            }
          >
            <Ionicons size={40} color={"#6495ED"} name="exit" />
          </TouchableOpacity>
        </View>
        <View style={style.swiperContainer}>
          <Swiper
            ref={swipeRef}
            cards={relationTypeData}
            renderCard={(card) => {
              return (
                <View style={style.card}>
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: "75%",
                        borderRadius: 10,
                      }}
                      source={{
                        // adventurer-neutral
                        // micah
                        // open-peeps
                        uri: `https://avatars.dicebear.com/api/adventurer-neutral/${card?.relations}.svg?b=%239da5e2&scale=50`,
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        margin: 20,
                      }}
                      onPress={() => {
                        if (card.id == 0) setVisible(true);
                        else
                          navigation.navigate("Relation", {
                            relationType: card?.relations,
                            relationTypeId: card?.id,
                          });
                      }}
                    >
                      <Text style={style.text}>{card?.relations}</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      {!disableSwipeRight && (
                        <TouchableOpacity
                          onPress={() => swipeRef.current.swipeRight()}
                        >
                          <AntDesign name="banckward" size={24} color="black" />
                        </TouchableOpacity>
                      )}
                      {!disableSwipeLeft && (
                        <TouchableOpacity
                          onPress={() => swipeRef.current.swipeLeft()}
                        >
                          <AntDesign name="forward" size={24} color="black" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            }}
            onSwiped={(cardIndex) => {
              if (cardIndex == 1) {
                setDisableSwipeLeft(true);
              } else {
                setDisableSwipeLeft(false);
              }
              if (cardIndex == relationTypeData?.length - 2) {
                setDisableSwipeRight(true);
              } else {
                setDisableSwipeRight(false);
              }
            }}
            onSwipedAll={() => {
              console.log("onSwipedAll");
            }}
            animateCardOpacity
            cardIndex={0}
            backgroundColor={"transparent"}
            // stackSize={5}
            verticalSwipe={false}
            overlayLabels={{
              left: {
                title: "Back",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                  },
                },
              },
              right: {
                title: "Forward",
                style: {
                  label: {
                    textAlign: "left",
                    color: "#4ded30",
                  },
                },
              },
            }}
            onTapCard={() => console.log("pressed?")}
            swipeBack={() => console.log("jj")}
            goBackToPreviousCardOnSwipeLeft={true}
            disableRightSwipe={disableSwipeRight}
            disableLeftSwipe={disableSwipeLeft}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <GButton
            text="مخاطبین"
            onPress={() => navigation.navigate("Contacts")}
          />
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title style={style.text}>
              یه نوع ارتباط اضافه کن
            </Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="نوع ارتباط"
                value={newRelationType}
                onChangeText={(text) => setNewRelationType(text)}
              />
            </Dialog.Content>
            <Dialog.Actions style={style.header}>
              <GButton
                text="ثبت"
                onPress={() => {
                  createRelationTypeService();
                  setVisible(false);
                }}
              />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    </SafeAreaView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    alignItems: "center",
    flex: 1,
  },
  swiperContainer: {
    flex: 10,
    marginTop: -50,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  card: {
    flex: 0.9,
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "BoldVazir",
  },
});
