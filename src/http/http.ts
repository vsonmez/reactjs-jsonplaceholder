import Axios, { AxiosError } from "axios";

namespace Http {
  export const axios = Axios.create();
  const errorHandler = (error: AxiosError) => {
    throw new Error(`${error.name}: ${error.code} - ${error.message}`, {
      cause: error.status,
    });
  };
  axios.interceptors.request.use((config) => {
    return config;
  }, errorHandler);

  axios.interceptors.response.use((config) => {
    return config;
  }, errorHandler);
}
export default Http;
