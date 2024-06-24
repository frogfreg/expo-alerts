import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function testNotifactionSending() {
  const { status: currentStatus } = await Notifications.getPermissionsAsync();

  console.log(currentStatus);
  const { status } = await Notifications.requestPermissionsAsync();

  // if (Platform.OS === "android") {
  //   await Notifications.setNotificationChannelAsync("default", {
  //     name: "default",
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     lightColor: "#FF231F7C",
  //   });
  // }

  if (status !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "This is a notification title📬",
      body: "Here is the notification body",
      data: { data: "this is some data" },
    },
    trigger: null,
  });
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>This should be a native android/ios app at some point</Text>
      <Button
        title="press to schedule a notification"
        onPress={testNotifactionSending}
      />
      <StatusBar style="auto" />
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
