import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import type { Event } from '../../lib/mockData';

interface EventCardProps {
  event: Event;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export function EventCard({ event, isSaved, onToggleSave }: EventCardProps) {
  const router = useRouter();

  const isSport = event.category === 'Sport';
  const hasTickets = event.tickets && event.tickets.length > 0;

  const priceLabel =
    event.price_type === 'free'
      ? 'Free'
      : event.price_type === 'donation'
        ? 'Donation'
        : `$${event.price_amount}`;

  return (
    <Pressable
      style={[styles.card, isSport && styles.cardSport]}
      onPress={() => router.push(`/event/${event.id}`)}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>{event.categoryEmoji}</Text>
        <View style={styles.headerText}>
          <Text style={[styles.category, isSport && styles.categorySport]}>
            {event.sport_type || event.category}
          </Text>
          {event.competition && (
            <Text style={styles.competition}>{event.competition}</Text>
          )}
          <Text style={styles.time}>
            {format(new Date(event.starts_at), 'EEE, d MMM · h:mm a')}
          </Text>
        </View>
        <Pressable
          style={styles.saveButton}
          onPress={(e) => {
            e.stopPropagation?.();
            onToggleSave(event.id);
          }}
        >
          <Text style={styles.saveIcon}>{isSaved ? '♥' : '♡'}</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.location}>{event.location_name}</Text>

      <View style={styles.footer}>
        <View
          style={[
            styles.priceBadge,
            event.price_type === 'free' && styles.priceFree,
          ]}
        >
          <Text
            style={[
              styles.priceText,
              event.price_type === 'free' && styles.priceTextFree,
            ]}
          >
            {priceLabel}
          </Text>
        </View>
        {hasTickets && (
          <View style={styles.ticketBadge}>
            <Text style={styles.ticketBadgeText}>🎟️ Tickets</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardSport: {
    borderLeftWidth: 4,
    borderLeftColor: '#1B5E20',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  emoji: {
    fontSize: 28,
    marginRight: spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  category: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categorySport: {
    color: '#1B5E20',
  },
  competition: {
    ...typography.caption,
    color: colors.gray[500],
    fontWeight: '500',
  },
  time: {
    ...typography.caption,
    color: colors.gray[500],
    marginTop: 2,
  },
  saveButton: {
    padding: spacing.sm,
  },
  saveIcon: {
    fontSize: 22,
    color: colors.primary,
  },
  title: {
    ...typography.heading3,
    color: colors.black,
    marginBottom: 4,
  },
  location: {
    ...typography.bodySmall,
    color: colors.gray[500],
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priceBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  priceFree: {
    backgroundColor: '#E8F5E9',
  },
  priceText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.primary,
  },
  priceTextFree: {
    color: colors.success,
  },
  ticketBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  ticketBadgeText: {
    ...typography.caption,
    fontWeight: '600',
    color: '#E65100',
  },
});
