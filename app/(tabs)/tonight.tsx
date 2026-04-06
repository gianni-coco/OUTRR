import { useState, useMemo } from 'react';
import { View, Text, SectionList, StyleSheet, ActivityIndicator, Pressable, TextInput, ScrollView } from 'react-native';
import { useEvents } from '../../src/hooks/useEvents';
import { useLocationDetection } from '../../src/hooks/useLocation';
import { useCityStore } from '../../src/stores/cityStore';
import { EventCard } from '../../src/components/events/EventCard';
import { colors, typography, spacing, borderRadius } from '../../src/constants/theme';
import type { Event } from '../../src/lib/mockData';

const POPULAR_CITIES = [
  { city: 'Perth', countryCode: 'AU' },
  { city: 'Sydney', countryCode: 'AU' },
  { city: 'Melbourne', countryCode: 'AU' },
  { city: 'Brisbane', countryCode: 'AU' },
  { city: 'London', countryCode: 'GB' },
  { city: 'New York', countryCode: 'US' },
  { city: 'Los Angeles', countryCode: 'US' },
  { city: 'Toronto', countryCode: 'CA' },
  { city: 'Dublin', countryCode: 'IE' },
  { city: 'Berlin', countryCode: 'DE' },
  { city: 'Paris', countryCode: 'FR' },
  { city: 'Amsterdam', countryCode: 'NL' },
  { city: 'Barcelona', countryCode: 'ES' },
  { city: 'Auckland', countryCode: 'NZ' },
  { city: 'Singapore', countryCode: 'SG' },
  { city: 'Tokyo', countryCode: 'JP' },
];

function getMonthLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const isThisMonth = date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  const label = date.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
  return isThisMonth ? `${label} — This Month` : label;
}

function groupEventsByMonth(events: Event[]): { title: string; data: Event[] }[] {
  const sorted = [...events].sort(
    (a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
  );
  const grouped: Record<string, Event[]> = {};
  sorted.forEach((event) => {
    const key = getMonthLabel(event.starts_at);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(event);
  });
  return Object.entries(grouped).map(([title, data]) => ({ title, data }));
}

export default function EventsScreen() {
  const { events, loading, savedIds, handleToggleSave } = useEvents();
  const { city, isDetecting } = useLocationDetection();
  const { setCity } = useCityStore();
  const [showPicker, setShowPicker] = useState(false);
  const [customCity, setCustomCity] = useState('');

  const sections = useMemo(() => groupEventsByMonth(events), [events]);

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            isSaved={savedIds.has(item.id)}
            onToggleSave={handleToggleSave}
          />
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.monthHeader}>
            <Text style={styles.monthTitle}>{section.title}</Text>
            <View style={styles.monthDivider} />
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.heading}>What's On</Text>
            <Text style={styles.subheading}>Events month by month, all year round</Text>
            <Pressable style={styles.cityRow} onPress={() => setShowPicker(!showPicker)}>
              <Text style={styles.city}>
                {isDetecting ? '📍 Detecting location...' : `📍 ${city}`}
              </Text>
              <Text style={styles.changeCity}>{showPicker ? 'Close' : 'Change'}</Text>
            </Pressable>

            {showPicker && (
              <View style={styles.picker}>
                <View style={styles.customRow}>
                  <TextInput
                    style={styles.customInput}
                    placeholder="Type any city..."
                    placeholderTextColor={colors.gray[400]}
                    value={customCity}
                    onChangeText={setCustomCity}
                  />
                  {customCity.trim().length > 0 && (
                    <Pressable
                      style={styles.goBtn}
                      onPress={() => {
                        setCity(customCity.trim(), 'US');
                        setCustomCity('');
                        setShowPicker(false);
                      }}
                    >
                      <Text style={styles.goBtnText}>Go</Text>
                    </Pressable>
                  )}
                </View>

                <Text style={styles.popularLabel}>Popular cities</Text>
                <ScrollView style={styles.cityList} nestedScrollEnabled>
                  {POPULAR_CITIES.map((c) => (
                    <Pressable
                      key={`${c.city}-${c.countryCode}`}
                      style={[styles.cityOption, c.city === city && styles.cityOptionActive]}
                      onPress={() => {
                        setCity(c.city, c.countryCode);
                        setShowPicker(false);
                      }}
                    >
                      <Text style={[styles.cityOptionText, c.city === city && styles.cityOptionTextActive]}>
                        {c.city}
                      </Text>
                      <Text style={styles.cityOptionCountry}>{c.countryCode}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
          ) : (
            <Text style={styles.empty}>No events found.</Text>
          )
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
    paddingBottom: 40,
  },
  header: {
    marginBottom: spacing.md,
  },
  heading: {
    ...typography.heading1,
    color: colors.black,
  },
  subheading: {
    ...typography.bodySmall,
    color: colors.gray[400],
    marginTop: 2,
    marginBottom: spacing.xs,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  city: {
    ...typography.body,
    color: colors.gray[500],
  },
  changeCity: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  // Month section headers
  monthHeader: {
    backgroundColor: colors.background,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    paddingHorizontal: 0,
  },
  monthTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  monthDivider: {
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
    opacity: 0.25,
  },
  empty: {
    ...typography.body,
    color: colors.gray[400],
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  // Picker
  picker: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  customRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  customInput: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: borderRadius.sm,
    ...typography.body,
    color: colors.black,
  },
  goBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
  },
  goBtnText: {
    ...typography.button,
    color: colors.white,
  },
  popularLabel: {
    ...typography.caption,
    color: colors.gray[400],
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  cityList: {
    maxHeight: 300,
  },
  cityOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    marginBottom: 2,
  },
  cityOptionActive: {
    backgroundColor: colors.background,
  },
  cityOptionText: {
    ...typography.body,
    color: colors.black,
  },
  cityOptionTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  cityOptionCountry: {
    ...typography.caption,
    color: colors.gray[400],
  },
});
