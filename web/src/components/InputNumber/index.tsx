import { classNames } from 'utils'

interface InputNumberProps {
  title?: string
  titleDescription?: string
  unit?: string
  unitDescription?: string
  value?: number
  minValue?: number
  maxValue?: number
  step?: number
  disabled?: boolean
  setValue?: (value: number) => void
}

const InputNumber = (props: InputNumberProps) => {
  const { title, titleDescription } = props
  const { unit, unitDescription } = props
  const { value, minValue, maxValue, step, setValue } = props
  const { disabled } = props

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (setValue) {
      const newValue = parseFloat(e.target.value)
      if (minValue !== undefined && maxValue !== undefined) {
        setValue(Math.min(Math.max(newValue, minValue), maxValue))
      } else if (maxValue !== undefined) {
        setValue(Math.min(newValue, maxValue))
      } else if (minValue !== undefined) {
        setValue(Math.max(newValue, minValue))
      } else {
        setValue(newValue)
      }
    }
  }

  const handleIncrement = () => {
    const oldValue = value || 0
    if (step && setValue) {
      const newValue = parseFloat((oldValue + step).toFixed(5))
      if (maxValue !== undefined) {
        setValue(Math.min(newValue, maxValue))
      } else {
        setValue(newValue)
      }
    }
  }

  const handleDecrement = () => {
    const oldValue = value || 0
    if (step && setValue) {
      const newValue = parseFloat((oldValue - step).toFixed(5))
      if (minValue !== undefined) {
        setValue(Math.max(newValue, minValue))
      } else {
        setValue(newValue)
      }
    }
  }

  return (
    <div className="flex w-full flex-row items-center justify-center">
      <div className="relative py-2">
        <label className="group mx-4 flex min-w-[8rem] text-ci-content">
          {title}
          {titleDescription && (
            <div className="pointer-events-none absolute -left-1/2 bottom-3/4 z-10 ml-14 w-28 rounded-lg bg-gray-500 px-3 py-2 text-center text-xs text-ci-white opacity-0 group-hover:opacity-100">
              {titleDescription}
            </div>
          )}
        </label>
      </div>
      <div
        className={classNames(
          'relative mt-1 flex h-8 w-full flex-row rounded-md bg-transparent',
          !disabled && 'border-gray-100 border-2'
        )}
      >
        {step && (
          <button
            onClick={handleDecrement}
            className="h-full w-8 cursor-pointer rounded-l bg-red-500 text-white  hover:bg-red-300"
          >
            <span className="font-bold">−</span>
          </button>
        )}
        <input
          type="number"
          name={title}
          className={classNames(
            'flex w-full items-center bg-white text-center',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          )}
          disabled={disabled}
          value={value}
          onChange={onChange}
        ></input>
        {step && (
          <button
            onClick={handleIncrement}
            className="h-full w-8 cursor-pointer rounded-r bg-green-500 text-white hover:bg-green-300"
          >
            <span className="font-bold">+</span>
          </button>
        )}
      </div>
      <div className="relative py-2">
        <label className="group mx-4 flex min-w-[3rem] text-ci-content">
          {unit}
          {unitDescription && (
            <div className="pointer-events-none absolute -right-1/2 bottom-3/4 z-10 ml-14 w-28 rounded-lg bg-gray-500 px-3 py-2 text-center text-xs text-ci-white opacity-0 group-hover:opacity-100">
              {unitDescription}
            </div>
          )}
        </label>
      </div>
    </div>
  )
}

export default InputNumber
