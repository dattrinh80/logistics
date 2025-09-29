import * as Joi from 'joi';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().default('logistics-api'),
  DB_HOST: Joi.string().hostname().default('localhost'),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.string().default('logistics'),
  DB_PASSWORD: Joi.string().allow('').default('logistics'),
  DB_NAME: Joi.string().default('logistics'),
  DB_LOGGING: Joi.string().valid('true', 'false').default('false'),
  DB_SSL: Joi.string().valid('true', 'false').default('false'),
  LOG_LEVEL: Joi.string().default('info'),
});

export default validationSchema;
