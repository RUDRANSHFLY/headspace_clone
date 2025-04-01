import { meditations } from "@/constants/Data";
import React from "react";
import { FlatList } from "react-native";
import YogaCard from "./YogaCard";

const YogaList = () => {
  return (
    <FlatList
      data={meditations}
      scrollIndicatorInsets={{right : 1}}
      contentContainerClassName="gap-5 px-5"
      renderItem={(item) => <YogaCard yoga={item.item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default YogaList;
