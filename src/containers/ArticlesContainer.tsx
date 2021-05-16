import React, { useContext, useEffect } from 'react'
import { useArticles } from '../hooks/useArticles'
import { AppContext } from '../hooks/useClient'
import { ArticlesView } from '../views/ArticlesView'

interface IArticlesContainerProps {
}

export const ArticlesContainer: React.FC<IArticlesContainerProps> = () => {
  const { language, search, sourceIds } = useContext(AppContext)
  const { articles, fetchArticles, fetchMoreArticles } = useArticles()

  useEffect(() => {
    if (!search && !sourceIds.length) return

    fetchArticles({ language, search, sources: sourceIds })
  }, [language, search, sourceIds])

  return <ArticlesView articles={articles} />
}
