import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { signUp } from '../../src/lib/auth';
import { colors, typography, spacing, borderRadius } from '../../src/constants/theme';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignUp() {
    setError('');
    setLoading(true);
    try {
      await signUp(email, password, displayName);
      router.replace('/(tabs)/tonight');
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Display name"
          placeholderTextColor={colors.gray[400]}
          value={displayName}
          onChangeText={setDisplayName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.gray[400]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.gray[400]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Text>
        </Pressable>
      </View>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.link}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: 100,
  },
  title: {
    ...typography.heading1,
    color: colors.black,
    marginBottom: spacing.xl,
  },
  error: {
    ...typography.bodySmall,
    color: colors.error,
    marginBottom: spacing.md,
  },
  form: {
    gap: spacing.md,
  },
  input: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderRadius: borderRadius.sm,
    ...typography.body,
    color: colors.black,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
  },
  link: {
    ...typography.body,
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
