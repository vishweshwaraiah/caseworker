import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from 'template/layout'
import routes from 'template/routes'
import NoPage from 'pages/NoPage'
import { getAuthUser } from 'redux/_actions/auth'
import 'template/index.scss'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAuthUser())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes?.map((item) => {
            const Component = (props) => item.routeComp(props)
            return (
              <Route
                path={item.routePath}
                element={<Component />}
                key={item.routeId}
              />
            )
          })}
          <Route path="*" element={<NoPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
