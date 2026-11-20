import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

// Layout wraps every page. <Outlet /> is where the matched child route renders.
function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
