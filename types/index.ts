export interface Meditation {
  id: string;
  thumbnail : string;
  title: string;
  duration: number;
  type: "audio" | "video";
  pro: boolean;
  audioUrl :string;
}
