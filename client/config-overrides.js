const {
  rewireWorkboxInject,
  defaultInjectConfig
} = require('react-app-rewire-workbox');
const path = require('path');

module.exports = function override(config, env) {
  if (env === 'production') {
    console.log('Production build - Adding Workbox for PWAs');
    const workboxConfig = {
      ...defaultInjectConfig,
      swSrc: path.join(__dirname, 'dev', 'service-worker.js')
    };
    // eslint-disable-next-line
    config = rewireWorkboxInject(workboxConfig)(config, env);
  }
  return config;
};
