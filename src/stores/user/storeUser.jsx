export const storeUser = (set) => ({
  DataPerfilUser: [], // DATA_PERFIL_USER
  User: [], // DATA_USER
  Admin: false,
  Authenticated: false, // USER_AUTHENTICATED
  AllUser: [],
  SearchBarOption: [],

  setDataPerfilUser: (value) => set({ DataPerfilUser: value }),
  setUser: (value) => set({ User: value }),
  setAdmin: (value) => set({ Admin: value }),
  setAuthenticated: (value) => set({ Authenticated: value }),
  setGetAllUsers: (value) => {
    set({ AllUser: value });
  },
  setSearchBarOption: (value) => set({ SearchBarOption: value }),
});
