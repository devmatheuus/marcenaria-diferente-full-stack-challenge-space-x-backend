import { createReadStream } from "fs";

import { LaunchRecord } from "./launch-record.type";
import { pipelineAsync } from "@/utils/pipelineAsync";
import { Writable, Transform } from "stream";
//@ts-ignore
import JSONStream from "JSONStream";
import { initializeMongoConnection } from "./mongo";
import LaunchModel from "@/Models/Launch/Launch";
import { Launch } from "@/Models/Launch/launch.types";
import mongoose from "mongoose";

const FILE_PATH = __dirname + "/data/seed.json";

const readStream = createReadStream(FILE_PATH);
const normalizeDataStream = JSONStream.parse("*");

initializeMongoConnection();

const processObjectStream = new Transform({
    objectMode: true,
    transform(chunk: LaunchRecord, encoding, callback) {
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

        callback(null, normalizedChunk);
    },
});

const saveToDatabaseStream = new Writable({
    objectMode: true,
    async write(chunk: Launch, encoding, callback) {
        try {
            await LaunchModel.create(chunk);
            console.log("Saved to database", chunk.id);
            callback();
        } catch (error: any) {
            callback(error);
        }
    },
});

pipelineAsync(
    readStream,
    normalizeDataStream,
    processObjectStream,
    saveToDatabaseStream
)
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        mongoose.connection.close();
        console.log("Done!");
        process.exit(0);
    });
