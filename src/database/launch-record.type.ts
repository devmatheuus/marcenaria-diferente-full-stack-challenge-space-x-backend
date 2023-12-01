import { Launch } from "@/Models/Launch/launch.types";

type BaseLaunchType = Omit<
    Launch,
    "id" | "rocket" | "payloads" | "launchpad" | "cores"
>;

type ApiID = {
    $oid: string;
};

type ApiCores = {
    core: ApiID;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean;
    landing_type: string;
    landpad: ApiID;
}[];

export type LaunchRecord = BaseLaunchType & {
    _id: {
        $oid: string;
    };
    rocket: ApiID;
    payloads: ApiID[];
    launchpad: ApiID;
    cores: ApiCores;
    __v: number;
};
