import { youtubeApi } from '@/services/api';

export default class YouTube {
  static async search(request, order = null, resultsCount = 12) {
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