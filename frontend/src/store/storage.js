const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const createWebStorage = (type) => {
  const storage = window[type];

  return {
    getItem(key) {
      return Promise.resolve(storage.getItem(key));
    },

    setItem(key, value) {
      return Promise.resolve(storage.setItem(key, value));
    },

    removeItem(key) {
      return Promise.resolve(storage.removeItem(key));
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("localStorage")
    : createNoopStorage();

export default storage;