import { Schema, model, Document } from "mongoose";
import { Launch } from "./launch.types";

type LaunchModelType = Launch & Document;

const launchSchema = new Schema<LaunchModelType>({
    fairings: Schema.Types.Mixed,
    links: {
        patch: {
            small: String,
            large: String,
        },
        reddit: {
            campaign: String,
            launch: String,
            media: String,
            recovery: String,
        },
        flickr: {
            small: [String],
            original: [String],
        },
        presskit: String,
        webcast: String,
        youtube_id: String,
        article: String,
        wikipedia: String,
    },
    static_fire_date_utc: String,
    static_fire_date_unix: Number,
    net: Boolean,
    window: Schema.Types.Mixed,
    rocket: {
        id: String,
    },
    success: Boolean,
    failures: [Schema.Types.Mixed],
    details: String,
    crew: [
        {
            crew: {
                id: String,
            },
            role: String,
        },
    ],
    ships: [Schema.Types.Mixed],
    capsules: [Schema.Types.Mixed],
    payloads: [Schema.Types.Mixed],
    launchpad: {
        id: String,
    },
    flight_number: Number,
    name: String,
    date_utc: String,
    date_unix: Number,
    date_local: String,
    date_precision: String,
    upcoming: Boolean,
    cores: [
        {
            core: {
                id: String,
            },
            flight: Number,
            gridfins: Boolean,
            legs: Boolean,
            reused: Boolean,
            landing_attempt: Boolean,
            landing_success: Boolean,
            landing_type: String,
            landpad: {
                id: String,
            },
        },
    ],
    auto_update: Boolean,
    tbd: Boolean,
    launch_library_id: String,
    id: String,
});

export default model<LaunchModelType>("Launch", launchSchema);
