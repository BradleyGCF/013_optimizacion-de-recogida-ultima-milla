export const storeBranch = (set) => ({
  DataPerfilBranch: [], // DATA_PERFIL_Branch
  Branch: [], // DATA_Branch
  // Authenticated: false, // Branch_AUTHENTICATED

  setDataPerfilBranch: (value) => set({ DataPerfilBranch: value }),
  setBranch: (value) => set({ Branch: value }),
  // setAuthenticated: (value) => set({ Authenticated: value }),
});
