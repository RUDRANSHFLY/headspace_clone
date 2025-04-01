import { Meditation } from "@/types";



export const meditations: Meditation[] = [
  {
    id: "med_001",
    thumbnail: "https://img.freepik.com/premium-vector/morning-meditation-by-nature_42312-10.jpg",
    title: "Morning Mindfulness Meditation",
    audioUrl: "yoga1.mp3",
    duration: 600, // 10 minutes in seconds
    type: "audio",
    pro: false,
  },
  {
    id: "med_002",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYr8mcMCzk_InHxKwXDLIqiBz30aZ5wfJ7Tw&s",
    title: "Guided Meditation for Stress Relief",
    audioUrl: "yoga2.mp3", // Local file
    duration: 900, // 15 minutes in seconds
    type: "video",
    pro: true,
  },
  {
    id: "med_003",
    thumbnail: "https://www.artofliving.org/sites/www.artofliving.org/files/styles/facebook_thumb/public/unity2/blog_image/Thumbnail---MeditationForSleep.jpg?itok=pQ49otzF",
    title: "Sleep Meditation",
    audioUrl: "yoga3.mp3", // Local file
    duration: 1200, // 20 minutes in seconds
    type: "audio",
    pro: false,
  },
  {
    id: "med_004",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxiG8p5_qRAmvz_oLIPKZ3BGuWtOQSJZT1ZQ&s",
    title: "Advanced Zen Meditation",
    audioUrl: "yoga4.mp3", // Reusing yoga1
    duration: 1800, // 30 minutes in seconds
    type: "video",
    pro: true,
  },
];

export const AUDIO_FILES : {[key : string] : any} = {
  "yoga1.mp3" : require("@/assets/audio/yoga1.mp3"),
  "yoga2.mp3" : require("@/assets/audio/yoga2.mp3"),
  "yoga3.mp3" : require("@/assets/audio/yoga3.mp3"),
  "yoga4.mp3" : require("@/assets/audio/yoga4.mp3"),
}