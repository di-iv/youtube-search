import { youtubeApi } from '@/services/api';

export default class YouTube {
  /**
   * Search YouTube videos
   * @param {string} request - search request
   * @param {string | null} order - videos sort order
   * @param {number} resultsCount - amount of search results
   * @returns {Promise<array>} - search results
   */
  static async search(request, order = null, resultsCount = 12) {
    const searchResults = await youtubeApi.get('search', {
      params: {
        part: 'snippet',
        maxResults: resultsCount,
        order,
        q: request,
      },
    });
    return searchResults.data.items;
  }
}
