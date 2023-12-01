import LaunchModel from "@/Models/Launch/Launch";

type GetLaunchServiceOptionsParams = Partial<{
    page: number;
    limit: number;
    search: string;
}>;

export const getLaunchesService = async ({
    limit = 4,
    search,
    page = 1,
}: GetLaunchServiceOptionsParams) => {
    const query = search
        ? {
              $or: [
                  {
                      name: {
                          $regex: search.toLowerCase(),
                          $options: "i",
                      },
                  },
              ],
          }
        : {};

    const { docs, totalDocs, totalPages, hasNextPage, hasPrevPage } =
        await LaunchModel.paginate(query, { page, limit });

    const launches = {
        results: docs,
        totalDocs,
        page: page,
        totalPages,
        hasNext: hasNextPage,
        hasPrev: hasPrevPage,
    };

    return launches;
};
