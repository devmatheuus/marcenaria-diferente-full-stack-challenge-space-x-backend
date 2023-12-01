interface CrewMember {
    crew: {
        id: string;
    };
    role: string;
}

interface Core {
    core: {
        id: string;
    };
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean;
    landing_type: string;
    landpad: {
        id: string;
    } | null;
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
    altitude: number;
    reason: string;
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
    rocket: {
        id: string;
    };
    success: boolean;
    failures: Failure[];
    details: string | null;
    crew: CrewMember[];
    ships: string[];
    capsules: { id: string }[];
    payloads: { id: string }[] | null;
    launchpad: {
        id: string;
    } | null;
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
