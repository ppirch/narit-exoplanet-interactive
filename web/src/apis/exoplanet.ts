import { IExoplanet, ISimpleExoplanet } from 'interfaces/exoplanet'

const API_URL = import.meta.env.VITE_API_URL

async function getAllExoplanet(): Promise<ISimpleExoplanet[]> {
  const response = await fetch(`${API_URL}/exoplanet`)
  return response.json()
}

async function getExoplanet(_id: string): Promise<IExoplanet> {
  const response = await fetch(`${API_URL}/exoplanet/${_id}`)
  return response.json()
}

export { getAllExoplanet, getExoplanet }
