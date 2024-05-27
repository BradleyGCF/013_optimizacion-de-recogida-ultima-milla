export const storeInventory = (set: any) => ({
  DataPerfilInventory: [], // DATA_PERFIL_Inventory
  Inventory: [], // DATA_Inventory
  DataInventorySearch: [],
  // Authenticated: false, // Inventory_AUTHENTICATED

  setDataPerfilInventory: (value: any) => set({ DataPerfilInventory: value }),
  setInventory: (value: any) => set({ Inventory: value }),
  setDataInventorySearch: (value: any) => set({ DataInventorySearch: value }),

  // setAuthenticated: (value) => set({ Authenticated: value }),
});
