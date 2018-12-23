const env = process.env;

let currentEnv;
if (env.APP_ENV) {
  currentEnv = env.APP_ENV.NODE_ENV;
} else {
  currentEnv = env.NODE_ENV;
}
const isProduction = currentEnv === 'production';
const isPreProduction = currentEnv === 'pre-production';
const isStaging = currentEnv === 'staging';
const isDevelopment = currentEnv === 'development';

const EnvUtils = {
  isProduction,
  isStaging,
  isDevelopment,
  isPreProduction,

  isRemote: isProduction || isStaging || isPreProduction,
};

module.exports = EnvUtils;
