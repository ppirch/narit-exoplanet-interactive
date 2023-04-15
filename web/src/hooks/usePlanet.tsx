import PlanetContext from 'context/PlanetContext'
import { IPlanet } from 'interfaces/planet'
import { ReactNode, useContext, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const PlanetProvider = ({ children }: { children: ReactNode }) => {
  const [planetID, setPlanetID] = useLocalStorage<number>('planetId', -1)
  const [planet, setPlanet] = useLocalStorage<IPlanet | undefined>(
    'planet',
    undefined
  )
  const memoedValue = useMemo(
    () => ({
      planet,
      setPlanet,
      planetID,
      setPlanetID
    }),
    [planet, planetID, setPlanet, setPlanetID]
  )
  return (
    <PlanetContext.Provider value={memoedValue}>
      {children}
    </PlanetContext.Provider>
  )
}

const usePlanet = () => useContext(PlanetContext)

export { PlanetProvider }
export default usePlanet
