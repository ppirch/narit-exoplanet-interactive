import { FittingResponse, fittingBatman } from 'apis/fitting'
import { LightCurveGraph } from 'components'
import useExoplanet from 'hooks/useExoplanet'
import useFittingParams from 'hooks/useFittingParams'
import { Layout } from 'layouts'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Benchmark = () => {
  const { exoplanet, exoplanetId } = useExoplanet()
  const { fittingParams } = useFittingParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (exoplanetId === '') {
      navigate('/')
    }
  }, [exoplanetId, navigate])

  const [defaultRes, setDefaultRes] = useState<FittingResponse | undefined>(
    undefined
  )

  const [fittingRes, setFittingRes] = useState<FittingResponse | undefined>(
    undefined
  )

  const [bestRes, setBestRes] = useState<FittingResponse | undefined>(undefined)
  const { planetParams } = exoplanet || {}
  const { bestFittingPlanetParams } = exoplanet || {}

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
        setFittingRes(res)
      })
    }
  }, [exoplanet, fittingParams])

  useEffect(() => {
    if (exoplanet && planetParams) {
      fittingBatman({
        t0: planetParams.midTransitTime,
        rp: planetParams.radius,
        a: planetParams.semiMajorAxis,
        inc: planetParams.inclination,
        JD: exoplanet.JD,
        err_flux: exoplanet.err_flux,
        nor_flux: exoplanet.nor_flux
      }).then((res) => {
        setBestRes(res)
      })
    }
  }, [exoplanet, planetParams])

  useEffect(() => {
    if (exoplanet && bestFittingPlanetParams) {
      fittingBatman({
        t0: bestFittingPlanetParams.midTransitTime,
        rp: bestFittingPlanetParams.radius,
        a: bestFittingPlanetParams.semiMajorAxis,
        inc: bestFittingPlanetParams.inclination,
        JD: exoplanet.JD,
        err_flux: exoplanet.err_flux,
        nor_flux: exoplanet.nor_flux
      }).then((res) => {
        setDefaultRes(res)
      })
    }
  }, [bestFittingPlanetParams, exoplanet])

  return (
    <Layout>
      <div>
        <div className="flex w-full flex-col items-center justify-center rounded-md p-2 shadow-md">
          <div className="min-h-[64px] w-full flex-1 p-2">
            <div className="flex flex-col items-center">
              <div className="w-full">
                <LightCurveGraph
                  fittingT={fittingRes?.t}
                  fittingFlux={fittingRes?.flux}
                  defaultT={defaultRes?.t}
                  defaultFlux={defaultRes?.flux}
                  bestT={bestRes?.t}
                  bestFlux={bestRes?.flux}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex-1 p-2">
            <div>Compare</div>
            <div className="flex flex-col items-center">
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Parameters</th>
                    <th className="border px-4 py-2">Default</th>
                    <th className="border px-4 py-2">Our</th>
                    <th className="border px-4 py-2">Best</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="border px-4 py-2">Mid-transit time</td>
                    <td className="border px-4 py-2">
                      {planetParams?.midTransitTime}
                    </td>
                    <td className="border px-4 py-2">
                      {fittingParams?.midTransitTime}
                    </td>
                    <td className="border px-4 py-2">
                      {bestFittingPlanetParams?.midTransitTime}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border px-4 py-2">Radius</td>
                    <td className="border px-4 py-2">{planetParams?.radius}</td>
                    <td className="border px-4 py-2">
                      {fittingParams?.radius}
                    </td>
                    <td className="border px-4 py-2">
                      {bestFittingPlanetParams?.radius}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border px-4 py-2">Semi-major axis</td>
                    <td className="border px-4 py-2">
                      {planetParams?.semiMajorAxis}
                    </td>
                    <td className="border px-4 py-2">
                      {fittingParams?.semiMajorAxis}
                    </td>
                    <td className="border px-4 py-2">
                      {bestFittingPlanetParams?.semiMajorAxis}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border px-4 py-2">Inclination</td>
                    <td className="border px-4 py-2">
                      {planetParams?.inclination}
                    </td>
                    <td className="border px-4 py-2">
                      {fittingParams?.inclination}
                    </td>
                    <td className="border px-4 py-2">
                      {bestFittingPlanetParams?.inclination}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border px-4 py-2">Chi-Squared</td>
                    <td className="border px-4 py-2">
                      {parseFloat((defaultRes?.chi2 ?? 0).toFixed(5))}
                    </td>
                    <td className="border px-4 py-2">
                      {parseFloat((fittingRes?.chi2 ?? 0).toFixed(5))}
                    </td>
                    <td className="border px-4 py-2">
                      {parseFloat((bestRes?.chi2 ?? 0).toFixed(5))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Benchmark
