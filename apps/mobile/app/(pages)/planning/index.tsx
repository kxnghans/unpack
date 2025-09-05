import { View } from 'react-native';
import { Link } from 'expo-router';
import { Card } from '@ui/Card';
import { PACKING_LISTS } from '../../../lib/mock-data';

/**
 * The main screen for the planning tab.
 * This component displays a list of packing lists from the mock data.
 */
export default function PlanningScreen() {
  return (
    <View style={{ flex: 1 }}>
      {PACKING_LISTS.map((list) => (
        <Link key={list.id} href={`/planning/${list.id}`} asChild>
          <Card title={list.name} subtitle={`${list.items} items`} />
        </Link>
      ))}
    </View>
  );
}
