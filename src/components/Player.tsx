import { View, Text, Image, Pressable, PressableProps } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import { tracks } from "../../assets/data/tracks";
import { Ionicons } from "@expo/vector-icons";
import { usePlayerContext } from "../providers/PlayerProvider";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { AVPlaybackStatus } from "expo-av/build/AV.types";
import PlayerScreen from "../screens/PlayerScreen";
import Slider from "@react-native-community/slider";

const Player = () => {
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const { track } = usePlayerContext();
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    playTrack();
  }, [track]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playTrack = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    if (!track?.preview_url) return;
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track.preview_url,
    });
    setSound(newSound);
    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await newSound.playAsync();
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    setStatus(status);
    setIsPlaying(status.isPlaying);
  };

  const onPlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  if (!track) {
    return null;
  }
  return (
    <View style={styles.Player}>
      <Pressable
        style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Image
          source={{ uri: track.album.images[0]?.url }}
          style={[styles.trackImage, { margin: 4 }]}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{ color: "white", fontWeight: "500", fontSize: 15 }}
            numberOfLines={1}
          >
            {track.name}
          </Text>
          <Text style={{ color: "gray" }}>{track.artists[0]?.name}</Text>
        </View>
      </Pressable>
      <Ionicons
        name={"heart-outline"}
        color={"white"}
        size={25}
        style={{ marginHorizontal: 10 }}
      />
      <Ionicons
        onPress={onPlayPause}
        name={isPlaying ? "pause" : "play"}
        color={"white"}
        size={25}
        style={{ marginHorizontal: 10 }}
      />
      <PlayerScreen
        track={track}
        status={status}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onPlayPause={onPlayPause}
        isPlaying={isPlaying}
      />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={status?.durationMillis}
        minimumTrackTintColor="#eee"
        thumbTintColor="transparent"
        maximumTrackTintColor="#ffffff"
        value={status?.positionMillis}
      />
    </View>
  );
};

export default Player;
