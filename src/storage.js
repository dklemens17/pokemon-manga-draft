// The game was built as a Claude artifact, where `window.storage` saves the scoreboard and badges.
// Outside Claude that API doesn't exist, so this stands in for it with the browser's localStorage:
// same async get/set/list shape, so App.jsx runs unchanged. Records then live in this browser only.
export function installLocalStorageShim() {
  if (typeof window === 'undefined' || window.storage) return;
  const PREFIX = 'the-draft:';
  window.storage = {
    async get(key) {
      const value = window.localStorage.getItem(PREFIX + key);
      return value === null ? null : { key, value };
    },
    async set(key, value) {
      window.localStorage.setItem(PREFIX + key, value);
      return { key, value };
    },
    async list(prefix = '') {
      const keys = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(PREFIX + prefix)) keys.push(k.slice(PREFIX.length));
      }
      return { keys };
    },
  };
}
