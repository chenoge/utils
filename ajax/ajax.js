import qs from 'qs'
import $axios from 'axios'

export const axios = function (config) {
  if (config.isFormData) {
    config.data = qs.stringify(config.data);
    if (!config.headers) {
      config.headers = {}
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  return $axios(config).then(res => {
    return Promise.resolve(res);
  }, err => {
    return Promise.reject(err);
  });
};

export default {
  axios
}
