import { IExoplanet, ISimpleExoplanet } from 'interfaces/exoplanet'

const BASE_URL = import.meta.env.VITE_BASE_URL

async function getAllExoplanet(): Promise<ISimpleExoplanet[]> {
  const response = await fetch(`${BASE_URL}/exoplanet`)
  return response.json()
}

async function getExoplanet(_id: string): Promise<IExoplanet> {
  const response = await fetch(`${BASE_URL}/exoplanet/${_id}`)
  return response.json()
}

export { getAllExoplanet, getExoplanet }
