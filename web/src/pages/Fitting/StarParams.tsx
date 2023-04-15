import { InputNumber, Toggle } from 'components'
import useExoplanet from 'hooks/useExoplanet'

interface IStarParams {
  displaySynthetic: boolean
  displayData: boolean
  setDisplaySynthetic: (checked: boolean) => void
  setDisplayData: (checked: boolean) => void
}

const StarParams = (props: IStarParams) => {
  const { exoplanet } = useExoplanet()
  const { displaySynthetic, setDisplaySynthetic } = props
  const { displayData, setDisplayData } = props

  return (
    <div>
      <div>Select Exoplanet: {exoplanet?.name}</div>
      <div className="flex flex-row">
        <Toggle
          enabled={displaySynthetic}
          setEnabled={setDisplaySynthetic}
          title={'Synthetic'}
        />
        <Toggle
          enabled={displayData}
          setEnabled={setDisplayData}
          title={'Data'}
        />
      </div>
      <div className="flex flex-col">
        <div>Star Parameters</div>
        <div>
          <InputNumber
            title={'Mass'}
            titleDescription={'มวลดาวฤกษ์'}
            unit={'Msun'}
            unitDescription={'มวลดวงอาทิตย์'}
            value={exoplanet?.starParams.mass}
            disabled={true}
          />
          <InputNumber
            title={'Radius'}
            titleDescription={'รัศมีดาวฤกษ์'}
            unit={'Rsun'}
            unitDescription={'รัศมีดวงอาทิตย์'}
            value={exoplanet?.starParams.radius}
            disabled={true}
          />
          <InputNumber
            title={'Temperature'}
            titleDescription={'อุณหภูมิดาวฤกษ์'}
            unit={'K'}
            unitDescription={'เคลวิน'}
            value={exoplanet?.starParams.temperature}
            disabled={true}
          />
        </div>
      </div>
    </div>
  )
}

export default StarParams
