import { IFittingParams } from 'interfaces/fitting-params'
import { createContext } from 'react'

interface IFittingParamsContext {
  fittingParams: IFittingParams | undefined
  setFittingParams: (fittingParams: IFittingParams) => void
}

const FittingParamsContext = createContext<IFittingParamsContext>(
  {} as IFittingParamsContext
)

export default FittingParamsContext
