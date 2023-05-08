import { ExoplanetPlotResponse } from 'apis/fitting'
import { ReactECharts } from 'components'
import { ReactEChartsProps } from 'components/React-ECharts'
import useExoplanet from 'hooks/useExoplanet'

interface ExoplanetGraphProps {
  exoPlotRes: ExoplanetPlotResponse | undefined
}

const ExoplanetGraph = (props: ExoplanetGraphProps) => {
  const { exoplanet } = useExoplanet()
  const { exoPlotRes } = props
  const { exoplanet_plot } = exoPlotRes || {}

  const option: ReactEChartsProps['option'] = {
    title: {
      text: `Exoplanet Visualization of ${exoplanet?.name}`,
      left: 'center'
    },
    grid: {
      show: true,
      backgroundColor: 'black',
      width: 192,
      height: 192,
      top: 'center',
      left: 'center',
      right: 'center',
      bottom: 'center'
    },
    xAxis: {
      name: 'Host star unit radius',
      nameGap: 20,
      nameLocation: 'middle',
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
      type: 'value',
      min: -2,
      max: 2
    },
    yAxis: {
      name: 'Host star unit radius',
      nameGap: 20,
      nameLocation: 'middle',
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
      type: 'value',
      min: -2,
      max: 2
    },
    series: [
      {
        silent: true,
        animation: false,
        data: [
          [-2, 0],
          [2, 0]
        ],
        showSymbol: false,
        type: 'line',
        color: 'slategray'
      },
      {
        animation: false,
        silent: true,
        symbolSize: 98, //* (exoplanet_plot?.juipiter_radius_ratio || 0),
        data: [[0, 0]],
        type: 'scatter',
        color: `${exoplanet_plot?.color_star}`
      },
      {
        animation: false,
        silent: true,
        symbolSize: 98 * (exoplanet_plot?.exoplanet_radius_ratio || 0),
        data: [
          [0, exoplanet_plot?.position || 0],
          [0, exoplanet_plot?.position || 0]
        ],
        type: 'scatter',
        color: 'slategray'
      }
    ]
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ReactECharts option={option} style={{ height: '256px' }} />
      <div className="mt-2 flex flex-row items-center">
        <div className="mr-4 h-5 w-5 rounded-full bg-orange-500"></div>
        <div className="mr-4 h-5 w-5 rounded-full bg-slate-500"></div>
        <span>Compare a planet(Right) to jupiter(Left)</span>
      </div>
    </div>
  )
}

export default ExoplanetGraph
