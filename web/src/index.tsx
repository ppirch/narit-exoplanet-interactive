import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, About, Benchmark, Fitting, NotFound } from 'pages'
import 'i18n/i18n'
import { ExoplanetProvider } from 'hooks/useExoplanet'
import { FittingParamsProvider } from 'hooks/useFittingParams'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/fitting',
    element: <Fitting />
  },
  {
    path: '/benchmark',
    element: <Benchmark />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <ExoplanetProvider>
    <FittingParamsProvider>
      <RouterProvider router={router} />
    </FittingParamsProvider>
  </ExoplanetProvider>
)
