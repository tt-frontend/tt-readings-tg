import axios from "axios";

const apiInstance = new axios.Axios();

apiInstance.defaults.baseURL =
  "https://stage.k8s.transparent-technology.ru/api/tg";

export const api = apiInstance;
