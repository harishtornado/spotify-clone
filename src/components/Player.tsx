import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "../styles/styles";
import { tracks } from "../../assets/data/tracks";
import { Ionicons } from "@expo/vector-icons";
import { usePlayerContext } from "../providers/PlayerProvider";

const Player = () => {
  const { track } = usePlayerContext();
  if (!track) {
    return null;
  }
  return (
    <View style={styles.Player}>
      <Image
        source={{ uri: track.album.images[0]?.url }}
        style={[styles.trackImage, { margin: 4 }]}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white", fontWeight: "500", fontSize: 15 }}>
          {track.name}
        </Text>
        <Text style={{ color: "gray" }}>{track.artists[0]?.name}</Text>
      </View>
      <Ionicons
        name={"heart-outline"}
        color={"white"}
        size={25}
        style={{ marginHorizontal: 10 }}
      />
      <Ionicons
        name={"play"}
        color={"white"}
        size={25}
        style={{ marginHorizontal: 10 }}
      />
    </View>
  );
};

export default Player;
