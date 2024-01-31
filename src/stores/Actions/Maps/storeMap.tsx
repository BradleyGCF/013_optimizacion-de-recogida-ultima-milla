import create from 'zustand';

type State = {
  origin: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
  response: google.maps.DirectionsResult | null;
  travelMode: google.maps.TravelMode;
  setOrigin: (value: { lat: number; lng: number } | null) => void;
  setDestination: (value: { lat: number; lng: number } | null) => void;
  setResponse: (value: google.maps.DirectionsResult | null) => void;
};

export const useMapStore = create<State>((set) => ({
  origin: null,
  destination: null,
  response: null,
  travelMode: 'DRIVING' as google.maps.TravelMode,
  setOrigin: (value) => set({ origin: value }),
  setDestination: (value) => set({ destination: value }),
  setResponse: (value) => set({ response: value }),
}));