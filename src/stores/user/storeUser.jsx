export const storeUser = (set) => ({
  DataPerfilUser: [], // DATA_PERFIL_USER
  User: [], // DATA_USER
  Admin: false,
  Authenticated: false, // USER_AUTHENTICATED
  GetAllUser: [],

  setDataPerfilUser: (value) => set({ DataPerfilUser: value }),
  setUser: (value) => set({ User: value }),
  setAdmin: (value) => set({ Admin: value }),
  setAuthenticated: (value) => set({ Authenticated: value }),
  setGetAllUsers: (value) => set({ GetAllUser: value }),
});
