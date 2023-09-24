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
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { track } = usePlayerContext();
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleSliderValueChange = async (value: number) => {
    if (status === null || !status.isLoaded) {
      return;
    }
    setStatus((prev) => {
      return { ...prev, positionMillis: value };
    });
    try {
      await sound?.setPositionAsync(value);
    } catch (error) {
      console.error("Error while seeking:", error);
    }
  };

  useEffect(() => {
    setIsPlaying(false);
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

  const onPlaybackStatusUpdate = (newStatus: AVPlaybackStatus) => {
    if (!newStatus.isLoaded) return;
    setStatus(newStatus);
    setIsPlaying(newStatus.isPlaying);
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
        onPress={() => track?.preview_url !== null && setIsVisible(!isVisible)}
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
        disabled={!track?.preview_url}
        name={isPlaying ? "pause" : "play"}
        size={25}
        style={{ marginHorizontal: 10 }}
        color={track?.preview_url ? "white" : "gray"}
      />
      <PlayerScreen
        sound={sound}
        track={track}
        status={status}
        isVisible={isVisible && track?.preview_url !== null}
        onClose={() => setIsVisible(false)}
        onPlayPause={onPlayPause}
        isPlaying={isPlaying}
        onSliderValueChange={handleSliderValueChange}
      />
      {track?.preview_url && (
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={status?.durationMillis}
          minimumTrackTintColor="#eee"
          thumbTintColor="transparent"
          maximumTrackTintColor="#ffffff"
          value={status?.positionMillis}
        />
      )}
    </View>
  );
};

export default Player;

// {"androidImplementation": "SimpleExoPlayer", "audioPan": 0, "didJustFinish": false, "durationMillis": 29753, "isBuffering": false, "isLoaded": true, "isLooping": false, "isMuted": false, "isPlaying": false, "playableDurationMillis": 29753, "positionMillis": 6315, "progressUpdateIntervalMillis": 500, "rate": 1, "shouldCorrectPitch": false, "shouldPlay": false, "uri": "/mp3-preview/93b9472ebea8c7759c699b496d6a2d3128b42459", "volume": 1}
