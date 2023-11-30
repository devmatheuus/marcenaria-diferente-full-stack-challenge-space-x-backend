declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
            NODE_ENV: "development" | "production" | "test";
            PORT: number;
        }
    }
}

export {};
