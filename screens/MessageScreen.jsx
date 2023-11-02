
import React from 'react'
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";


const Messages = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../assets/users/user-3.jpg"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../assets/users/user-1.jpg"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../assets/users/user-4.jpg"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../assets/users/user-6.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../assets/users/user-7.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];

export default function MessageScreen({navigation}) {
  return (
      <View className='flex-1 justify-center items-center bg-white'
      >
        <FlatList
          data={Messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
            className='w-full'
              onPress={() =>
                navigation.navigate("Chat", { userName: item.userName })
              }
            >
              <View className='flex-row justify-between'
              >
                <View  className='my-[15px]'>
                  <View className='w-[55px] h-[55px] rounded-full  border-[#0D1B2A] border-[3px]'>
                  <Image  className='w-[50px] h-[50px] rounded-full'
                    source={item.userImg}
                  />
                  </View>
                  
                </View>
                <View className='flex-col justify-center p-[15px] pl-[0px] ml-[10px] w-[300px] border-b-[1px] border-b-[#ccc]'
                 
                >
                  <View className='flex-row justify-between mb-[5px]'>
                    <Text className='text-[14px] font-bold'>
                      {item.userName}
                    </Text>
                    <Text className='text-[12px] text-[#666]'>
                      {item.messageTime}
                    </Text>
                  </View>
                  <Text  className='text-[14px] text-[#333]'>
                    {item.messageText}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

  )
}