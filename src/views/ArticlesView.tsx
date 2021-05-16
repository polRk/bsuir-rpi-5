import React from 'react'
import { Article } from '../components/Article'
import { IArticle } from '../hooks/useArticles'

interface IArticlesViewProps {
  articles: IArticle[]
}

export const ArticlesView: React.FC<IArticlesViewProps> = ({ articles }) => {
  return <div id="article" className="flex flex-col max-w-screen-sm">
    <ol className="flex flex-col gap-4">
      {articles.map(article => <Article key={article.url} article={article} />)}
    </ol>
  </div>
}
