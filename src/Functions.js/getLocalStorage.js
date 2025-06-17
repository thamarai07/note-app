export const getLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return JSON.parse(item);
};
