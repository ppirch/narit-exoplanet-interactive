import { IExoplanet } from 'interfaces/exoplanet'
import ImageSlider from './ImageSlider'
import LightCurve from './LightCurve'
import { useState } from 'react'

interface ISelectedArea {
  x: number
  y: number
}
interface IPlanetDetailProps {
  exoplanet: IExoplanet | undefined
}

const PlanetDetail = (props: IPlanetDetailProps) => {
  const { exoplanet } = props
  const [selectedArea, setSelectedArea] = useState<ISelectedArea>({
    x: -1,
    y: -1
  })
  if (exoplanet)
    return (
      <>
        <div className="flex flex-col p-2 md:flex-row">
          <div className=" mx-2 w-full flex-1 rounded-md bg-white p-2 shadow-md md:w-1/2">
            <ImageSlider setSelectedArea={setSelectedArea} />
          </div>
          <div className=" mx-2 w-full flex-1 rounded-md bg-white p-2 shadow-md md:w-1/2">
            <div>
              {selectedArea.x !== -1 &&
                selectedArea.y !== -1 &&
                JSON.stringify(selectedArea)}
            </div>
            <LightCurve />
          </div>
        </div>
      </>
    )
  return (
    <div className="w-full flex-1 p-2 ">
      <div className="flex h-full items-center justify-center">
        <div className="text-2xl">Please select a planet</div>
      </div>
    </div>
  )
}

export default PlanetDetail
