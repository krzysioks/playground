namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        NODE_ENV: 'development' | 'production';
        JWT_SECRET: string;
        MONGODB_URL: string;
        PAGE_URL: string;
    }
}
