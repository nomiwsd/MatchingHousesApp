import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose, faFilter } from "@fortawesome/free-solid-svg-icons";
import { users as usersArray } from "../utils/data";
// import { apartments as apartmentsArray } from "../utils/data";
import { PanResponder, Animated, Dimensions } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import ApartmentCard from "../components/ApartmentCard";
const { width, height } = Dimensions.get("screen");

export default function MatchingScreen() {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState(usersArray);

  // Animated values for swipe and tilt
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Reset users data if the array is empty
    if (!users.length) {
      setUsers(usersArray);
    }
  }, [users.length]);

  // PanResponder configuration
  const panResponder = PanResponder.create({
    // Allow pan responder to activate
    onMoveShouldSetPanResponder: () => true,

    // Handle card movement while dragging
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1);
    },

    // Handle card release after dragging
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if (isActionActive) {
        // Swipe the card off the screen
        Animated.timing(swipe, {
          duration: 100,
          toValue: {
            x: direction * 500,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        // Return the card to its original position
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  // remove the top card from the users array
  const removeTopCard = useCallback(() => {
    setUsers((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  // handle user choice (left or right swipe)
  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * 500,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );

  return (
    <View className="flex-1 flex-col justify-start items-center">
      <View className="bg-white w-full p-3 flex-row justify-between items-center relative z-10">
        <Text className="text-[#1B263B] text-xl font-extrabold">
          Matching Screen
        </Text>
        {show ? (
          <View className="absolute top-[20vh] p-[20px] z-10">
            <View className="bg-[#778DA9] w-[350px] h-[300px] p-[20px] justify-center rounded-xl ">
              <View className="flex-1 flex-row justify-between items-start">
                <Text className="text-[#fff]">Dialog Box</Text>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <FontAwesomeIcon icon={faClose} style={{ color: "#fff" }} />
                </TouchableOpacity>
              </View>
              <View></View>
            </View>
          </View>
        ) : null}
        <TouchableOpacity onPress={() => setShow(true)}>
          <FontAwesomeIcon icon={faFilter} style={{ color: "#1B263B" }} />
        </TouchableOpacity>
      </View>
      <View className="Users flex justify-center items-center">
        {/* Users Profile */}
        <Text className="text-[#1B263B] text-center text-3xl py-3 font-semibold ">
          Users Profile
        </Text>
        {users
          .map(({ name, image, location, distance, age }, index) => {
            const isFirst = index == 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};

            return (
              <Card
                key={name}
                name={name}
                location={location}
                distance={distance}
                age={age}
                image={image}
                isFirst={isFirst}
                swipe={swipe}
                titlSign={titlSign}
                {...dragHandlers}
              />
            );
          })
          .reverse()}
      </View>

      <Footer handleChoice={handleChoice} />
{/* 
      <View>
        {users
          .map(({ apartmentName,name, image, location, userImg, Rent }, index) => {
            const isFirst = index == 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};

            return (
              <ApartmentCard
                key={name}
                name={name}
                apartmentName={apartmentName}
                Rent={Rent}
                location={location}
                userImg={userImg}
                image={image}
                isFirst={isFirst}
                swipe={swipe}
                titlSign={titlSign}
                {...dragHandlers}
              />
            );
          })
          .reverse()}
      </View> */}

    </View>
  );
}
