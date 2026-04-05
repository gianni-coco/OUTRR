import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useCityStore } from '../stores/cityStore';

// Country code mapping for Ticketmaster (ISO 3166-1 alpha-2)
const COUNTRY_CODES: Record<string, string> = {
  'Australia': 'AU', 'United States': 'US', 'United Kingdom': 'GB',
  'Canada': 'CA', 'New Zealand': 'NZ', 'Germany': 'DE', 'France': 'FR',
  'Spain': 'ES', 'Italy': 'IT', 'Netherlands': 'NL', 'Belgium': 'BE',
  'Ireland': 'IE', 'Sweden': 'SE', 'Norway': 'NO', 'Denmark': 'DK',
  'Finland': 'FI', 'Austria': 'AT', 'Switzerland': 'CH', 'Portugal': 'PT',
  'Poland': 'PL', 'Czech Republic': 'CZ', 'Mexico': 'MX', 'Brazil': 'BR',
  'Japan': 'JP', 'Singapore': 'SG', 'South Africa': 'ZA', 'India': 'IN',
  'China': 'CN', 'South Korea': 'KR', 'Thailand': 'TH', 'Malaysia': 'MY',
  'Indonesia': 'ID', 'Philippines': 'PH', 'UAE': 'AE',
};

async function reverseGeocode(lat: number, lng: number): Promise<{ city: string; countryCode: string } | null> {
  try {
    // Use free Nominatim API for reverse geocoding
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      { headers: { 'User-Agent': 'OUTRR-App/1.0' } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const addr = data.address;
    const city = addr?.city || addr?.town || addr?.village || addr?.municipality || addr?.county || 'Unknown';
    const country = addr?.country || '';
    const countryCode = (addr?.country_code || COUNTRY_CODES[country] || 'AU').toUpperCase();
    return { city, countryCode };
  } catch {
    return null;
  }
}

async function detectLocationWeb(): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    if (!navigator?.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve(null),
      { timeout: 8000, maximumAge: 300000 }
    );
  });
}

async function detectLocationNative(): Promise<{ lat: number; lng: number } | null> {
  try {
    const Location = require('expo-location');
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;
    const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
    return { lat: loc.coords.latitude, lng: loc.coords.longitude };
  } catch {
    return null;
  }
}

export function useLocationDetection() {
  const { city, setCity, setDetecting, isDetecting } = useCityStore();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setDetecting(true);
      try {
        const coords = Platform.OS === 'web'
          ? await detectLocationWeb()
          : await detectLocationNative();

        if (cancelled || !coords) return;

        const geo = await reverseGeocode(coords.lat, coords.lng);
        if (cancelled || !geo) return;

        setCity(geo.city, geo.countryCode, `${coords.lat},${coords.lng}`);
      } catch {
        // Keep default city on failure
      } finally {
        if (!cancelled) setDetecting(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return { city, isDetecting };
}
