export const storage = {
  get: async <T>(key: string): Promise<T | null> => {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key] || null);
      });
    });
  },
  
  set: async <T>(key: string, value: T): Promise<void> => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, resolve);
    });
  }
};