import { FlatList, TextInput, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../../components/Themed";

import { styles } from "../../styles/styles";
import { tracks } from "../../../assets/data/tracks";
import TrackListItem from "../../components/TrackListItem";
import { useState } from "react";

export default function SearchScreen() {
  const [search, setSearch] = useState("");

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
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
