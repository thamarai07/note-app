export const DeleteLocalStorage = (key, removeValue) => {
  const stored = JSON.parse(localStorage.getItem(key));
  if (key === "tags") {
    let updated = stored.filter((_, index) => index !== removeValue);
    localStorage.setItem(key, JSON.stringify(updated));
  }
  if (key === "notes") {
    let updated = stored.filter((value, index) => value.id !== removeValue);
    localStorage.setItem(key, JSON.stringify(updated));
  }
};
