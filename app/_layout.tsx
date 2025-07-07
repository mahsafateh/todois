import { Stack } from "expo-router";
import "../global.css";
import {store} from "../store";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
  <Provider store={store}>
    <Stack>
      <Stack.Screen name="index" options={{ title: "TODO LIST" }} />
    </Stack>
   </Provider>
  
  );
}
