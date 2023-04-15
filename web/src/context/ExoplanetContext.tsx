import { IExoplanet } from 'interfaces/exoplanet'
import { createContext } from 'react'

interface IExoplanetContext {
  exoplanet: IExoplanet | undefined
  setExoplanet: (Exoplanet: IExoplanet) => void
  exoplanetId: string
  setExoplanetId: (ExoplanetId: string) => void
}

const ExoplanetContext = createContext<IExoplanetContext>(
  {} as IExoplanetContext
)

export default ExoplanetContext
