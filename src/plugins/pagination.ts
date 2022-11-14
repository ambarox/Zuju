export const paginationConfig = {
  query: {
    page: {
      name: "the_page",
    },
    limit: {
      name: "per_page",
      default: 2,
    },
  },
  meta: {
    baseUri: '',
    location: "body",
    name: "metadata",
    count: {
      active: true,
      name: "count",
    },
    pageCount: {
      name: "totalPages",
    },
    self: {
      active: false,
    },
    first: {
      active: false,
    },
    last: {
      active: false,
    },
    previous: {
      active: false,
    },
  },
  routes: {
    include: ["/fixtures"],
  },
};
