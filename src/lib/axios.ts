import axios from "axios";

const baseUrl = "https://api.spacexdata.com/v5/launches/latest";

export const api = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
});
