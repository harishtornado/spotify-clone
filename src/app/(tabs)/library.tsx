import { ActivityIndicator, FlatList } from "react-native";
import { tracks } from "../../../assets/data/tracks";
import { SafeAreaView } from "react-native-safe-area-context";
import TrackListItem from "../../components/TrackListItem";
import { styles } from "../../styles/styles";
import { gql, useQuery } from "@apollo/client";
import ErrorScreen from "../../screens/ErrorScreen";

const query = gql`
  query getFavorite($userId: String!) {
    favoritesByUserid(userid: $userId) {
      id
      trackid
      userid
      track {
        id
        preview_url
        name
        artists {
          id
          name
        }
        album {
          id
          name
          images {
            height
            url
            width
          }
        }
      }
    }
  }
`;

export default function LibraryScreen() {
  const { data, loading, error } = useQuery(query, {
    variables: { userId: "harish" },
  });

  const tracks = (data?.favoritesByUserid || []).map((fav: any) => fav.track);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator color={"white"} size={50} />
      ) : error ? (
        <ErrorScreen />
      ) : (
        <FlatList
          data={tracks}
          renderItem={({ item }) => <TrackListItem track={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
