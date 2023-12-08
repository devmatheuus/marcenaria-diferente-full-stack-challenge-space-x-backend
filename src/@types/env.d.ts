declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string; // variável para conexão com o banco de dados MongoDB
            NODE_ENV: "development" | "production" | "test"; // variável para definir o ambiente de execução
            PORT: number; // variável para definir a porta de execução da aplicação
        }
    }
}

export {};
