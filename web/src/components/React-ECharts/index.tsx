import { useRef, useEffect } from 'react'
import { CanvasRenderer } from 'echarts/renderers'
import { init, getInstanceByDom, use } from 'echarts/core'
import { ScatterChart, LineChart } from 'echarts/charts'
import {
  LegendComponent,
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  TitleComponent,
  DataZoomComponent
} from 'echarts/components'
import type { ECharts, ComposeOption, SetOptionOpts } from 'echarts/core'
import type { ScatterSeriesOption, LineSeriesOption } from 'echarts/charts'
import type {
  DataZoomComponentOption,
  TitleComponentOption,
  GridComponentOption
} from 'echarts/components'
import type { CSSProperties } from 'react'

use([
  LegendComponent,
  ScatterChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  DataZoomComponent,
  CanvasRenderer
])

export type EChartsOption = ComposeOption<
  | ScatterSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | LineSeriesOption
  | DataZoomComponentOption
>

export interface ReactEChartsProps {
  option: EChartsOption
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  theme?: 'light' | 'dark'
}

export default function ReactECharts({
  option,
  style,
  settings,
  loading,
  theme
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let chart: ECharts | undefined
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme)
    }

    function resizeChart() {
      chart?.resize()
    }
    window.addEventListener('resize', resizeChart)

    return () => {
      chart?.dispose()
      window.removeEventListener('resize', resizeChart)
    }
  }, [theme])

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      chart?.setOption(option, settings)
    }
  }, [option, settings, theme])

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loading === true ? chart?.showLoading() : chart?.hideLoading()
    }
  }, [loading, theme])

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100px', ...style }} />
  )
}
