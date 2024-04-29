interface Config {
    apiEnvEndpoint: string;
}

const config: Record<string, Config> = {
    development: {
        apiEnvEndpoint: "http://localhost:3000" ,
    },
    production: {
        apiEnvEndpoint: "https://library-backend-epsa.onrender",
    },
};

export const currentConfig: Config = config[import.meta.env.MODE || 'development'];
