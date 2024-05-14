export const storeVehicles = (set) => ({
  DataPerfilVehicles: [], // DATA_PERFIL_VEHICLES
  Vehicles: [], // DATA_VEHICLES
  // Authenticated: false, // VEHICLES_AUTHENTICATED

  setDataPerfilVehicles: (value) => set({ DataPerfilVehicles: value }),
  setVehicles: (value) => set({ Vehicles: value }),
  // setAuthenticated: (value) => set({ Authenticated: value }),
});
