import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import BackgroundTimer from "react-native-background-timer";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Search Term</Text>
      <TextInput clearTextOnFocus={true} style={styles.tinput}></TextInput>

      <Text>Target price</Text>
      <TextInput
        clearTextOnFocus={true}
        style={styles.tinput}
        inputMode="numeric"
      ></TextInput>
      <Button
        styles={styles.alertButton}
        title="set alert"
        onPress={() => {
          BackgroundTimer.runBackgroundTimer(() => {
            // TODO: call backend each 30 minutes
            console.log("a notification should be trigger right now");
            testNotificationSending();
          }, 10000);
        }}
      />
    </View>
  );
}

async function testNotificationSending() {
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  tinput: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    borderColor: "black",
    borderWidth: 2.5,
    borderRadius: 10,
    padding: 10,
  },
  alertButton: {
    padding: 30,
  },
});
