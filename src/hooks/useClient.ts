import { createContext, useContext } from 'react'
import { IArticle } from './useArticles'
import { ISource } from './useSources'

export interface ISuccessResponse {
  status: 'ok'
}

export interface IErrorResponse {
  status: 'error'
  code: string
  message: string
}

export type IArticlesResponse = ISuccessResponse & {
  totalResults: number
  articles: IArticle[]
} | IErrorResponse

export type ISourcesResponse = ISuccessResponse & {
  sources: ISource[]
} | IErrorResponse

export interface GetSourcesRequestParams {
  category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology'
  language?: 'ar' | 'de' | 'en' | 'es' | 'fr' | 'he' | 'it' | 'nl' | 'no' | 'pt' | 'ru' | 'se' | 'ud' | 'zh'
  country?: 'ae' | 'ar' | 'at' | 'au' | 'be' | 'bg' | 'br' | 'ca' | 'ch' | 'cn' | 'co' | 'cu' | 'cz' | 'de' | 'eg' | 'fr' | 'gb' | 'gr' | 'hk' | 'hu' | 'id' | 'ie' | 'il' | 'in' | 'it' | 'jp' | 'kr' | 'lt' | 'lv' | 'ma' | 'mx' | 'my' | 'ng' | 'nl' | 'no' | 'nz' | 'ph' | 'pl' | 'pt' | 'ro' | 'rs' | 'ru' | 'sa' | 'se' | 'sg' | 'si' | 'sk' | 'th' | 'tr' | 'tw' | 'ua' | 'us' | 've' | 'za'
}

export interface GetArticlesRequestParams {
  search?: string
  sources?: string[]
  domains?: string[]
  excludeDomains?: string[]
  from?: Date
  to?: Date
  language?: string
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt'
  pageSize?: number
  page?: number
}

export interface IClient {
  getSourcesQuery(params?: GetSourcesRequestParams): URLSearchParams

  getSources(params?: GetSourcesRequestParams): Promise<ISourcesResponse>

  getArticlesQuery(params?: GetArticlesRequestParams): URLSearchParams

  getArticles(params?: GetArticlesRequestParams): Promise<IArticlesResponse>
}

export const AppContext = createContext({
  apiKey: '',
  pageSize: 20,
  search: '',
  language: navigator.language.slice(0, 2),
  sourceIds: [] as string[],
})

export const useClient = (): IClient => {
  const { apiKey, pageSize: PAGE_SIZE } = useContext(AppContext)

  return {
    getSourcesQuery: function(params = {}): URLSearchParams {
      return new URLSearchParams({ ...params })
    },
    getSources: function(params = {}): Promise<ISourcesResponse> {
      const query = this.getSourcesQuery(params)
      query.append('apiKey', apiKey)

      const url = `https://newsapi.org/v2/sources?${query}`

      return fetch(url).then(r => r.json())
    },
    getArticlesQuery: function(params = {}): URLSearchParams {
      const query = new URLSearchParams()
      const { search, sources, domains, excludeDomains, from, to, language, sortBy, page, pageSize } = { page: 1, pageSize: PAGE_SIZE, ...params }
      if (search) query.append('q', search)
      if (sources) query.append('sources', sources.join(','))
      if (domains) query.append('domains', domains.join(','))
      if (excludeDomains) query.append('excludeDomains', excludeDomains.join(','))
      if (from) query.append('from', from.toISOString())
      if (to) query.append('to', to.toISOString())
      if (language) query.append('language', language)
      if (sortBy) query.append('sortBy', sortBy)
      if (pageSize) query.append('pageSize', pageSize.toString())
      if (page) query.append('page', page.toString())

      return query
    },
    getArticles: function(params = {}): Promise<IArticlesResponse> {
      const query = this.getArticlesQuery(params)
      query.append('apiKey', apiKey)

      const url = `https://newsapi.org/v2/everything?${query}`

      return fetch(url).then(r => r.json())
    },
  }
}
