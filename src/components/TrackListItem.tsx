import { View, Text, Image, Pressable } from "react-native";
import { Track } from "../types";
import { styles } from "../styles/styles";
import { usePlayerContext } from "../providers/PlayerProvider";

type TrackListItemProps = {
  track: Track;
};

const TrackListItem = ({ track }: TrackListItemProps) => {
  const { setTrack } = usePlayerContext();
  return (
    <Pressable onPress={() => setTrack(track)} style={styles.track}>
      <Image
        source={{ uri: track.album.images[0]?.url }}
        style={styles.trackImage}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white", fontWeight: "500", fontSize: 15 }}>
          {track.name}
        </Text>
        <Text style={{ color: "gray" }}>{track.artists[0]?.name}</Text>
      </View>
    </Pressable>
  );
};

export default TrackListItem;
