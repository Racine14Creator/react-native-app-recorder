import { Camera } from "expo-camera";
import React, { useRef, useState } from "react";
import { Button, View, Text } from "react-native";

const VideoRecorder = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef(null);
  const [videoUri, setVideoUri] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setRecording(true);
        const video = await cameraRef.current.recordAsync();
        setVideoUri(video.uri);
        console.log("Video recorded at", video.uri);
      } catch (err) {
        console.error("Failed to start recording", err);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setRecording(false);
    }
  };

  return (
    <View>
      {hasPermission ? (
        <Camera ref={cameraRef} style={{ flex: 1 }}>
          <View>
            <Button
              title={recording ? "Stop Recording" : "Start Recording"}
              onPress={recording ? stopRecording : startRecording}
            />
          </View>
        </Camera>
      ) : (
        <Text>No access to camera</Text>
      )}
      {videoUri ? <Text>Video recorded at: {videoUri}</Text> : null}
    </View>
  );
};

export default VideoRecorder;
