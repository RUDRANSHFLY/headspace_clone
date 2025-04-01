//? Importing Types and Constants
import { Meditation } from "@/types";
import { AUDIO_FILES, meditations } from "@/constants/Data";

//? React Native and Expo
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, Text, View, Pressable } from "react-native";
import Slider from "@react-native-community/slider";

//? Importing Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { Audio } from "expo-av";

export default function YogaDetail() {
  const [music, setMusic] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  const { id } = useLocalSearchParams();

  const yoga = meditations.find((yoga: Meditation) => yoga.id === id);


  useEffect(() => {
    
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      interval = setInterval(async () => {
        if (music) {
          const status = await music.getStatusAsync();
          if (status.isLoaded) {
            setCurrentTime(status.positionMillis);
          }
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if(interval){
        clearInterval(interval);
      }
    };
  }, [music, isPlaying]);

  async function handleSeek(value: number) {
    if (music) {
      const newPostion = value * totalTime;
      await music.setPositionAsync(newPostion);
      setCurrentTime(newPostion);
    }
  }

  async function setTotalTimeMusic() {
    if (music) {
      const status = await music.getStatusAsync();
      if (status.isLoaded) {
        setTotalTime(status.durationMillis as number);
      }
    }
  }

  async function playSound() {
    if (music) {
      console.log("MUSIC RESUMED")
      const status = await music.getStatusAsync();
      console.log("Playback status:", status);


      if (status.isLoaded) {
        console.log("STATUS IS BEIGN LOADED");
        
        if (!isPlaying) {
          console.log({"CURRENT TIME":status.positionMillis});
          await music.playAsync();
          setIsPlaying(true);
          return;
        }
      }
    }

    if (yoga !== undefined) {
      const { sound } = await Audio.Sound.createAsync(
        AUDIO_FILES[yoga.audioUrl]
      );
      setMusic(sound);
      setIsPlaying(true);
      await sound.playAsync();


      const status = await sound.getStatusAsync();
      if(status.isLoaded){
        setTotalTime(status.durationMillis as number);
        setCurrentTime(status.positionMillis as number)
      }


    }
  }

  async function stopSound() {
    
    if (music) {
      const status = await music.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        console.log("MUSIC PAUSED");
        console.log({"CURRENT TIME":currentTime});
        console.log({"TOTAL TIME":status.positionMillis});
        
        await music.pauseAsync();
        setIsPlaying(false);
      }
    }
  }

  async function handleSoundChange() {
    if (isPlaying) {
      await stopSound();
    } else {
      await playSound();
    }
  }

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? `0${seconds}` : seconds}`;
  }

  if (!yoga) {
    return (
      <View>
        <Text>Yoga not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-orange-400 flex-1 justify-between p-2">
      <View className="flex-1">
        <View className="flex-row justify-between items-center p-10">
          <AntDesign name="infocirlceo" size={26} color="black" />
          <View className="bg-zinc-900 p-2 rounded-md">
            <Text className="text-zinc-100">Today's meditations</Text>
          </View>
          <Entypo name="cross" size={26} color="black" />
        </View>
        <Text className="text-3xl mt-10 text-center text-zinc-800 font-semibold">
          {yoga.title}
        </Text>
      </View>
      <Pressable
        onPress={handleSoundChange}
        className="bg-zinc-800 self-center w-20 h-20 rounded-full items-center justify-center"
      >
        {
          //? Play/Pause Button
          <FontAwesome6
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="snow"
          />
        }
      </Pressable>
      {
        //? Yoga Footer
      }
      <View className="flex-1">
        <View className="p-5 mt-auto">
          <View className="flex-row justify-between">
            <Feather name="airplay" size={26} color="#3A3937" />
            <SimpleLineIcons name="settings" size={26} color="#3A3937" />
          </View>
          {/* PlayBack */}
          <View>
            <Slider
              style={{ width: "100%", height: 40 }}
              value={currentTime / totalTime}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#3A3937"
              maximumTrackTintColor="#3A393755"
              thumbTintColor="#3A3937"
              onSlidingComplete={handleSeek}
            />
          </View>
          <View className="flex-row justify-between">
            <Text>{formatTime(currentTime)}</Text>
            <Text>{formatTime(totalTime)}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
