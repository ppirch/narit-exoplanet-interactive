import SelectExoplanet from './SelectExoplanet'
import { useEffect, useState } from 'react'
import PlanetDetail from './PlanetDetail'
import { Layout } from 'layouts'
import { ISimpleExoplanet } from 'interfaces/exoplanet'
import { getAllExoplanet, getExoplanet } from 'apis/exoplanet'
import useExoplanet from 'hooks/useExoplanet'
import useFittingParams from 'hooks/useFittingParams'

const Loading = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>
  )
}

const Home = () => {
  const { exoplanet, setExoplanet, exoplanetId, setExoplanetId } =
    useExoplanet()
  const { setFittingParams } = useFittingParams()
  const defaultExoplanet = {
    _id: exoplanetId,
    name: exoplanet ? exoplanet.name : 'Select Planet'
  }
  const [loading, setLoading] = useState(false)
  const [simpleExoplanet, setSimpleExoplanet] = useState<ISimpleExoplanet[]>([])
  const [selectedExoplanet, setSelectedExoplanet] = useState(defaultExoplanet)

  useEffect(() => {
    setLoading(true)
    getAllExoplanet()
      .then((res) => setSimpleExoplanet(res))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (
      selectedExoplanet._id !== '' &&
      selectedExoplanet._id !== exoplanet?._id
    ) {
      getExoplanet(selectedExoplanet._id).then((res) => {
        setExoplanet(res)
        setExoplanetId(selectedExoplanet._id)
        setFittingParams({
          midTransitTime: res.planetParams.midTransitTime,
          radius: res.planetParams.radius,
          semiMajorAxis: res.planetParams.semiMajorAxis,
          inclination: res.planetParams.inclination
        })
      })
    }
  }, [
    exoplanet?._id,
    selectedExoplanet,
    setExoplanet,
    setExoplanetId,
    setFittingParams
  ])

  return (
    <Layout>
      <div className="flex flex-col">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="w-full p-2">
              <SelectExoplanet
                selected={selectedExoplanet}
                setSelected={setSelectedExoplanet}
                exoplanets={simpleExoplanet}
              />
              <PlanetDetail exoplanet={exoplanet} />
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Home
