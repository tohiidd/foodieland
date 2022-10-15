export function addFilters(query: any) {
  let filters: any = {};

  if (query?.category) {
    filters.category = { $in: query.category.split("/") };
  }
  if (query?.search) {
    console.log(query.search);

    filters.title = {
      $regex: new RegExp(".*" + query.search.trim() + ".*", "ig"),
    };
  }
  return filters;
}
