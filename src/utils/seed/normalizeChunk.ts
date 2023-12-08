import { LaunchRecord } from "@/database/launch-record.type";

export const normalizeChunk = (chunk: LaunchRecord) => {
    const { _id, __v, ...rest } = chunk;

    const normalizedChunk = {
        ...rest,
        id: _id.$oid,
        rocket: {
            id: rest.rocket.$oid,
        },
        payloads: rest.payloads
            ? rest.payloads.map((payload) => ({
                  id: payload.$oid,
              }))
            : null,
        launchpad: rest.launchpad
            ? {
                  id: rest.launchpad.$oid,
              }
            : null,

        cores:
            rest.cores &&
            rest.cores.map((core) => ({
                ...core,
                id: core.core?.$oid,
                landpad: {
                    id: core.landpad?.$oid || null,
                },
            })),
    };

    return normalizedChunk;
};
