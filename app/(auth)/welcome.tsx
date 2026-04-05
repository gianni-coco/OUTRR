import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing } from '../../src/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.wordmark}>OUTRR</Text>
        <Text style={styles.tagline}>Get out there. Find what's on.</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push('/(auth)/sign-up')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push('/(auth)/sign-in')}
        >
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 120,
    paddingBottom: 60,
  },
  hero: {
    alignItems: 'center',
  },
  wordmark: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -2,
    textTransform: 'uppercase',
  },
  tagline: {
    ...typography.body,
    color: colors.gray[500],
    marginTop: spacing.sm,
  },
  actions: {
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.white,
  },
  secondaryButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.primary,
  },
});
