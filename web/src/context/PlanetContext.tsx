import { IPlanet } from 'interfaces/planet'
import { createContext } from 'react'

interface IPlanetContext {
  planet: IPlanet | undefined
  setPlanet: (planet: IPlanet) => void
  planetID: number
  setPlanetID: (planetId: number) => void
}

const PlanetContext = createContext<IPlanetContext>({} as IPlanetContext)

export default PlanetContext
