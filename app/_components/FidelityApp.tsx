import React from "react";
import { StyleSheet, View } from "react-native";
import AudioRecorder from "./AudioRecord";
import VideoRecorder from "./VideoRecord";

export default function App() {
  return (
    <View style={styles.container}>
      <AudioRecorder />
      <VideoRecorder />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
