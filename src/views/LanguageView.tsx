import React from 'react'

interface ILanguageViewProps {
  language: string
  languages: string[]

  onSelect?(lang: string): void
}

export const LanguageView: React.FC<ILanguageViewProps> = ({ language, languages, onSelect }) => {
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedOption = languages[e.target.selectedIndex]

    onSelect?.(selectedOption)
  }

  return <div id="language" className="flex flex-col w-full">
    <label htmlFor="language__control" className="text-sm font-bold">Language: </label>
    <select id="language__control" name="language" value={language} onChange={onChange}>
      {languages.map(lang => <option key={lang} value={lang} className="capitalize">{lang}</option>)}
    </select>
  </div>
}
