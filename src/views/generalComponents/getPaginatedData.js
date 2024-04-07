export const getPaginatedData = (data, currentPage, itemsPerPage) => {
    const totalPages = data?.length / itemsPerPage;
    if (currentPage >= 1 && currentPage <= Math.ceil(totalPages)) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const sorteData = data?.sort((a, b) => b.id - a.id);

        const cutArray = sorteData.slice(startIndex, endIndex);

        return cutArray;
    }
};
