import NaritLogo from 'public/images/NaritLogo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  const pages = [
    {
      id: 'home',
      name: 'Home',
      href: '/'
    },
    {
      id: 'about',
      name: 'About',
      href: '/about'
    }
  ]

  return (
    <header>
      <div className="mx-auto flex flex-wrap items-center justify-between p-2">
        <Link to="/">
          <div className="flex items-center pl-2">
            <img src={NaritLogo} className="mr-3 h-8" alt="Flowbite Logo" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-ci-primary">
              Interactive
            </span>
          </div>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-0 flex flex-row rounded-lg p-0 font-medium ">
            {pages.map((page) => (
              <li key={page.id}>
                <Link to={page.href}>
                  <p className="block rounded  py-2 pl-3 pr-4 text-ci-primary hover:text-ci-secondary">
                    {page.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
