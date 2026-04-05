import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { format } from 'date-fns';
import {
  getSavedEventIds,
  toggleSaveEvent,
  purchaseTicket,
  type TicketTier,
  type PurchasedTicket,
} from '../../src/lib/mockData';
import { getEventByIdUnified } from '../../src/hooks/useEvents';
import { colors, typography, spacing, borderRadius } from '../../src/constants/theme';
import { useState } from 'react';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = getEventByIdUnified(id);
  const [saved, setSaved] = useState(() => getSavedEventIds().has(id));
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [confirmation, setConfirmation] = useState<PurchasedTicket | null>(null);
  const [error, setError] = useState('');

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Event not found.</Text>
      </View>
    );
  }

  const priceLabel =
    event.price_type === 'free'
      ? 'Free'
      : event.price_type === 'donation'
        ? 'Donation'
        : `From A$${event.price_amount}`;

  const isSport = event.category === 'Sport';
  const hasTickets = event.tickets && event.tickets.length > 0;
  const selectedTierData = event.tickets?.find((t) => t.id === selectedTier);

  function handlePurchase() {
    if (!selectedTier) return;
    setError('');
    try {
      const ticket = purchaseTicket(event!.id, selectedTier, quantity);
      setConfirmation(ticket);
      setSelectedTier(null);
      setQuantity(1);
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <View style={[styles.hero, isSport && styles.heroSport]}>
        <Text style={styles.heroEmoji}>{event.categoryEmoji}</Text>
        {event.competition && (
          <Text style={styles.competition}>{event.competition}</Text>
        )}
      </View>

      <View style={styles.details}>
        {isSport && event.sport_type && (
          <Text style={styles.sportType}>{event.sport_type}</Text>
        )}
        <Text style={styles.category}>{event.category}</Text>
        <Text style={styles.title}>{event.title}</Text>

        {isSport && event.home_team && event.away_team && (
          <View style={styles.matchup}>
            <View style={styles.teamBlock}>
              <Text style={styles.teamName}>{event.home_team}</Text>
              <Text style={styles.teamLabel}>HOME</Text>
            </View>
            <Text style={styles.vs}>VS</Text>
            <View style={styles.teamBlock}>
              <Text style={styles.teamName}>{event.away_team}</Text>
              <Text style={styles.teamLabel}>AWAY</Text>
            </View>
          </View>
        )}

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>📅</Text>
          <Text style={styles.metaValue}>
            {format(new Date(event.starts_at), 'EEEE, d MMMM · h:mm a')}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>📍</Text>
          <Text style={styles.metaValue}>{event.location_name}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>💷</Text>
          <Text style={styles.metaValue}>{priceLabel}</Text>
        </View>

        <Text style={styles.descriptionHeading}>About</Text>
        <Text style={styles.description}>{event.description}</Text>

        {/* Confirmation banner */}
        {confirmation && (
          <View style={styles.confirmationBanner}>
            <Text style={styles.confirmationTitle}>✅ Ticket Purchased!</Text>
            <Text style={styles.confirmationText}>
              {confirmation.quantity}x {confirmation.tierName}
            </Text>
            <Text style={styles.confirmationText}>
              Total: ${confirmation.totalPrice}
            </Text>
            <Text style={styles.confirmationCode}>
              {confirmation.confirmationCode}
            </Text>
            <Pressable
              style={styles.buyAnotherBtn}
              onPress={() => setConfirmation(null)}
            >
              <Text style={styles.buyAnotherText}>Buy more tickets</Text>
            </Pressable>
          </View>
        )}

        {/* Ticket selection */}
        {hasTickets && !confirmation && (
          <View style={styles.ticketSection}>
            <Text style={styles.ticketHeading}>🎟️ Get Tickets</Text>

            {event.tickets!.map((tier) => (
              <Pressable
                key={tier.id}
                style={[
                  styles.ticketTier,
                  selectedTier === tier.id && styles.ticketTierSelected,
                  tier.available === 0 && styles.ticketTierSoldOut,
                ]}
                onPress={() => {
                  if (tier.available > 0) {
                    setSelectedTier(selectedTier === tier.id ? null : tier.id);
                    setQuantity(1);
                  }
                }}
              >
                <View style={styles.ticketTierHeader}>
                  <Text
                    style={[
                      styles.ticketTierName,
                      selectedTier === tier.id && styles.ticketTierNameSelected,
                    ]}
                  >
                    {tier.name}
                  </Text>
                  <Text
                    style={[
                      styles.ticketTierPrice,
                      selectedTier === tier.id && styles.ticketTierPriceSelected,
                    ]}
                  >
                    {tier.available === 0 ? 'Sold Out' : `$${tier.price}`}
                  </Text>
                </View>
                <Text style={styles.ticketTierDesc}>{tier.description}</Text>
                {tier.available > 0 && tier.available <= 10 && (
                  <Text style={styles.ticketLow}>
                    Only {tier.available} left!
                  </Text>
                )}

                {selectedTier === tier.id && (
                  <View style={styles.quantityRow}>
                    <Text style={styles.quantityLabel}>Qty:</Text>
                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Text style={styles.qtyBtnText}>−</Text>
                    </Pressable>
                    <Text style={styles.qtyValue}>{quantity}</Text>
                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() =>
                        setQuantity(Math.min(tier.available, quantity + 1))
                      }
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </Pressable>
                    <Text style={styles.qtyTotal}>
                      = ${tier.price * quantity}
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {selectedTier && (
              <Pressable style={styles.purchaseBtn} onPress={handlePurchase}>
                <Text style={styles.purchaseBtnText}>
                  Buy {quantity} {quantity === 1 ? 'Ticket' : 'Tickets'} — $
                  {selectedTierData ? selectedTierData.price * quantity : 0}
                </Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Save button */}
        <View style={styles.actions}>
          <Pressable
            style={[styles.saveBtn, saved && styles.saveBtnActive]}
            onPress={() => {
              toggleSaveEvent(event.id);
              setSaved(!saved);
            }}
          >
            <Text
              style={[styles.saveBtnText, saved && styles.saveBtnTextActive]}
            >
              {saved ? '♥ Saved' : '♡ Save'}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 40,
  },
  backButton: {
    padding: spacing.lg,
  },
  backText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  hero: {
    height: 180,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSport: {
    backgroundColor: '#1B5E20',
  },
  heroEmoji: {
    fontSize: 64,
  },
  competition: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: spacing.sm,
  },
  details: {
    padding: spacing.lg,
  },
  sportType: {
    ...typography.caption,
    color: '#1B5E20',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  category: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.heading1,
    color: colors.black,
    marginBottom: spacing.md,
  },
  matchup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  teamBlock: {
    alignItems: 'center',
    flex: 1,
  },
  teamName: {
    ...typography.heading2,
    color: colors.black,
  },
  teamLabel: {
    ...typography.caption,
    color: colors.gray[400],
    fontWeight: '600',
    marginTop: 4,
  },
  vs: {
    ...typography.heading2,
    color: colors.gray[400],
    marginHorizontal: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  metaLabel: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  metaValue: {
    ...typography.body,
    color: colors.gray[600],
  },
  descriptionHeading: {
    ...typography.heading3,
    color: colors.black,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.gray[600],
    lineHeight: 24,
  },
  // Ticket section
  ticketSection: {
    marginTop: spacing.xl,
  },
  ticketHeading: {
    ...typography.heading2,
    color: colors.black,
    marginBottom: spacing.md,
  },
  ticketTier: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  ticketTierSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F3F1FF',
  },
  ticketTierSoldOut: {
    opacity: 0.5,
  },
  ticketTierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ticketTierName: {
    ...typography.heading3,
    color: colors.black,
  },
  ticketTierNameSelected: {
    color: colors.primary,
  },
  ticketTierPrice: {
    ...typography.heading3,
    color: colors.primary,
  },
  ticketTierPriceSelected: {
    color: colors.primary,
  },
  ticketTierDesc: {
    ...typography.bodySmall,
    color: colors.gray[500],
  },
  ticketLow: {
    ...typography.caption,
    color: colors.error,
    fontWeight: '600',
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  quantityLabel: {
    ...typography.body,
    color: colors.gray[600],
    marginRight: spacing.sm,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
  },
  qtyValue: {
    ...typography.heading3,
    color: colors.black,
    marginHorizontal: spacing.md,
    minWidth: 24,
    textAlign: 'center',
  },
  qtyTotal: {
    ...typography.heading3,
    color: colors.primary,
    marginLeft: 'auto',
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: spacing.sm,
  },
  purchaseBtn: {
    backgroundColor: '#1B5E20',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  purchaseBtnText: {
    ...typography.button,
    color: colors.white,
    fontSize: 18,
  },
  // Confirmation
  confirmationBanner: {
    backgroundColor: '#E8F5E9',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  confirmationTitle: {
    ...typography.heading2,
    color: '#1B5E20',
    marginBottom: spacing.sm,
  },
  confirmationText: {
    ...typography.body,
    color: '#2E7D32',
  },
  confirmationCode: {
    ...typography.heading2,
    color: '#1B5E20',
    marginTop: spacing.md,
    letterSpacing: 2,
  },
  buyAnotherBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
  },
  buyAnotherText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  // Save / actions
  actions: {
    marginTop: spacing.xl,
  },
  saveBtn: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  saveBtnActive: {
    backgroundColor: colors.primary,
  },
  saveBtnText: {
    ...typography.button,
    color: colors.primary,
  },
  saveBtnTextActive: {
    color: colors.white,
  },
  notFound: {
    ...typography.body,
    color: colors.gray[500],
    textAlign: 'center',
    marginTop: 100,
  },
});
