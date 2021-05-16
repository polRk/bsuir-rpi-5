import {
  GetArticlesRequestParams,
  GetSourcesRequestParams,
  IArticlesResponse,
  IClient,
  ISourcesResponse,
  useClient,
} from './useClient'

const REVALIDATE_TIME = 5 * 60 * 1000

export const useCachedClient = (): Pick<IClient, 'getSources' | 'getArticles'> => {
  const client = useClient()

  function writeToCache<T>(key: string, result: T) {
    const data = JSON.stringify({ updatedAt: new Date(), result })
    localStorage.setItem(key, data)

    setTimeout(() => localStorage.removeItem(key), REVALIDATE_TIME)
  }

  function getFromCache<T>(key: string): T | null {
    const fromCache = JSON.parse(localStorage.getItem(key) || 'null') as { updatedAt: Date, result: T }
    if (!fromCache || new Date().getTime() - new Date(fromCache.updatedAt).getTime() > REVALIDATE_TIME) {
      return null
    }

    return fromCache.result
  }

  return {
    getSources: async (params?: GetSourcesRequestParams): Promise<ISourcesResponse> => {
      const query = client.getSourcesQuery(params)
      const url = `/v2/sources?${query}`

      const fromCache = getFromCache<ISourcesResponse>(url)
      if (fromCache) return fromCache

      return client.getSources(params).then(result => {
        if (result.status === 'ok') {
          writeToCache(url, result)
        }

        return result
      })
    },

    getArticles: async (params?: GetArticlesRequestParams): Promise<IArticlesResponse> => {
      const query = client.getArticlesQuery(params)
      const url = `/v2/everything?${query}`

      const fromCache = getFromCache<IArticlesResponse>(url)
      if (fromCache) return fromCache

      return client.getArticles(params).then(result => {
        if (result.status === 'ok') {
          writeToCache(url, result)
        }

        return result
      })
    },
  }
}
