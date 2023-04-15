import { LightCurveGraph } from 'components'
import { Layout } from 'layouts'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PlanetParams from './PlanetParams'
import StarParams from './StarParams'
import useExoplanet from 'hooks/useExoplanet'
import useFittingParams from 'hooks/useFittingParams'
import {
  ExoplanetPlotResponse,
  FittingResponse,
  fittingBatman,
  plotExoplanet
} from 'apis/fitting'
import ExoplanetGraph from './ExoplanetGraph'
import HabitZoneGraph from './HabitZoneGraph'

const Fitting = () => {
  const navigate = useNavigate()

  const { exoplanet, exoplanetId } = useExoplanet()
  const { fittingParams } = useFittingParams()

  const [displaySynthetic, setDisplaySynthetic] = useState(true)
  const [displayData, setDisplayData] = useState(true)

  const [res, setRes] = useState<FittingResponse | undefined>(undefined)
  const [exoPlotRes, setExoPlotRes] = useState<
    ExoplanetPlotResponse | undefined
  >(undefined)

  useEffect(() => {
    if (exoplanetId === '') {
      navigate('/')
    }
  }, [exoplanetId, navigate])

  useEffect(() => {
    if (fittingParams && exoplanet) {
      fittingBatman({
        t0: fittingParams.midTransitTime,
        rp: fittingParams.radius,
        a: fittingParams.semiMajorAxis,
        inc: fittingParams.inclination,
        JD: exoplanet.JD,
        err_flux: exoplanet.err_flux,
        nor_flux: exoplanet.nor_flux
      }).then((res) => {
        setRes(res)
      })
    }
  }, [fittingParams, exoplanet])

  useEffect(() => {
    if (fittingParams && exoplanet) {
      plotExoplanet({
        host_name: exoplanet.name,
        t0: fittingParams.midTransitTime,
        rp: fittingParams.radius,
        a: fittingParams.semiMajorAxis,
        inc: fittingParams.inclination
      }).then((res) => {
        setExoPlotRes(res)
      })
    }
  }, [fittingParams, exoplanet])

  useEffect(() => {
    if (fittingParams && exoplanet) {
      fittingBatman({
        t0: fittingParams.midTransitTime,
        rp: fittingParams.radius,
        a: fittingParams.semiMajorAxis,
        inc: fittingParams.inclination,
        JD: exoplanet.JD,
        err_flux: exoplanet.err_flux,
        nor_flux: exoplanet.nor_flux
      }).then((res) => {
        setRes(res)
      })
    }
  }, [fittingParams, exoplanet])

  return (
    <Layout>
      <div className="flex h-full w-full flex-col p-2 md:flex-row">
        <div className="flex w-full flex-col items-center justify-center md:w-1/3">
          <div className="m-2 w-full flex-1 rounded-md bg-white p-2 shadow-md">
            <ExoplanetGraph exoPlotRes={exoPlotRes} />
          </div>
          <div className="m-2 w-full flex-1 rounded-md bg-white p-2 shadow-md">
            <HabitZoneGraph exoPlotRes={exoPlotRes} />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center p-2 md:w-2/3">
          <div className="w-full flex-1 rounded-md bg-white shadow-md">
            <div>
              <LightCurveGraph
                fittingT={res && res.t}
                fittingFlux={res && res.flux}
                displaySynthetic={displaySynthetic}
                displayData={displayData}
              />
            </div>
          </div>
          <div className="flex h-full w-full flex-col md:flex-row">
            <div className="m-2 flex flex-1 flex-col rounded-md bg-white p-2 shadow-md">
              <StarParams
                displaySynthetic={displaySynthetic}
                displayData={displayData}
                setDisplaySynthetic={setDisplaySynthetic}
                setDisplayData={setDisplayData}
              />
            </div>
            <div className="m-2 flex flex-1 flex-col rounded-md bg-white p-2 shadow-md">
              <PlanetParams chi2={res?.chi2} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Fitting
