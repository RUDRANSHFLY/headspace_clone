import { Meditation } from "@/types";
import { View, Text, Image } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { secondsToMinute } from "@/util/covert";
import { Link } from "expo-router";

interface YogaCardProp {
  yoga: Meditation;
}

export default function YogaCard({ yoga }: YogaCardProp) {
  return (
    <Link href={{pathname : "/yoga/[id]",params : {id : yoga.id}}}>
    <View className="flex flex-row bg-gray-200 h-52 rounded-lg">
      <View className="w-1/2 flex justify-center items-center px-2 py-2">
        <Text className="text-lg text-slate-900 border-b border-slate-400 text-pretty font-bold">
          {yoga.title}
        </Text>

        <View className="mt-2 flex flex-row gap-2 justify-center items-center">
          <MaterialCommunityIcons
            name="timer-sand-empty"
            color={"gray"}
            size={15}
            />
          <Text className="text-base">{secondsToMinute(yoga.duration)} minutes</Text>
        </View>
      </View>
      <View className="relative w-1/2 h-full">
        <Image
          className="absolute object-cover w-full h-full"
          source={{ uri: yoga.thumbnail }}
          />
      </View>
    </View>
    </Link>
  );
}
