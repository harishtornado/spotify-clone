import { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { styles } from "../styles/styles";

const PlayerScreen = ({
  sound,
  status,
  isVisible,
  onClose,
  track,
  isPlaying,
  onPlayPause,
  onSliderValueChange,
}) => {
  const [isRepeat, setIsRepeat] = useState(false);
  const formatDuration = (input) => {
    const totalSeconds = Math.floor(input / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedDuration = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
    return formattedDuration;
  };

  return (
    <Modal isVisible={isVisible} style={{ flex: 1, margin: 0 }}>
      <LinearGradient
        colors={["#444", "#222", "#000"]}
        style={styles.PlayerScreen}
      >
        <Pressable onPress={() => onClose()}>
          <Image
            source={require("../../assets/icons/down-arrow.png")}
            style={{
              marginTop: 20,
              width: 30,
              height: 30,
              resizeMode: "cover",
              tintColor: "white",
            }}
          />
        </Pressable>
        <Image
          source={{ uri: track.album.images[0]?.url }}
          style={styles.PlayerImage}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 25,
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "900" }}>
              {track.name}
            </Text>
            <Text style={{ color: "gray", fontSize: 15, fontWeight: "600" }}>
              {track.artists[0].name}
            </Text>
          </View>
          <Ionicons name={"heart-outline"} size={30} color={"white"} />
        </View>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          //@ts-ignore
          maximumValue={status?.durationMillis ?? 0}
          minimumTrackTintColor="#eee"
          maximumTrackTintColor="#ffffff"
          thumbTintColor="white"
          value={status?.positionMillis ?? 0}
          onValueChange={onSliderValueChange}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "white", fontSize: 12, fontWeight: "900" }}>
            {formatDuration(status?.positionMillis)}
          </Text>
          <Text style={{ color: "white", fontSize: 12, fontWeight: "900" }}>
            {formatDuration(status?.durationMillis)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/icons/shuffle.png")}
            style={styles.PlayerIcon}
          />
          <Image
            source={require("../../assets/icons/previous.png")}
            style={styles.PlayerIcon}
          />
          <Pressable onPress={onPlayPause} style={styles.PlayPauseButton}>
            <Image
              source={
                isPlaying
                  ? require("../../assets/icons/pause.png")
                  : require("../../assets/icons/play.png")
              }
              style={styles.PlayPauseIcon}
            />
          </Pressable>
          <Image
            source={require("../../assets/icons/next.png")}
            style={styles.PlayerIcon}
          />
          <Pressable
            onPress={() => setIsRepeat(!isRepeat)}
            style={styles.PlayerIcon}
          >
            <Image
              source={
                isRepeat
                  ? require("../../assets/icons/repeat-active.png")
                  : require("../../assets/icons/repeat.png")
              }
              style={{ width: "100%", height: "100%" }}
            />
          </Pressable>
        </View>
      </LinearGradient>
    </Modal>
  );
};

export default PlayerScreen;
