export const getLocalStorage = (path: string) => {
  const userLocal = localStorage.getItem(path);
  if (path === "vehicle" && userLocal) {
    const userStorage = JSON.parse(userLocal);
    if (userStorage.vehicleId) {
      return userStorage;
    }
  }
  if (path === "Parse/013/currentUser" && userLocal) {
    const userStorage = JSON.parse(userLocal);
    if (userStorage.objectId) {
      return userStorage;
    }
    return userStorage;
  }
  return;
};
