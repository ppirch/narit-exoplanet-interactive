import { InputNumber } from 'components'
import useExoplanet from 'hooks/useExoplanet'
import useFittingParams from 'hooks/useFittingParams'
import { useNavigate } from 'react-router-dom'

interface PlanetParamsProps {
  chi2?: number
}

const PlanetParams = (props: PlanetParamsProps) => {
  const { chi2 } = props
  const navigate = useNavigate()
  const { exoplanet } = useExoplanet()
  const { fittingParams, setFittingParams } = useFittingParams()

  const setMidTransitTime = (value: number) => {
    if (!fittingParams) return
    setFittingParams({
      ...fittingParams,
      midTransitTime: value
    })
  }

  const setRadius = (value: number) => {
    if (!fittingParams) return
    setFittingParams({
      ...fittingParams,
      radius: value
    })
  }

  const setSemiMajorAxis = (value: number) => {
    if (!fittingParams) return
    setFittingParams({
      ...fittingParams,
      semiMajorAxis: value
    })
  }

  const setInclination = (value: number) => {
    if (!fittingParams) return
    setFittingParams({
      ...fittingParams,
      inclination: value
    })
  }

  const resetFittingParams = () => {
    if (!exoplanet) return
    setFittingParams({
      midTransitTime: exoplanet.planetParams.midTransitTime,
      radius: exoplanet.planetParams.radius,
      semiMajorAxis: exoplanet.planetParams.semiMajorAxis,
      inclination: exoplanet.planetParams.inclination
    })
  }

  return (
    <div>
      <p>PlanetParams</p>
      <div>
        <InputNumber
          title={'Period'}
          titleDescription={'คาบการโคจร'}
          unit={'Day'}
          unitDescription={'วัน'}
          value={exoplanet?.planetParams.period}
          disabled={true}
        />
        <InputNumber
          title={'Mid-transit time'}
          titleDescription={'เวลากึ่งกลางการบังกัน'}
          unit={'Day'}
          unitDescription={'วัน'}
          value={fittingParams?.midTransitTime}
          step={0.005}
          setValue={setMidTransitTime}
          disabled={false}
        />
        <InputNumber
          title={'Radius'}
          titleDescription={'รัศมีดาวเคราะห์'}
          unit={'Rstar'}
          unitDescription={'รัศมีดวงดาว'}
          value={fittingParams?.radius}
          step={0.001}
          setValue={setRadius}
          disabled={false}
        />
        <InputNumber
          title={'Semi-major axis'}
          titleDescription={'ระยะครึ่งแกนหลัก'}
          unit={'Rstar'}
          unitDescription={'รัศมีดวงดาว'}
          value={fittingParams?.semiMajorAxis}
          step={0.5}
          setValue={setSemiMajorAxis}
          disabled={false}
        />
        <InputNumber
          title={'Inclination'}
          titleDescription={'มุมเอียงวงโคจร'}
          unit={'°'}
          unitDescription={'องศา'}
          value={fittingParams?.inclination}
          step={0.5}
          setValue={setInclination}
          disabled={false}
        />
        <InputNumber
          title={'Chi-squared'}
          titleDescription={'ไคสแควร์'}
          value={parseFloat((chi2 ?? 0).toFixed(5))}
          disabled={true}
        />
      </div>
      <div className="mt-2 flex justify-center">
        <button
          onClick={() => resetFittingParams()}
          type="submit"
          className="mx-2 inline-flex h-10 min-w-[5rem] justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Reset
        </button>
        <div className="flex grow" />
        <button
          onClick={() => navigate('/benchmark')}
          type="submit"
          className="mx-2 inline-flex h-10 min-w-[5rem] justify-center  rounded-md border border-transparent bg-blue-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PlanetParams
