import api from '@/services/api';
import data from '@/mock/data';

export default class Search {
  static async searchRequest(request, order = null, resultsCount = 12) {
    if (data) return data;
    const results = await api.get('search', {
      params: {
        part: 'snippet',
        maxResults: resultsCount,
        order,
        q: request,
      },
    });
    return results.data.items;
  }
}
