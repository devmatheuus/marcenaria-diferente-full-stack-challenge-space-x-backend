import { createReadStream } from "fs";
import { LaunchRecord } from "./launch-record.type";
import { pipelineAsync } from "@/utils/pipelineAsync";
import { Transform, Writable } from "stream";
//@ts-ignore
import JSONStream from "JSONStream";
import { initializeMongoConnection } from "./mongo";
import LaunchModel from "@/Models/Launch/Launch";
import { Launch } from "@/Models/Launch/launch.types";
import { normalizeChunk } from "../utils/seed/normalizeChunk";

const FILE_PATH = __dirname + "/data/seed.json";

initializeMongoConnection();

const batchInsertSize = 100;

let batch: any[] = [];

const readStream = createReadStream(FILE_PATH);
const normalizeDataStream = JSONStream.parse("*");

const processObjectStream = new Transform({
    objectMode: true,
    transform(chunk: LaunchRecord, encoding, callback) {
        const normalizedChunk = normalizeChunk(chunk);
        batch.push(normalizedChunk);

        if (batch.length >= batchInsertSize) {
            this.push([...batch]);
            batch = [];
        }

        callback();
    },

    flush(callback) {
        if (batch.length > 0) {
            this.push([...batch]);
            batch = [];
        }

        callback();
    },
});

const saveToDatabaseStream = new Writable({
    objectMode: true,
    async write(batch: Launch[], encoding, callback) {
        try {
            console.log("Saving to database");
            await LaunchModel.insertMany(batch);
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
        process.exit(1);
    })
    .finally(() => {
        console.log("Done");
        process.exit(0);
    });
