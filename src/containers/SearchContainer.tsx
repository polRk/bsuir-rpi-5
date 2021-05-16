import React, { useContext } from 'react'
import { AppContext } from '../hooks/useClient'
import { SearchView } from '../views/SearchView'

interface ISearchContainerProps {
  onChange?(search: string): void
}

export const SearchContainer: React.FC<ISearchContainerProps> = ({ onChange }) => {
  const { search } = useContext(AppContext)

  return <SearchView search={search} onInput={onChange} />
}
