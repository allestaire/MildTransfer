export default {
  API_URL: process.env.API_URL || '',
  IS_DEV: process.env.IS_DEV,
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD || '',
  PASSWORD_SALT: process.env.PASSWORD_SALT || 10,
  BASE_URL: process.env.BASE_URL || '',
  MAIL_HOST: process.env.MAIL_HOST || '',
  MAIL_PORT: process.env.MAIL_PORT || ''
}
