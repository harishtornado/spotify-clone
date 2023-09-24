import { ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrackListItem from "../../components/TrackListItem";
import { styles } from "../../styles/styles";
import { gql, useQuery } from "@apollo/client";
import ErrorScreen from "../../screens/ErrorScreen";

const query = gql`
  query MyQuery($genre: String!) {
    recommendations(seed_genres: $genre) {
      tracks {
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

export default function HomeScreen() {
  const { data, loading, error } = useQuery(query, {
    variables: { genre: "pop" },
  });

  const tracks = data?.recommendations?.tracks || [];
  console.log(tracks);

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
