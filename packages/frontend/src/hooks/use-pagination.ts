export function usePagination(
  currentPage: number,
  lastPage: number,
  delta = 2
): Array<number | "..."> {
  // creates array with base 1 index
  const range = Array.from({ length: lastPage }, (_, i) => i + 1);

  return range.reduce((pages: any, page) => {
    // allow adding of first and last pages
    if (page === 1 || page === lastPage) {
      return [...pages, page];
    }

    // if within delta range add page
    if (page - delta <= currentPage && page + delta >= currentPage) {
      return [...pages, page];
    }

    // otherwise add 'gap if gap was not the last item added.
    if (pages[pages.length - 1] !== "...") {
      return [...pages, "..."];
    }

    return pages;
  }, []);
}
