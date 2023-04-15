import FittingParamsContext from 'context/FittingParamsContext'
import { IFittingParams } from 'interfaces/fitting-params'
import { ReactNode, useContext, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const FittingParamsProvider = ({ children }: { children: ReactNode }) => {
  const [fittingParams, setFittingParams] = useLocalStorage<
    IFittingParams | undefined
  >('fittingParams', undefined)
  const memoedValue = useMemo(
    () => ({
      fittingParams,
      setFittingParams
    }),
    [fittingParams, setFittingParams]
  )
  return (
    <FittingParamsContext.Provider value={memoedValue}>
      {children}
    </FittingParamsContext.Provider>
  )
}

const useFittingParams = () => useContext(FittingParamsContext)

export { FittingParamsProvider }
export default useFittingParams
