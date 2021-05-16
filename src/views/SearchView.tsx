import React from 'react'

interface ISearchViewProps {
  search: string

  onInput?(search: string): void
}

export const SearchView: React.FC<ISearchViewProps> = ({ search, onInput }) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onInput?.(e.target.value)
  }

  return <div id="search" className="flex flex-col w-full">
    <label htmlFor="search__control" className="text-sm font-bold">Search: </label>
    <input id="search__control" type="search" placeholder="Search ..." value={search} onChange={onChange} />
  </div>
}
