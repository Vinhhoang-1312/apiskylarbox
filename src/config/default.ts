const env = process.env;
export default {
  server: {
    port: env.PORT,
    mode: env.SERVER_MODE,
    appIntance: env.NODE_APP_INSTANCE,
  },
  dbConfig: {
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      username: env.REDIS_USERNAME,
      password: env.REDIS_PASSWORD,
    },
    mysql: {
      host: env.MYSQL_HOST,
      port: env.MYSQL_PORT,
      username: env.MYSQL_USERNAME,
      password: env.MYSQL_PASSWORD,
      database: env.MYSQL_DATABASE,
      synchronize: env.MYSQL_SYNCHRONIZE === 'true',
    },
    mongo: {
      host: env.MONGO_HOST,
      options: {
        user: env.MONGO_OPTIONS_USER,
        pass: env.MONGO_OPTIONS_PASS,
        auth: {
          authdb: 'admin',
        },
      },
    },
  },
  log: {
    console: {
      enabled: env.LOG_CONSOLE === 'enabled',
      options: {
        name: 'info-console',
        level: env.LOG_CONSOLE_LEVEL,
        json: false,
        timestamp: true,
        handleExceptions: true,
        colorize: true,
      },
    },
    rotateFile: {
      enabled: env.LOG_ROTATE_FILE === 'enabled',
      options: {
        name: 'debug-file',
        level: env.LOG_ROTATE_FILE_LEVEL,
        datePattern: 'yyyyMMdd',
        prepend: true,
        filename: env.LOG_ROTATE_FILE_NAME,
        maxsize: env.LOG_ROTATE_FILE_MAX_SIZE
          ? parseInt(env.LOG_ROTATE_FILE_MAX_SIZE)
          : 2.5e7,
        zippedArchive: true,
        maxDays: env.LOG_ROTATE_FILE_MAX_DAYS
          ? parseInt(env.LOG_ROTATE_FILE_MAX_DAYS)
          : 15,
        json: false,
        timestamp: true,
        handleExceptions: true,
      },
    },
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
  s3: {
    bucket: env.S3_BUCKET,
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    region: env.S3_REGION,
    serverName: env.S3_SERVER_NAME,
  },
};
