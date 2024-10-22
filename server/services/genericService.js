export const fetchWithPagination = async (
  model,
  filters,
  pagination,
  sorting,
  searchValue
) => {
  try {
    // Fetch data with model-specific method
    const data = await model.getAll(filters, pagination, sorting, searchValue);

    // Fetch total count for pagination
    const total = await model.getTotalCount(filters, searchValue);
    const totalPages = Math.ceil(total / pagination.limit);

    return { data, total, totalPages };
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
