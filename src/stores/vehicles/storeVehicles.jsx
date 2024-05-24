export const storeVehicles = (set) => ({
  DataPerfilVehicles: [], // DATA_PERFIL_VEHICLES
  Vehicles: [], // DATA_VEHICLES
  GetDataVehicle: [],
  GetAllPlateByIdVehicle: [],
  // Authenticated: false, // VEHICLES_AUTHENTICATED

  setDataPerfilVehicles: (value) => set({ DataPerfilVehicles: value }),
  setVehicles: (value) => set({ Vehicles: value }),
  setGetDataVehicle: (value) => set({ GetDataVehicle: value }),
  setGetAllPlateByIdVehicle: (value) => set({ GetAllPlateByIdVehicle: value }),
  // setAuthenticated: (value) => set({ Authenticated: value }),
});
