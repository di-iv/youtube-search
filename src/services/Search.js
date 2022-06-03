import api from '@/services/api';

export default class Search {
  static async searchRequest(request, resultsCount = 12) {
    const results = await api.get('search', {
      params: {
        part: 'snippet',
        maxResults: resultsCount,
        q: request,
      },
    });
    return results.data.items;
  }
}
