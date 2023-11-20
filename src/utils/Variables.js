export default {
  API_URL: process.env.API_URL || '',
  IS_DEV: process.env.IS_DEV,
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD || '',
  PASSWORD_SALT: process.env.PASSWORD_SALT || 10
}
