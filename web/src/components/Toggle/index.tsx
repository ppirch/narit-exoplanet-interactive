import { Switch } from '@headlessui/react'

interface IToggle {
  title: string
  enabled: boolean
  setEnabled: (checked: boolean) => void
}

const Toggle = (props: IToggle) => {
  const { title, enabled, setEnabled } = props

  return (
    <div className="m-2 flex flex-row">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-ci-secondary' : 'bg-ci-grey'}
          relative inline-flex h-[26px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-7' : 'translate-x-0'}
            pointer-events-none inline-block h-[22px] w-[22px] rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <div className="mx-2">{title}</div>
    </div>
  )
}

export default Toggle
