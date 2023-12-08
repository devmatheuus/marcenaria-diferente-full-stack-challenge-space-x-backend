export const sanitizeSearchForMongoDB = (
    search: string | undefined
): string | undefined => {
    if (search === undefined) {
        return undefined;
    }

    const sanitizedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "");

    return sanitizedSearch;
};
