import { View, Text, Image } from "react-native";
import { Track } from "../types";
import { styles } from "../styles/styles";

type TrackListItemProps = {
  track: Track;
};

const TrackListItem = ({ track }: TrackListItemProps) => {
  return (
    <View style={styles.track}>
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
    </View>
  );
};

export default TrackListItem;
