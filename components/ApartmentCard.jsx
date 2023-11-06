import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("screen");
import { Fragment, useCallback } from "react";
import Choice from "./Choice";

const ApartmentCard = ({
  name,
  apartmentName,
  rent,
  location,
  image,
  userImage,
  isFirst,
  swipe,
  titlSign,
  ...rest
}) => {
  // Calculate the rotation of the card based on swipe gesture
  const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  // Animated style for the card with rotation and translation
  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  // Opacity animation for the "like" button
  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Opacity animation for the "nope" button
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  // Function to render the "like" and "nope" buttons conditionally
  const renderChoice = useCallback(() => {
    return (
      <Fragment>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}
        >
          <Choice type="like" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            { opacity: nopeOpacity },
          ]}
        >
          <Choice type="nope" />
        </Animated.View>
      </Fragment>
    );
  }, [likeOpacity, nopeOpacity]);

  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}
    >
      <View style={styles.userimgcont}>
        <View style={styles.imgbr}>
        <Image source={userImage} style={styles.userimg} />
        </View>
        <Text>{name}</Text>
      </View>
      <Image source={image} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,.9)"]}
        style={styles.gradient}
      />
      <View style={styles.userContainer}>
        <Text style={styles.name}>{apartmentName} </Text>
        <Text style={styles.location}>
          {rent}, {location}
        </Text>
      </View>
      {isFirst && renderChoice()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 70,
  },
  userimgcont: {
    width:230,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap:10,
    backgroundColor: "#fff",
    borderRadius:20,
    padding: 10,
    position: "absolute",
    top: 20,
    left: 50,
    zIndex: 10,
  },
  imgbr:{
    width: 70,
    height: 70,
    borderWidth:4,
    borderColor:'#1B263B',
    borderRadius:100,
  },
  userimg: {
    width: 65,
    height: 65,
    borderRadius: 100,
  },
  image: {
    position: "relative",
    width: width * 0.78,
    height: height * 0.6,
    borderRadius: 20,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    borderRadius: 20,
  },
  userContainer: {
    position: "absolute",
    bottom: 24,
    left: 24,
  },
  name: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: "400",
  },
  location: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "300",
  },
  distance: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "300",
  },
  choiceContainer: {
    position: "absolute",
    top: 100,
  },
  likeContainer: {
    left: 45,
    transform: [{ rotate: "-30deg" }],
  },
  nopeContainer: {
    right: 45,
    transform: [{ rotate: "30deg" }],
  },
});

export default ApartmentCard;
