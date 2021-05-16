import React from 'react'
import { IArticle } from '../hooks/useArticles'

interface IArticleProps {
  article: IArticle
}

export const Article: React.FC<IArticleProps> = ({ article }) => {
  const articleURL = new URL(article.url)

  return <li>
    <a href={article.url} target="_blank" className="text-blue-700">
      <h2 className="text-lg font-bold">{article.title}</h2>
    </a>

    <a href={article.url} className="flex gap-1 items-center">
      <img src={`https://s2.googleusercontent.com/s2/favicons?domain=${articleURL.hostname}`} alt="favicon" />
      <span className="flex-1 text-green-700 font-bold clip">{articleURL.hostname}<span
        className="font-medium">{articleURL.pathname}</span></span>
      <span className="text-gray-500">{new Date(article.publishedAt).toLocaleString()}</span>
    </a>
    <p>{article.description}</p>
  </li>
}
