import { Document } from "mongoose";

interface CrewMember {
    crew: string;
    role: string;
}

interface Core {
    core: string;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean;
    landing_type: string;
    landpad: string;
}

interface Links {
    patch: {
        small: string;
        large: string;
    };
    reddit: {
        campaign: string | null;
        launch: string | null;
        media: string | null;
        recovery: string | null;
    };
    flickr: {
        small: string[];
        original: string[];
    };
    presskit: string | null;
    webcast: string;
    youtube_id: string;
    article: string | null;
    wikipedia: string;
}

interface Launch extends Document {
    fairings: any;
    links: Links;
    static_fire_date_utc: string | null;
    static_fire_date_unix: number | null;
    net: boolean;
    window: number;
    rocket: string;
    success: boolean;
    failures: any[];
    details: string | null;
    crew: CrewMember[];
    ships: string[];
    capsules: string[];
    payloads: string[];
    launchpad: string;
    flight_number: number;
    name: string;
    date_utc: string;
    date_unix: number;
    date_local: string;
    date_precision: string;
    upcoming: boolean;
    cores: Core[];
    auto_update: boolean;
    tbd: boolean;
    launch_library_id: string;
    id: string;
}

export { Launch, CrewMember, Core, Links };
