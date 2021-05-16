import React, { useContext, useEffect } from 'react'
import { AppContext } from '../hooks/useClient'
import { useSources } from '../hooks/useSources'
import { SourcesView } from '../views/SourcesView'

interface ISourcesContainerProps {
  onChange?(sources: string[]): void
}

export const SourcesContainer: React.FC<ISourcesContainerProps> = ({ onChange }) => {
  const { language } = useContext(AppContext)
  const { sources, fetchSources } = useSources()

  useEffect(() => {
    fetchSources({ language })
  }, [language])

  return <SourcesView sources={sources} onSelect={onChange} />
}
