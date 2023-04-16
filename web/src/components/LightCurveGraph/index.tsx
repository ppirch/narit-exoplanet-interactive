import ReactECharts, { ReactEChartsProps } from 'components/React-ECharts'
import useExoplanet from 'hooks/useExoplanet'

type Coordinate = [number, number]

interface LightCurveGraphProps {
  fittingT?: number[]
  fittingFlux?: number[]
  defaultT?: number[]
  defaultFlux?: number[]
  bestT?: number[]
  bestFlux?: number[]
  displaySynthetic?: boolean
  displayData?: boolean
  displayLabel?: boolean
}

const LightCurveGraph = (props: LightCurveGraphProps) => {
  const { fittingT, fittingFlux } = props
  const { defaultT, defaultFlux } = props
  const { bestT, bestFlux } = props
  const { displaySynthetic, displayData } = props
  const { displayLabel } = props

  const { exoplanet } = useExoplanet()
  const flux = exoplanet?.nor_flux
  const time = exoplanet?.JD

  let data: Coordinate[] = []
  if (flux && time) {
    data = flux.map((value, index) => [time[index], value])
  }

  let fittingData: Coordinate[] = []
  if (fittingFlux && fittingT) {
    fittingData = fittingFlux.map((value, index) => [fittingT[index], value])
  }

  let defaultData: Coordinate[] = []
  if (defaultFlux && defaultT) {
    defaultData = defaultFlux.map((value, index) => [defaultT[index], value])
  }

  let bestData: Coordinate[] = []
  if (bestFlux && bestT) {
    bestData = bestFlux.map((value, index) => [bestT[index], value])
  }

  const option: ReactEChartsProps['option'] = {
    xAxis: {
      name: 'Time (JD) +2450000',
      nameLocation: 'middle',
      nameGap: 24,
      type: 'value',
      min: 7744.95,
      max: 7745.225
    },
    yAxis: {
      name: 'Normalized Flux',
      nameLocation: 'middle',
      nameGap: 36,
      type: 'value',
      min: 0.95,
      max: 1.02
    },
    series: [
      {
        silent: true,
        symbolSize: 5,
        data: displayData ? data : [],
        type: 'scatter'
      },
      {
        name: 'Our',
        silent: true,
        symbolSize: 1,
        data: displaySynthetic ? fittingData : [],
        type: 'line',
        color: 'red',
        showSymbol: false
      },
      {
        name: 'Intial',
        silent: true,
        symbolSize: 1,
        data: defaultData,
        type: 'line',
        color: 'yellow',
        showSymbol: false
      },
      {
        name: 'Best',
        silent: true,
        symbolSize: 1,
        data: bestData,
        type: 'line',
        color: 'green',
        showSymbol: false
      }
    ]
  }
  if (displayLabel) {
    option.legend = {
      data: [
        {
          name: 'Our',
          icon: 'rect'
        },
        {
          name: 'Intial',
          icon: 'rect'
        },
        {
          name: 'Best',
          icon: 'rect'
        }
      ]
    }
  }
  return <ReactECharts option={option} style={{ minHeight: 320 }} />
}

LightCurveGraph.defaultProps = {
  displaySynthetic: true,
  displayData: true,
  displayLabel: false
}

export default LightCurveGraph
