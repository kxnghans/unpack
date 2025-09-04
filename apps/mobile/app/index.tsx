import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome to Unpack 🚀</Text>
      <Link href="/itinerary" asChild>
        <Button title="Go to Itinerary" />
      </Link>
    </View>
  );
}
