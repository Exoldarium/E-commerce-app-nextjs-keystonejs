export default function ordersPaginationField() {
  return {
    keyArgs: false,
    merge(existing, incoming, { args: { skip = 0 } }) {
      console.log(existing, incoming);
      // Slicing is necessary because the existing data is
      // immutable, and frozen in development.
      const merged = existing ? existing.slice(0) : [];
      for (let i = 0; i < incoming.length; ++i) {
        merged[skip + i] = incoming[i];
      }
      return merged;
    },
  };
}
