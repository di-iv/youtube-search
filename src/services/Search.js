import api from '@/services/api';
import data from '@/mock/data';

export default class Search {
  static async searchRequest(request, resultsCount = 12) {
    if (!data) {
      const results = await api.get('search', {
        params: {
          part: 'snippet',
          maxResults: resultsCount,
          q: request,
        },
      });
      return results.data.items;
    }
    return data;
  }
}
