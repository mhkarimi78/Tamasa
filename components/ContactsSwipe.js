import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Swiper from "react-native-deck-swiper";

const ContactsSwipe = () => {
  return (
    <View style={style.swiperContainer}>
      <Swiper
        ref={swipeRef}
        cards={[
          {
            firstName: "Mahsa",
            lastName: "Karimi",
            job: "programmer",
            age: 22,
            photoURL: "",
          },
          { firstName: "Ali", lastName: "Rezae", photoURL: "" },
          { firstName: "Reza", lastName: "Alvi", photoURL: "" },
          { firstName: "Hanie", lastName: "Karimi", photoURL: "" },
          { firstName: "Bita", lastName: "Karimi", photoURL: "", age: 18 },
          { firstName: "Tina", lastName: "Karimi", photoURL: "", age: 15 },
          { firstName: "Nafiseh", lastName: "Heydar", photoURL: "", age: 44 },
          {
            firstName: "Gholamreza",
            lastName: "Karimi",
            photoURL: "",
            age: 53,
          },
        ]}
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
                    height: "80%",
                    borderRadius: 10,
                  }}
                  source={{
                    // adventurer-neutral
                    // micah
                    // open-peeps
                    uri: `https://avatars.dicebear.com/api/adventurer-neutral/${card.firstName}.svg?b=%239da5e2&scale=50`,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 20,
                  }}
                >
                  <View>
                    <Text style={style.text}>
                      {card.firstName + " " + card.lastName}
                    </Text>
                    <Text>{card?.job}</Text>
                  </View>
                  <Text style={style.text}>{card?.age}</Text>
                </View>
              </View>
            </View>
          );
        }}
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        animateCardOpacity
        cardIndex={0}
        backgroundColor={"transparent"}
        stackSize={5}
        verticalSwipe={false}
        overlayLabels={{
          left: {
            title: "Nope",
            style: {
              label: {
                textAlign: "right",
                color: "red",
              },
            },
          },
          right: {
            title: "Match",
            style: {
              label: {
                textAlign: "left",
                color: "#4ded30",
              },
            },
          },
        }}
        onTapCard={() => console.log("pressed?")}
      >
        {/* <Button
      onPress={() => {
        console.log("oulala");
      }}
      title="Press me"
      >
      You can press me
    </Button> */}
      </Swiper>
    </View>
  );
};

export default ContactsSwipe;

const style = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
  },
  swiperContainer: {
    flex: 1,
    marginTop: -40,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  card: {
    flex: 1,
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
  },
});
