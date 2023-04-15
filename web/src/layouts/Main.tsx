import { ReactNode } from 'react'

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex w-full grow flex-col bg-ci-white p-2 antialiased">
      {children}
    </main>
  )
}

export default Main
