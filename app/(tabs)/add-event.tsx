import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../src/constants/theme';

export default function AddEventScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Event</Text>
      <Text style={styles.subtext}>Share what's happening near you.</Text>
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
