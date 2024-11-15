declare namespace NodeJS {
  interface ProcessEnv {
    db_name: string;
    db_host: string;
    db_user: string;
    db_password: string;
    broker_username: string;
    broker_host: string;
    broker_password: string;
    PORT: any;
    JWT_TOKEN: string;
    GMAIL_PASSWORD: string;
    GMAIL_ACCCOUNT: string;
    environment: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    COMPANY_EMAIL: string;
    APP_URL: string;
    APP_NAME: string;
    PAYSTACK_SECRET_KEY: string;
  }
}
