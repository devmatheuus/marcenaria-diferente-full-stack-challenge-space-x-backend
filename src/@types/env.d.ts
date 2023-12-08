declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string; // variável para conexão com o banco de dados MongoDB
            NODE_ENV: "development" | "production" | "test"; // variável para definir o ambiente de execução
            PORT: number; // variável para definir a porta de execução da aplicação
            REDIS_KEY_GET_TOP_ROCKET_LAUNCHES: string; // variável para definir a chave de cache dos dados de estatísticas de lançamentos
            REDIS_KEY_GET_LAUNCH_STATUS_COUNTS: string; // variável para definir a chave de cache dos dados de estatísticas de lançamentos
            REDIS_PASSWORD: string; // variável para definir a senha de conexão com o Redis
            REDIS_HOST: string; // variável para definir o host de conexão com o Redis
        }
    }
}

export {};
