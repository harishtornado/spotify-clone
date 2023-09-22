import { FlatList } from "react-native";
import { tracks } from "../../../assets/data/tracks";
import { SafeAreaView } from "react-native-safe-area-context";
import TrackListItem from "../../components/TrackListItem";
import { styles } from "../../styles/styles";
import Player from "../../components/Player";
import PlayerScreen from "../../screens/PlayerScreen";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
