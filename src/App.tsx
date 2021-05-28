import React, { useState } from 'react'
import { ArticlesContainer } from './containers/ArticlesContainer'
import { LanguageContainer } from './containers/LanguageContainer'
import { SearchContainer } from './containers/SearchContainer'
import { SourcesContainer } from './containers/SourcesContainer'
import { AppContext } from './hooks/useClient'

function App() {
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState(navigator.language.slice(0, 2))
  const [sourceIds, setSourceIds] = useState<string[]>([])

  return (
    // 649d6f36e31346f283d52e0236eeab20
    // 18ea93c9b78347388caee26dfb38ccd5
    // fbc8b382ffde4f5594a85c06379e62b6
    // dcb61b8315814676883fa679808f9059

    <AppContext.Provider value={{ apiKey: 'dcb61b8315814676883fa679808f9059', pageSize: 20, search, language, sourceIds }}>
      <div id="sidebar" className="flex flex-col gap-2 h-screen max-h-[calc(100vh-2rem)] sticky top-4">
        <SearchContainer onChange={setSearch} />
        <LanguageContainer onChange={setLanguage} />
        <SourcesContainer onChange={setSourceIds} />
      </div>
      <ArticlesContainer />
    </AppContext.Provider>
  )
}

export default App
