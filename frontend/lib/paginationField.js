export default function paginationField() {
  return {
    keyArgs: false,
    // read(existing = [], { args }) {
    //   const { skip, take } = args;
    //   const items = existing.slice(skip).filter((x) => x);
    //   console.log(existing);
    //   // return items;

    //   if (items.length && items.length !== take) {
    //     return items;
    //   }
    //   if (items.length !== take) {
    //     return false;
    //   }
    //   if (items.length) {
    //     return items;
    //   }
    //   return false;
    // },
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
