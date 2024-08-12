import axios from 'axios';

const NEWS_API_KEY = '63468a688e514b9b810a07ddeba400fa';
const GUARDIAN_API_KEY = '67a603c7-4704-4ac2-a100-994118ac5878';
const NEWS_DATA_IO = 'pub_5074041d4d40d60741c12fc5b88f4356b3a29';

const fetchNewsAPIArticles = (query, type, date) => {
  return axios.get(`https://newsapi.org/v2/everything?q=${query}&from=${date}&sources=${type}&apiKey=${NEWS_API_KEY}`);
};

const fetchGuardianArticles = (query, type, date) => {
  return axios.get(`https://content.guardianapis.com/search?q=${query}&section=${type}&from-date=${date}&api-key=${GUARDIAN_API_KEY}`);
};

const fetchNewsDatarticles = (query, type, date) => {
  return axios.get(`https://newsdata.io/api/1/latest?apikey=${NEWS_DATA_IO}&q=${query}&language=${type}`);
};

export { fetchNewsAPIArticles, fetchGuardianArticles, fetchNewsDatarticles };
