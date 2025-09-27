import * as Joi from 'joi';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().default('logistics-api'),
  DB_HOST: Joi.string().hostname().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().allow('').default('postgres'),
  DB_NAME: Joi.string().default('logistics'),
  DB_LOGGING: Joi.string().valid('true', 'false').default('false'),
  DB_SSL: Joi.string().valid('true', 'false').default('false'),
});

export default validationSchema;
