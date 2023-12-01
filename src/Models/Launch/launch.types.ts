interface Identifier {
    id: string;
}

interface CrewMember {
    crew: Identifier;
    role: string;
}

interface Core {
    core: Identifier;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean;
    landing_type: string;
    landpad: Identifier | null;
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

interface Failure {
    time: number;
    altitude: number | null;
    reason: string;
}

interface LaunchPayload {
    id: string;
}

interface Launch {
    fairings: {
        reused: boolean;
        recovery_attempt: boolean;
        recovered: boolean;
        ships: string[];
    };
    links: Links;
    static_fire_date_utc: string | null;
    static_fire_date_unix: number | null;
    net: boolean;
    window: number;
    rocket: Identifier;
    success: boolean;
    failures: Failure[] | null;
    details: string | null;
    crew: CrewMember[];
    ships: string[];
    capsules: LaunchPayload[];
    payloads: LaunchPayload[] | null;
    launchpad: Identifier | null;
    flight_number: number;
    name: string;
    date_utc: string;
    date_unix: number;
    date_local: string;
    date_precision: string;
    upcoming: boolean;
    cores: Core[] | null;
    auto_update: boolean;
    tbd: boolean;
    launch_library_id: string;
    id: string;
}

type LaunchApiResponse = Omit<
    Launch,
    "rocket" | "capsules" | "launchpad" | "cores"
> & {
    rocket: string;
    capsules: string[];
    launchpad: string;
    cores: Omit<Core, "landpad"> & { landpad: string }[];
};

export {
    Launch,
    CrewMember,
    Core,
    Links,
    LaunchApiResponse,
    Identifier,
    Failure,
    LaunchPayload,
};
