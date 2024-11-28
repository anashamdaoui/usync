import axios from 'axios';

const jiraApi = axios.create({
  baseURL: 'https://enreach-services.atlassian.net/rest/api/3',
  withCredentials: true
});

const phoneApi = axios.create({
  baseURL: 'https://api.ggphone.com/v1'
});

export const setPhoneApiToken = (token: string) => {
  phoneApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export { jiraApi, phoneApi };