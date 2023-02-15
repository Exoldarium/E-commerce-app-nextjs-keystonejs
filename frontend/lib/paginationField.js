// import { PAGINATION_QUERY } from '../components/Pagination';

// export default function paginationField() {
//   return {
//     keyArgs: false,
//     read(existing = [], { args: { take, skip }, cache }) {
//       const data = cache.readQuery({ query: PAGINATION_QUERY });
//       const itemCount = data?.productsCount;
//       const currentPage = skip / take - 1;
//       const totalPages = Math.ceil(itemCount / take);
//       const items = existing.slice(skip, take + skip).filter((item) => item);

//       // if there are items and there aren't enought items to satisfy the request and we are on the last page then send data
//       if (items.length && items.length !== take && currentPage === totalPages) {
//         return items;
//       }
//       // if we don't have any items, stop the function and go to the network to fetch them
//       if (items.length !== take) {
//         return items;
//       }
//       // if there are items in the cache return them and send to apollo, don't go to the network to fetch them
//       if (items.length) {
//         return items;
//       }
//       // in case both fail go back to network
//       return false;
//     },
//     merge(existing, incoming, { args: { take, skip } }) {
//       // if there are existing items in the cache then copy them all, if not give empty array
//       const merged = existing ? existing.slice(0) : [];
//       for (let i = skip; i < skip + incoming.length; i++) {
//         merged[i] = incoming[i - skip];
//       }
//       return merged;
//     },
//   };
// }
