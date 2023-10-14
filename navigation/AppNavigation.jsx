
import React,{useState} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons'
import ProfileScreen from '../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import MapScreen from '../screens/MapScreen';
import MatchingScreen from '../screens/MatchingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ChatScreen from '../screens/ChatScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator();
const Stack=createNativeStackNavigator();
const MessageStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen name="Chats" component={MessageScreen} options={{ headerTitleStyle:{
            color:'#fbeaf3'
        },
        headerStyle:{backgroundColor:'#d46daf'},
        headerTitleAlign:'center',}} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={
            ({route}) => ({ 
            headerStyle:{
            backgroundColor:'#c23d98'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
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
          : '';
    
        if (routeName === 'Chat') {
          return (
            <Tab.Navigator style={{display:'none'}}></Tab.Navigator>
          );
        }
        return true;
      };
  return (
    <NavigationContainer>
        <StatusBar hidden={true}/>
    <Tab.Navigator
   screenOptions={{tabBarActiveTintColor:'#c23d98',tabBarInactiveTintColor:'#dc82ba'}}>
    <Tab.Screen
      name="Map"
      component={MapScreen}
      options={({route}) => ({
        headerTitle:"Devil's Den",
        headerTitleStyle:{
            color:'#fbeaf3'
        },
        headerStyle:{backgroundColor:'#d46daf'},
        headerTitleAlign:'center',
        tabBarLabel: 'Map',
        // tabBarVisible: route.state && route.state.index === 0,
        tabBarIcon: ({color, size}) => (
          <FontAwesome5
            name="map-marker-alt"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Matching"
      component={MatchingScreen}
      options={({route}) => ({
        headerShown:false,
        headerTitleStyle:{
            color:'#fbeaf3'
        },
        headerStyle:{backgroundColor:'#d46daf'},
        headerTitleAlign:'center',
        // Or Hide tabbar when push!
        // https://github.com/react-navigation/react-navigation/issues/7677
        // tabBarVisible: route.state && route.state.index === 0,
        // tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <IonIcons
            name="checkmark-done-circle-sharp"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Messages"
      component={MessageStack}
      options={({route}) => ({
       headerShown:false,
        tabBarVisible: getTabBarVisibility(route),
        // Or Hide tabbar when push!
        // https://github.com/react-navigation/react-navigation/issues/7677
        // tabBarVisible: route.state && route.state.index === 0,
        // tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <IonIcons
            name="chatbox-ellipses-outline"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerTitleStyle:{
            color:'#fbeaf3'
        },
        headerStyle:{backgroundColor:'#d46daf'},
        headerTitleAlign:'center',
        tabBarIcon: ({color, size}) => (
          <IonIcons name="person-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
  </NavigationContainer>
  )
}