export const storeBranch = (set) => ({
  DataPerfilBranch: [], // DATA_PERFIL_Branch
  Branch: [], // DATA_Branch
  DataBranchSearch: [],
  AllRoute: [],
  // Authenticated: false, // Branch_AUTHENTICATED

  setDataPerfilBranch: (value) => set({ DataPerfilBranch: value }),
  setBranch: (value) => set({ Branch: value }),
  setDataBranchSearch: (value) => set({ DataBranchSearch: value }),
  setAllRoute: (value) => set({ AllRoute: value }),
});
