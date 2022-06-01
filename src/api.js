import axios from 'axios';

export default axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    key: process.env.VUE_APP_API_KEY,
  },
});
