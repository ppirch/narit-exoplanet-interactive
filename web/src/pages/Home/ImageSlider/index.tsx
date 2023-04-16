import ImageMapper from 'react-img-mapper'
import { useElementSize } from 'usehooks-ts'
import useExoplanet from 'hooks/useExoplanet'
import { useMemo, useState } from 'react'
import { classNames } from 'utils'
const API_URL = import.meta.env.VITE_API_URL

interface ISelectedArea {
  x: number
  y: number
}
interface ImageSliderProps {
  setSelectedArea: (area: ISelectedArea) => void
}

const ImageSlider = (props: ImageSliderProps) => {
  const { setSelectedArea } = props
  const [containerRef, { width }] = useElementSize()
  const [currentPage, setCurrentPage] = useState(1)
  const { exoplanet } = useExoplanet()
  const imageURL = useMemo(() => {
    if (exoplanet) {
      return `${API_URL}/images/${exoplanet.name}/${currentPage}.jpg`
    } else {
      return ''
    }
  }, [exoplanet, currentPage])

  const mapperCoordinate = useMemo(() => {
    if (exoplanet) {
      return {
        name: `exoplanet-map`,
        areas: exoplanet.coordinate.map((value, index) => {
          return {
            id: `${index}`,
            name: `${index}`,
            shape: 'circle',
            fillColor: 'red',
            strokeColor: 'red',
            coords: [value.x, value.y, 5]
          }
        })
      }
    }
  }, [exoplanet])

  return (
    <>
      <div className="h-full">
        <div className="flex flex-col items-center justify-center p-2">
          <div ref={containerRef} className="w-2/3">
            <ImageMapper
              src={imageURL}
              map={mapperCoordinate}
              responsive={true}
              parentWidth={width}
              onClick={(area) =>
                setSelectedArea({ x: area.coords[0], y: area.coords[1] })
              }
            />
          </div>
          <div className="mt-2 flex w-full justify-between px-8">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              type="button"
              className={classNames(
                currentPage === 1 && 'invisible',
                'h-10 rounded-l-md border-r border-ci-grey bg-ci-primary px-3 py-2 text-white hover:bg-ci-secondary hover:text-white'
              )}
            >
              <div className="flex flex-row align-middle">
                <svg
                  className="mr-2 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="ml-2">Previous</p>
              </div>
            </button>
            <div>
              Current: {currentPage} / {exoplanet?.numberOfImages}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              type="button"
              className={classNames(
                currentPage === exoplanet?.numberOfImages && 'invisible',
                'h-10 rounded-r-md border-l border-ci-grey bg-ci-primary px-3 py-2 text-white hover:bg-ci-secondary hover:text-white text-sm font-medium shadow-sm '
              )}
            >
              <div className="flex flex-row align-middle">
                <span className="mr-2">Next</span>
                <svg
                  className="ml-2 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageSlider
