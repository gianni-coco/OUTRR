export const categories = [
  { slug: 'music', name: 'Music', emoji: '🎵' },
  { slug: 'food', name: 'Food & Drink', emoji: '🍽️' },
  { slug: 'sport', name: 'Sport', emoji: '⚽' },
  { slug: 'arts', name: 'Arts & Culture', emoji: '🎨' },
  { slug: 'outdoors', name: 'Outdoors', emoji: '🌿' },
  { slug: 'nightlife', name: 'Nightlife', emoji: '🌙' },
  { slug: 'charity', name: 'Charity', emoji: '💜' },
  { slug: 'pride', name: 'Pride & LGBTQ+', emoji: '🏳️‍🌈' },
  { slug: 'family', name: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { slug: 'markets', name: 'Markets', emoji: '🛒' },
  { slug: 'community', name: 'Community', emoji: '🤝' },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
