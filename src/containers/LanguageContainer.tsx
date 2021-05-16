import React, { useContext } from 'react'
import { AppContext } from '../hooks/useClient'
import { LanguageView } from '../views/LanguageView'

interface ILanguageContainerProps {
  onChange?(lang: string): void
}

export const LanguageContainer: React.FC<ILanguageContainerProps> = ({ onChange }) => {
  const { language } = useContext(AppContext)
  const languages = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'ud', 'zh']

  return <LanguageView language={language} languages={languages} onSelect={onChange} />
}
