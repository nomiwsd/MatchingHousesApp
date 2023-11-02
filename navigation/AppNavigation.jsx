import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import IonIcons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import ProfileScreen from "../screens/ProfileScreen";
import MessageScreen from "../screens/MessageScreen";
import MapScreen from "../screens/MapScreen";
import MatchingScreen from "../screens/MatchingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import ChatScreen from "../screens/ChatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const number = 36;
const MessageStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Chats"
      component={MessageScreen}
      options={{
        headerTitleStyle: {
          color: "#0D1B2A",
        },
        headerStyle: { backgroundColor: "#ffffff" },
        headerTitleAlign: "left",
        headerShadowVisible:false
      }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        headerStyle: {
          backgroundColor: "#1B263B",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerTitleAlign:"center",
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

export default function AppNavigation() {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";

    if (routeName === "Chat") {
      return <Tab.Navigator style={{ display: "none" }}></Tab.Navigator>;
    }
    return true;
  };
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: "#1b263b" },
          tabBarActiveTintColor: "#e0e1dd",
          tabBarInactiveTintColor: "#e0e1dd",
        }}
      >
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={({ route }) => ({
            headerTitle: "Devil's Den",
            headerTitleStyle: {
              color: "#e0e1dd",
            },
            headerStyle: { backgroundColor: "#1b263b" },
            headerTitleAlign: "center",
            tabBarLabel: "Map",
            // tabBarVisible: route.state && route.state.index === 0,
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="map-marker-alt" color={color} size={number} />
            ),
          })}
        />
        <Tab.Screen
          name="Matching"
          component={MatchingScreen}
          options={({ route }) => ({
            headerShown: false,
            headerTitleStyle: {
              color: "#fbeaf3",
            },
            headerStyle: { backgroundColor: "#d46daf" },
            headerTitleAlign: "left",
            tabBarIcon: ({ color }) => (
              <Entypo
                name="chevron-with-circle-right"
                color={color}
                size={number}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Messages"
          component={MessageStack}
          options={({ route }) => ({
            headerShown: false,
            tabBarVisible: getTabBarVisibility(route),
            tabBarIcon: ({ color }) => (
              <FontAwesome name="commenting-o" color={color} size={number} />
            ),
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitleStyle: {
              color: "#fbeaf3",
            },
            headerStyle: { backgroundColor: "#d46daf" },
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <IonIcons
                name="person-circle-sharp"
                color={color}
                size={number}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
