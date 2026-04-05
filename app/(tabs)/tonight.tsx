import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable, TextInput, ScrollView } from 'react-native';
import { useEvents } from '../../src/hooks/useEvents';
import { useLocationDetection } from '../../src/hooks/useLocation';
import { useCityStore } from '../../src/stores/cityStore';
import { EventCard } from '../../src/components/events/EventCard';
import { colors, typography, spacing, borderRadius } from '../../src/constants/theme';

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

export default function TonightScreen() {
  const { events, loading, savedIds, handleToggleSave } = useEvents();
  const { city, isDetecting } = useLocationDetection();
  const { setCity } = useCityStore();
  const [showPicker, setShowPicker] = useState(false);
  const [customCity, setCustomCity] = useState('');

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
          <View style={styles.header}>
            <Text style={styles.heading}>What's on tonight</Text>
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
  },
  header: {
    marginBottom: spacing.lg,
  },
  heading: {
    ...typography.heading1,
    color: colors.black,
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
