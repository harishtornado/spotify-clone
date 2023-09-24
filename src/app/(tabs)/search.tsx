import {
  FlatList,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../../components/Themed";
import { styles } from "../../styles/styles";
import TrackListItem from "../../components/TrackListItem";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import ErrorScreen from "../../screens/ErrorScreen";

const query = gql`
  query MyQuery($q: String!) {
    search(q: $q) {
      tracks {
        items {
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
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState("");

  const { data, loading, error } = useQuery(query, {
    variables: { q: search },
  });

  const tracks = data?.search?.tracks?.items || [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.searchHeader}>Search</Text>
      <View style={styles.searchBar}>
        <Image
          source={require("../../../assets/icons/search.png")}
          alt="search"
          // @ts-ignore
          style={styles.searchBarIcon}
        />
        <TextInput
          value={search}
          placeholder="Artists,songs, or podcasts"
          style={styles.inputPlaceHolder}
          onChangeText={setSearch}
        />
        <Pressable onPress={() => setSearch("")} style={styles.Icon}>
          <Image
            source={require("../../../assets/icons/close.png")}
            alt="close"
            style={{ height: "100%", width: "100%" }}
          />
        </Pressable>
      </View>
      {loading ? (
        search !== "" ? (
          <ActivityIndicator color={"white"} size={50} />
        ) : (
          ""
        )
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
