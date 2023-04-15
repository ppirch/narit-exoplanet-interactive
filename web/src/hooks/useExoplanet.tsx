import ExoplanetContext from 'context/ExoplanetContext'
import { IExoplanet } from 'interfaces/exoplanet'
import { ReactNode, useContext, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const ExoplanetProvider = ({ children }: { children: ReactNode }) => {
  const [exoplanetId, setExoplanetId] = useLocalStorage<string>(
    'exoplanetId',
    ''
  )
  const [exoplanet, setExoplanet] = useLocalStorage<IExoplanet | undefined>(
    'exoplanet',
    undefined
  )
  const memoedValue = useMemo(
    () => ({
      exoplanet,
      setExoplanet,
      exoplanetId,
      setExoplanetId
    }),
    [exoplanet, exoplanetId, setExoplanet, setExoplanetId]
  )
  return (
    <ExoplanetContext.Provider value={memoedValue}>
      {children}
    </ExoplanetContext.Provider>
  )
}

const useExoplanet = () => useContext(ExoplanetContext)

export { ExoplanetProvider }
export default useExoplanet
