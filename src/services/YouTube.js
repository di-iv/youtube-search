import { youtubeApi } from '@/services/api';
import data from '@/mock/data';

export default class YouTube {
  static async search(request, order = null, resultsCount = 12) {
    if (data) return data;
    const results = await youtubeApi.get('search', {
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
