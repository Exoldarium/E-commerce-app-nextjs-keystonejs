export default function paginationField() {
  return {
    keyArgs: false,
    // we merge the cache (existing data) with our incoming data
    merge(existing, incoming, { args: { skip = 0 } }) {
      const merged = existing ? existing.slice(0) : [];
      for (let i = 0; i < incoming.length; i++) {
        merged[skip + i] = incoming[i];
      }
      return merged;
    },
  };
}
