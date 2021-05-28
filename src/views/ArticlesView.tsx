import React, { useContext, useEffect, useRef } from 'react'
import { Article } from '../components/Article'
import { IArticle } from '../hooks/useArticles'
import { AppContext, GetArticlesRequestParams } from '../hooks/useClient'

interface IArticlesViewProps {
  articles: IArticle[]

  fetchMoreArticles(params?: GetArticlesRequestParams): void
}

export const ArticlesView: React.FC<IArticlesViewProps> = ({articles, fetchMoreArticles}) => {
  const sentinel = useRef<HTMLDivElement>(null)
  const { language, search, sourceIds } = useContext(AppContext)

  const cb = (entries: IntersectionObserverEntry[]) => {
    const entry = entries.find(v => v.intersectionRatio)
    if (entry) {
      return fetchMoreArticles({language, search, sources: sourceIds})
    }

    return void 0
  }

  useEffect(() => {
    if (!articles.length) return

    const observer = new IntersectionObserver(cb)
    if (sentinel.current) observer.observe(sentinel.current)

    return () => {
      if (sentinel.current) observer.unobserve(sentinel.current)
    }
  }, [articles, sentinel.current])

  return <div id="article" className="flex flex-col max-w-screen-sm">
    <ol className="flex flex-col gap-4">
      {articles.map((article) => <Article key={article.url} article={article}/>)}
    </ol>
    <div className="sentinel" ref={sentinel}/>
  </div>
}
