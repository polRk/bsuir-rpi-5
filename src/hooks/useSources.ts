import { useCallback, useState } from 'react'
import { useCachedClient } from './useCachedClient'
import { GetSourcesRequestParams } from './useClient'

export interface ISource {
  id: string
  name: string
  description: string
  url: string
  category: string
  language: string
  country: string
}

export const useSources = () => {
  const [sources, setSources] = useState<ISource[]>([])
  const { getSources } = useCachedClient()

  const fetchSources = useCallback((parameters?: GetSourcesRequestParams) => {
    let isDestroyed = false

    getSources(parameters).then((resp) => {
      if (resp.status === 'error') {
        alert(resp.message)

        if (!isDestroyed) setSources([])
        return
      } else if (!isDestroyed) {
        setSources(resp.sources)
      }
    })

    return () => {
      isDestroyed = true
    }
  }, [getSources])

  return { sources, fetchSources }
}
