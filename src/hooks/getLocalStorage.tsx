export const getLocalStorage = (path: string) => {
  const userLocal = localStorage.getItem(path);
  if (userLocal) {
    const userStorage = JSON.parse(userLocal);
    if (userStorage.objectId) {
      return userStorage;
    }
    if (userLocal && path === "shoppingCard") {
      const userStorage = JSON.parse(userLocal);
      return userStorage;
    }
  }
  return;
};
