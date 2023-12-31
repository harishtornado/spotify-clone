import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  track: {
    marginVertical: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  trackImage: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  // search
  searchHeader: {
    fontWeight: "900",
    fontSize: 28,
    marginTop: 50,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginVertical: 15,
  },
  Icon: {
    width: 15,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarIcon: {
    width: 20,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  inputPlaceHolder: {
    flex: 1,
    fontWeight: "900",
    fontSize: 16,
    marginHorizontal: 10,
  },
  Player: {
    backgroundColor: "#2d2e2e",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 3,
  },
  PlayerScreen: {
    flex: 1,
    paddingHorizontal: 25,
  },
  PlayerImage: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
    marginVertical: 67,
  },
  PlayerIcon: {
    width: 25,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  PlayPauseButton: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  PlayPauseIcon: {
    width: 25,
    aspectRatio: 1,
    resizeMode: "center",
  },
  slider: {
    width: "100%",
    height: 2,
    position: "absolute",
    bottom: 0,
  },
});
