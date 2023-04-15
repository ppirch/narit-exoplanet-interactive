interface ISimpleExoplanet {
  _id: string
  name: string
}

interface IExoplanet {
  _id: string
  name: string
  numberOfImages: number
  JD: number[]
  flux: number[]
  err_flux: number[]
  nor_flux: number[]
  coordinate: Coordinate[]
  starParams: StarParams
  planetParams: PlanetParams
  bestFittingPlanetParams: BestFittingPlanetParams
}

interface Coordinate {
  x: number
  y: number
}

interface StarParams {
  mass: number
  radius: number
  temperature: number
}

interface PlanetParams {
  period: number
  midTransitTime: number
  radius: number
  semiMajorAxis: number
  inclination: number
}

interface BestFittingPlanetParams {
  midTransitTime: number
  radius: number
  semiMajorAxis: number
  inclination: number
}

export type { ISimpleExoplanet, IExoplanet }
