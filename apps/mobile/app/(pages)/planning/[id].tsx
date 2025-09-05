import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

/**
 * A screen that displays the details for a specific packing list.
 * This component uses the `useLocalSearchParams` hook to get the `id` of the packing list from the URL.
 */
export default function PackingListDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details for Packing List {id}</Text>
    </View>
  );
}
