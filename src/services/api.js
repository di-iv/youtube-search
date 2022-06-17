import { apiUrls } from '@/consts/globalParams';
import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: apiUrls.youtube,
  params: {
    key: process.env.VUE_APP_YOUTUBE_KEY,
  },
});

const authApi = axios.create({
  baseURL: apiUrls.auth,
  params: {
    key: process.env.VUE_APP_FIREBASE_KEY,
  },
});

export { youtubeApi, authApi };
