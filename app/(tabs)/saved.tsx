import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getSavedEvents, getSavedEventIds, toggleSaveEvent } from '../../src/lib/mockData';
import { EventCard } from '../../src/components/events/EventCard';
import { colors, typography, spacing } from '../../src/constants/theme';

export default function SavedScreen() {
  const [savedIds, setSavedIds] = useState(() => getSavedEventIds());
  const [, forceUpdate] = useState(0);

  const events = getSavedEvents();

  const handleToggleSave = useCallback((id: string) => {
    toggleSaveEvent(id);
    setSavedIds(getSavedEventIds());
    forceUpdate((n) => n + 1);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            isSaved={savedIds.has(item.id)}
            onToggleSave={handleToggleSave}
          />
        )}
        ListHeaderComponent={
          <Text style={styles.heading}>Saved</Text>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>♡</Text>
            <Text style={styles.emptyTitle}>No saved events yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the heart on any event to save it here.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.lg,
  },
  heading: {
    ...typography.heading1,
    color: colors.black,
    marginBottom: spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyEmoji: {
    fontSize: 48,
    color: colors.gray[300],
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.heading3,
    color: colors.gray[500],
  },
  emptySubtext: {
    ...typography.body,
    color: colors.gray[400],
    marginTop: spacing.xs,
  },
});
