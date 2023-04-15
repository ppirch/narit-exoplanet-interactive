import { ExoplanetPlotResponse } from 'apis/fitting'
import ReactECharts, { ReactEChartsProps } from 'components/React-ECharts'
import useExoplanet from 'hooks/useExoplanet'

interface HabitZoneGraphProps {
  exoPlotRes: ExoplanetPlotResponse | undefined
}

const HabitZoneGraph = (props: HabitZoneGraphProps) => {
  const { exoplanet } = useExoplanet()
  const { exoPlotRes } = props
  const { habit_plot } = exoPlotRes || {}

  const innerCircle = parseFloat((habit_plot?.inner_circle || 0).toFixed(2))
  const outerCircle = parseFloat((habit_plot?.outer_circle || 0).toFixed(2))
  const planetSemiMajorAxis = parseFloat(
    (habit_plot?.planet_semi_major_axis || 0).toFixed(2)
  )
  const axis_lim = parseFloat((habit_plot?.axis_lim || 1).toFixed(2))

  const option: ReactEChartsProps['option'] = {
    title: {
      text: `Habitable zone of ${exoplanet?.name}`,
      left: 'center'
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      }
    ],
    grid: {
      show: true,
      backgroundColor: 'white',
      width: 192,
      height: 192,
      top: 'center',
      left: 'center',
      right: 'center',
      bottom: 'center'
    },
    xAxis: {
      name: 'Astronomical unit',
      nameGap: 20,
      nameLocation: 'middle',
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
      type: 'value',
      min: -axis_lim,
      max: axis_lim
    },
    yAxis: {
      name: 'Astronomical unit',
      nameGap: 28,
      nameLocation: 'middle',
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
      type: 'value',
      min: -axis_lim,
      max: axis_lim
    },
    series: [
      {
        animation: false,
        silent: true,
        symbolSize: (outerCircle / axis_lim) * 192,
        data: [[0, 0]],
        type: 'scatter',
        color: 'aquamarine'
      },
      {
        animation: false,
        silent: true,
        symbolSize: (innerCircle / axis_lim) * 192,
        data: [
          [0, 0],
          [0, 0]
        ],
        type: 'scatter',
        color: 'white'
      },
      {
        animation: false,
        silent: true,
        symbolSize: (planetSemiMajorAxis / axis_lim) * 192,
        data: [[0, 0]],
        type: 'scatter',
        color: 'black'
      },
      {
        animation: false,
        silent: true,
        symbolSize: (planetSemiMajorAxis / axis_lim) * 192 - 2,
        data: [
          [0, 0],
          [0, 0]
        ],
        type: 'scatter',
        color: 'white'
      },
      {
        animation: false,
        silent: true,
        symbolSize: 5,
        data: [[0, 0]],
        type: 'scatter',
        color: 'red'
      }
    ]
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ReactECharts option={option} style={{ height: '256px' }} />
      {/* <div>Compare a planet(Right) to Jupiter(Left)</div> */}
    </div>
  )
}

export default HabitZoneGraph
