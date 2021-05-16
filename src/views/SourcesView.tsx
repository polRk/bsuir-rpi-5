import React from 'react'
import { ISource } from '../hooks/useSources'

interface ISourcesViewProps {
  sources: ISource[]

  onSelect?(ids: string[]): void
}

export const SourcesView: React.FC<ISourcesViewProps> = ({ sources, onSelect }) => {
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedOptions = [...e.target.selectedOptions]
    const selectedValues = selectedOptions.map(selectedOption => selectedOption.value)

    onSelect?.(selectedValues)
  }

  return <div id="source" className="flex flex-col w-full h-full">
    <label htmlFor="source__control" className="text-sm font-bold">Sources: </label>
    <select name="source[]" multiple className="h-full" onChange={onChange}>
      {sources.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
    </select>
  </div>
}
