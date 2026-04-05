import { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useEvents, useSportsEvents } from '../../src/hooks/useEvents';
import { useCityStore } from '../../src/stores/cityStore';
import { categories } from '../../src/constants/categories';
import { EventCard } from '../../src/components/events/EventCard';
import { colors, typography, spacing, borderRadius } from '../../src/constants/theme';

export default function ExploreScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { city } = useCityStore();
  const { events: allEvents, loading, savedIds, handleToggleSave } = useEvents();
  const { events: sportsEvents, loading: sportsLoading } = useSportsEvents();

  let events = selectedCategory
    ? allEvents.filter((e) => e.category === selectedCategory)
    : allEvents;

  if (search.trim()) {
    const q = search.toLowerCase();
    events = events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.location_name.toLowerCase().includes(q) ||
        (e.sport_type && e.sport_type.toLowerCase().includes(q)) ||
        (e.competition && e.competition.toLowerCase().includes(q))
    );
  }

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
          <View>
            <Text style={styles.heading}>Explore {city}</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Search events, venues, sports..."
              placeholderTextColor={colors.gray[400]}
              value={search}
              onChangeText={setSearch}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chips}
              contentContainerStyle={styles.chipsContent}
            >
              <Pressable
                style={[styles.chip, !selectedCategory && styles.chipActive]}
                onPress={() => setSelectedCategory(null)}
              >
                <Text
                  style={[
                    styles.chipText,
                    !selectedCategory && styles.chipTextActive,
                  ]}
                >
                  All
                </Text>
              </Pressable>
              {categories.map((cat) => (
                <Pressable
                  key={cat.slug}
                  style={[
                    styles.chip,
                    selectedCategory === cat.name && styles.chipActive,
                    cat.slug === 'sport' && styles.chipSport,
                    selectedCategory === cat.name && cat.slug === 'sport' && styles.chipSportActive,
                  ]}
                  onPress={() =>
                    setSelectedCategory(
                      selectedCategory === cat.name ? null : cat.name
                    )
                  }
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedCategory === cat.name && styles.chipTextActive,
                    ]}
                  >
                    {cat.emoji} {cat.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Sports fixtures highlight - show when no filter or Sport filter */}
            {(!selectedCategory || selectedCategory === 'Sport') && !search.trim() && (
              <View style={styles.sportsSection}>
                <Text style={styles.sportsSectionTitle}>⚽ Sports This Week</Text>
                <Text style={styles.sportsSectionSub}>
                  {sportsEvents.length} fixtures — tap for tickets
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.fixtureScroll}
                  contentContainerStyle={styles.fixtureScrollContent}
                >
                  {sportsEvents.map((event) => (
                    <Pressable
                      key={event.id}
                      style={styles.fixtureCard}
                      onPress={() => router.push(`/event/${event.id}`)}
                    >
                      <Text style={styles.fixtureEmoji}>{event.categoryEmoji}</Text>
                      {event.competition && (
                        <Text style={styles.fixtureComp}>{event.competition}</Text>
                      )}
                      <Text style={styles.fixtureTitle} numberOfLines={2}>
                        {event.title}
                      </Text>
                      <Text style={styles.fixtureVenue}>{event.location_name}</Text>
                      <Text style={styles.fixtureDate}>
                        {new Date(event.starts_at).toLocaleDateString('en-GB', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </Text>
                      {event.tickets && event.tickets.length > 0 ? (
                        <View style={styles.fixtureTicketBadge}>
                          <Text style={styles.fixtureTicketText}>
                            From ${Math.min(...event.tickets.map((t) => t.price))}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.fixtureFreeBadge}>
                          <Text style={styles.fixtureFreeText}>Free</Text>
                        </View>
                      )}
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

            <Text style={styles.allEventsHeading}>
              {selectedCategory ? selectedCategory : 'All Events'}
            </Text>
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No events found.</Text>
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
    marginBottom: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: borderRadius.sm,
    ...typography.body,
    color: colors.black,
    marginBottom: spacing.md,
  },
  chips: {
    marginBottom: spacing.md,
  },
  chipsContent: {
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipSport: {
    borderWidth: 1,
    borderColor: '#1B5E20',
  },
  chipSportActive: {
    backgroundColor: '#1B5E20',
    borderColor: '#1B5E20',
  },
  chipText: {
    ...typography.bodySmall,
    color: colors.gray[600],
    fontWeight: '500',
  },
  chipTextActive: {
    color: colors.white,
  },
  // Sports section
  sportsSection: {
    marginBottom: spacing.lg,
  },
  sportsSectionTitle: {
    ...typography.heading2,
    color: '#1B5E20',
    marginBottom: 2,
  },
  sportsSectionSub: {
    ...typography.bodySmall,
    color: colors.gray[500],
    marginBottom: spacing.md,
  },
  fixtureScroll: {
    marginHorizontal: -spacing.lg,
  },
  fixtureScrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  fixtureCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    width: 180,
    borderLeftWidth: 3,
    borderLeftColor: '#1B5E20',
  },
  fixtureEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  fixtureComp: {
    ...typography.caption,
    color: '#1B5E20',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  fixtureTitle: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 4,
  },
  fixtureVenue: {
    ...typography.caption,
    color: colors.gray[500],
    marginBottom: 4,
  },
  fixtureDate: {
    ...typography.caption,
    color: colors.gray[400],
    marginBottom: spacing.sm,
  },
  fixtureTicketBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  fixtureTicketText: {
    ...typography.caption,
    fontWeight: '700',
    color: '#E65100',
  },
  fixtureFreeBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  fixtureFreeText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.success,
  },
  allEventsHeading: {
    ...typography.heading3,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  empty: {
    ...typography.body,
    color: colors.gray[400],
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
