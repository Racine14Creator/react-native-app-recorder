import BackgroundFetch from "react-native-background-fetch";

BackgroundFetch.configure(
  {
    minimumFetchInterval: 15, // fetch interval in minutes
  },
  async (taskId) => {
    console.log("Background fetch executed: ", taskId);
    // Perform your background task here, e.g., upload to Cloudinary
    BackgroundFetch.finish(taskId);
  },
  (error) => {
    console.log("Background Fetch failed to start:", error);
  }
);
