import axios from 'axios';

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
const NEWS_DATA_IO = process.env.REACT_APP_NEWS_DATA_IO;

const fetchNewsAPIArticles = (query = "", type = "", date = "") => {
  return axios.get(`https://newsapi.org/v2/everything?q=${query}&from=${date}&sources=${type}&apiKey=${NEWS_API_KEY}`);
};

const fetchGuardianArticles = (query = "", type = "", date = "") => {
  return axios.get(`https://content.guardianapis.com/search?q=${query}&section=${type}&from-date=${date}&api-key=${GUARDIAN_API_KEY}`);
};

const fetchNewsDataArticles = (query = "", type = "", date = "") => {
  return axios.get(`https://newsdata.io/api/1/latest?apikey=${NEWS_DATA_IO}&q=${query}&language=${type}`);
};

export { fetchNewsAPIArticles, fetchGuardianArticles, fetchNewsDataArticles };
