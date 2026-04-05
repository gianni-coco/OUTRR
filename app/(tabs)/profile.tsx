import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut } from '../../src/lib/auth';
import { useAuthStore } from '../../src/stores/authStore';
import { colors, typography, spacing, borderRadius } from '../../src/constants/theme';

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.display_name?.charAt(0)?.toUpperCase() || '?'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.display_name || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <Pressable style={styles.signOutButton} onPress={async () => { await signOut(); router.replace('/(auth)/welcome'); }}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
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
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  name: {
    ...typography.heading2,
    color: colors.black,
  },
  email: {
    ...typography.bodySmall,
    color: colors.gray[500],
    marginTop: spacing.xs,
  },
  signOutButton: {
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
  },
  signOutText: {
    ...typography.button,
    color: colors.error,
  },
});
