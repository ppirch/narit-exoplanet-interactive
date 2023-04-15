interface FittingBatmanInput {
  t0: number
  rp: number
  a: number
  inc: number
  JD: number[]
  err_flux: number[]
  nor_flux: number[]
}

interface ExoplanetPlotInput {
  host_name: string
  t0: number
  rp: number
  a: number
  inc: number
}

interface FittingResponse {
  t: number[]
  flux: number[]
  chi2: number
}

interface ExoplanetPlotResponse {
  habit_plot: HabitPlot
  exoplanet_plot: ExoplanetPlot
}

interface HabitPlot {
  axis_lim: number
  outer_circle: number
  inner_circle: number
  planet_semi_major_axis: number
}

interface ExoplanetPlot {
  color_star: string
  position: number
  exoplanet_radius_ratio: number
  juipiter_radius_ratio: number
}

const BASE_URL = import.meta.env.VITE_BASE_URL

async function fittingBatman(
  body: FittingBatmanInput
): Promise<FittingResponse> {
  const response = await fetch(`${BASE_URL}/plot-batman`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return response.json()
}

async function plotExoplanet(
  query: ExoplanetPlotInput
): Promise<ExoplanetPlotResponse> {
  const response = await fetch(
    `${BASE_URL}/plot-exoplanet?host_name=${query.host_name}&t0=${query.t0}&rp=${query.rp}&a=${query.a}&inc=${query.inc}`
  )
  return response.json()
}

export type { FittingResponse, ExoplanetPlotResponse }
export { fittingBatman, plotExoplanet }
