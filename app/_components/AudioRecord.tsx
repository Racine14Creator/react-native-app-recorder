import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import React, { useState } from "react";
import { Button, View, Text } from "react-native";

const AudioRecorder = () => {
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState("");

  const startRecording = async () => {
    try {
      const permission = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );
      if (permission.status !== "granted") {
        alert("Permission to access microphone is required!");
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
      console.log("Recording stopped and stored at", uri);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const uploadToCloudinary = async (fileUri) => {
    const data = new FormData();
    data.append("file", {
      uri: fileUri,
      type: "audio/x-wav",
      name: "record.wav",
    });
    data.append("upload_preset", "your_upload_preset");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Failed to upload to Cloudinary", error);
    }
  };

  return (
    <View>
      <Button
        title='Start Recording'
        onPress={startRecording}
        disabled={recording !== null}
      />
      <Button
        title='Stop Recording'
        onPress={stopRecording}
        disabled={recording === null}
      />
      {audioUri ? <Text>Audio recorded at: {audioUri}</Text> : null}
    </View>
  );
};

export default AudioRecorder;
