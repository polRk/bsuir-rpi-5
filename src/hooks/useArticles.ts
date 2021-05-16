import { useCallback, useState } from 'react'
import { useCachedClient } from './useCachedClient'
import { GetArticlesRequestParams } from './useClient'
import { ISource } from './useSources'

export interface IArticle {
  source: Pick<ISource, 'id' | 'name'>
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export const useArticles = ({ pageSize } = { pageSize: 40 }) => {
  const [articles, setArticles] = useState<IArticle[]>([])
  const { getArticles } = useCachedClient()

  const fetchArticles = useCallback((parameters?: GetArticlesRequestParams) => {
    let isDestroyed = false

    getArticles(parameters).then((resp) => {
      if (resp.status === 'error') {
        alert(resp.message)

        if (!isDestroyed) setArticles([])
        return
      } else if (!isDestroyed) {
        setArticles(resp.articles)
      }
    })

    return () => {
      isDestroyed = true
    }
  }, [getArticles])

  const fetchMoreArticles = useCallback((parameters?: GetArticlesRequestParams) => {
    let isDestroyed = false
    const nextPage = Math.floor(articles.length / pageSize) + 1

    getArticles({ ...parameters, page: nextPage }).then((resp) => {
      if (resp.status === 'error') {
        alert(resp.message)

        if (!isDestroyed) setArticles([])
        return
      } else if (!isDestroyed) {
        setArticles(articles.concat(resp.articles))
      }
    })

    return () => {
      isDestroyed = true
    }
  }, [articles, getArticles])

  return { articles, fetchArticles, fetchMoreArticles }
}
