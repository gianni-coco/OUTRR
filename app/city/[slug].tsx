import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing } from '../../src/constants/theme';

export default function CityScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>City Events</Text>
      <Text style={styles.subtext}>City: {slug}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  heading: {
    ...typography.heading1,
    color: colors.black,
  },
  subtext: {
    ...typography.body,
    color: colors.gray[500],
    marginTop: spacing.sm,
  },
});
