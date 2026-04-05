import { useState, useEffect, useCallback } from 'react';
import { mockEvents, getSavedEventIds, toggleSaveEvent, getEventById as getMockEventById, type Event } from '../lib/mockData';
import { fetchCityEvents, fetchCitySportsEvents } from '../lib/liveEvents';
import { useCityStore } from '../stores/cityStore';

// Merged store of mock + live events
let allEvents: Event[] = [...mockEvents];
let lastFetchedCity = '';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(allEvents);
  const [loading, setLoading] = useState(false);
  const [savedIds, setSavedIds] = useState(() => getSavedEventIds());
  const [, forceUpdate] = useState(0);
  const { city, countryCode, latLong } = useCityStore();

  useEffect(() => {
    const cityKey = `${city}-${countryCode}`;
    if (cityKey === lastFetchedCity) return;

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const liveEvents = await fetchCityEvents({ city, countryCode, latLong }, 0, 30);
        if (!cancelled && liveEvents.length > 0) {
          allEvents = [...liveEvents, ...mockEvents];
          setEvents(allEvents);
        } else if (!cancelled) {
          allEvents = [...mockEvents];
          setEvents(allEvents);
        }
      } catch {
        // Keep mock data on failure
      } finally {
        lastFetchedCity = cityKey;
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [city, countryCode, latLong]);

  const handleToggleSave = useCallback((id: string) => {
    toggleSaveEvent(id);
    setSavedIds(new Set(getSavedEventIds()));
    forceUpdate((n) => n + 1);
  }, []);

  return { events, loading, savedIds, handleToggleSave };
}

export function useSportsEvents() {
  const [events, setEvents] = useState<Event[]>(
    allEvents.filter((e) => e.category === 'Sport')
  );
  const [loading, setLoading] = useState(true);
  const { city, countryCode, latLong } = useCityStore();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const liveSports = await fetchCitySportsEvents({ city, countryCode, latLong });
        if (!cancelled && liveSports.length > 0) {
          const mockSports = mockEvents.filter((e) => e.category === 'Sport');
          setEvents([...liveSports, ...mockSports]);
        } else if (!cancelled) {
          setEvents(allEvents.filter((e) => e.category === 'Sport'));
        }
      } catch {
        if (!cancelled) setEvents(allEvents.filter((e) => e.category === 'Sport'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [city, countryCode, latLong]);

  return { events, loading };
}

// Unified event lookup — checks live events then mock
export function getEventByIdUnified(id: string): Event | undefined {
  return allEvents.find((e) => e.id === id) || getMockEventById(id);
}
