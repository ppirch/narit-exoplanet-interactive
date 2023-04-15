import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { classNames } from 'utils'
import { ISimpleExoplanet } from 'interfaces/exoplanet'

interface SelectExoplanetProps {
  exoplanets: ISimpleExoplanet[]
  selected: ISimpleExoplanet
  setSelected: (selected: ISimpleExoplanet) => void
}

const SelectExoplanet = (props: SelectExoplanetProps) => {
  const { exoplanets, selected, setSelected } = props
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-xl font-bold text-ci-primary">
            Select Exoplanet:
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-ci-content shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-ci-secondary">
              <span className="flex items-center">
                <span className="block truncate">{selected.name}</span>
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                {exoplanets.map((exoplanet) => (
                  <Listbox.Option
                    key={exoplanet._id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'bg-ci-secondary text-white'
                          : 'text-ci-content',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={exoplanet}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}
                          >
                            {exoplanet.name}
                          </span>
                        </div>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-ci-content',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          />
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default SelectExoplanet
