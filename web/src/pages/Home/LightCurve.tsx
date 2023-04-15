import { LightCurveGraph } from 'components'
import { useNavigate } from 'react-router-dom'

const LightCurve = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="p-2">
        <div>
          <LightCurveGraph />
        </div>
        <div className="flex flex-col items-end">
          <button
            onClick={() => navigate('/fitting')}
            type="submit"
            className="inline-flex items-center rounded-md border border-transparent bg-ci-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-ci-orange-700 focus:outline-none focus:ring-2 focus:ring-ci-orange-500 focus:ring-offset-2"
          >
            Fitting
          </button>
        </div>
      </div>
    </>
  )
}

export default LightCurve
