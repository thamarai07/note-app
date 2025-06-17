export const UpdateLocalStorageNote = (key, id, updates) => {
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    const updated = stored.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // Optional: trigger a global update
  };
  