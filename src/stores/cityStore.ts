import { create } from 'zustand';
import type { CityLocation } from '../lib/liveEvents';

export interface CityState {
  city: string;
  countryCode: string;
  latLong?: string;
  isDetecting: boolean;
  setCity: (city: string, countryCode: string, latLong?: string) => void;
  setDetecting: (v: boolean) => void;
  getLocation: () => CityLocation;
}

export const useCityStore = create<CityState>((set, get) => ({
  city: 'Perth',
  countryCode: 'AU',
  latLong: undefined,
  isDetecting: false,
  setCity: (city, countryCode, latLong) => set({ city, countryCode, latLong }),
  setDetecting: (isDetecting) => set({ isDetecting }),
  getLocation: () => ({
    city: get().city,
    countryCode: get().countryCode,
    latLong: get().latLong,
  }),
}));
