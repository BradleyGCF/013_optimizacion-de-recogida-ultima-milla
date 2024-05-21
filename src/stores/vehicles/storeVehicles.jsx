export const storeVehicles = (set) => ({
  DataPerfilVehicles: [], // DATA_PERFIL_VEHICLES
  Vehicles: [], // DATA_VEHICLES
  GetDataVehicle: [],
  // Authenticated: false, // VEHICLES_AUTHENTICATED

  setDataPerfilVehicles: (value) => set({ DataPerfilVehicles: value }),
  setVehicles: (value) => set({ Vehicles: value }),
  setGetDataVehicle: (value) => set({ GetDataVehicle: value }),
  // setAuthenticated: (value) => set({ Authenticated: value }),
});
