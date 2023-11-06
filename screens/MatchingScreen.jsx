import { View, Text, TouchableOpacity, Image } from "react-native";
export default function MatchingScreen({ navigation }) {
  return (
    <View className="flex-1 flex-col justify-start items-center px-2 py-16">
      <View className="border-1 rounded-lg bg-[#778DA9] text-white w-3/4 h-full flex flex-col justify-center items-center gap-y-1 px-4 ">
        <View className="bg-[#E0E1DD] w-full border-2 border-[#1D263D] rounded-3xl flex justify-center items-center">
          <View className=" flex justify-center items-center w-full gap-4 h-1/2">
            <Image
              className="w-[150px] h-[150px] rounded-full"
              source={require("../assets/User.jpg")}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserCard")
              }
            >
              <Text className="w-full text-center bg-[#415A77] text-white p-3 rounded-xl">
                Users
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-[#E0E1DD] w-full border-2 rounded-2xl border-[#1B263B] flex justify-center items-center">
          <View className=" flex justify-center items-center w-full gap-4 h-1/2">
            <Image
              className="w-[150px] h-[150px] rounded-full"
              source={require("../assets/Apartment.jpg")}
            />

            <TouchableOpacity onPress={() =>
                navigation.navigate("Apartments")
              }>
              <Text className="w-full text-center bg-[#415A77] text-white p-3 rounded-xl">
                Apartments
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
