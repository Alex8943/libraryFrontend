interface Config {
    apiEnvEndpoint: string;
}

const config: Record<string, Config> = {
    development: {
        apiEnvEndpoint: "http://localhost:3000" ,
    },
    production: {
        apiEnvEndpoint: "https://library-backend-epsa.onrender.com",
    },
};

export const currentConfig: Config = config[import.meta.env.MODE || 'development'];
