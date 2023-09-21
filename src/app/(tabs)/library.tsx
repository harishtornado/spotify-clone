import { FlatList } from "react-native";
import { tracks } from "../../../assets/data/tracks";
import { SafeAreaView } from "react-native-safe-area-context";
import TrackListItem from "../../components/TrackListItem";
import { styles } from "../../styles/styles";

export default function LibraryScreen() {
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
