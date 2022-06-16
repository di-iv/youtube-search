import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    key: process.env.VUE_APP_YOUTUBE_KEY,
  },
});

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.VUE_APP_FIREBASE_KEY,
  },
});

export { youtubeApi, authApi };
