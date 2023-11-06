import { View } from "react-native";
import { PanResponder, Animated, Dimensions } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import { apartments as apartmentsArray } from "../utils/data";
import ApartmentCard from "../components/ApartmentCard";
const { width, height } = Dimensions.get("screen");

const ApartmentCardScreen = () => {
    const [show, setShow] = useState(false);
    const [apartments, setApartments] = useState(apartmentsArray);
  
    // Animated values for swipe and tilt
    const swipe = useRef(new Animated.ValueXY()).current;
    const titlSign = useRef(new Animated.Value(1)).current;
  
    useEffect(() => {
      // Reset apartments data if the array is empty
      if (!apartments.length) {
        setApartments(apartmentsArray);
      }
    }, [apartments.length]);
  
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
  
    // remove the top card from the apartments array
    const removeTopCard = useCallback(() => {
      setApartments((prevState) => prevState.slice(1));
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
    <View className='flex justify-between items-center'>         
         <View className="apartments flex justify-center items-center">
        {apartments.map(({ name,userImage,apartmentName, location,rent,image}, index) => {
            const isFirst = index == 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};

            return (
              <ApartmentCard
                key={name}
                name={name}
                userImage={userImage}
                apartmentName={apartmentName}
                rent={rent}
                location={location}
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

    </View>
  );
};

export default ApartmentCardScreen;
