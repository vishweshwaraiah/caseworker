import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from 'template/layout'
import routes from 'template/routes'
import NoPage from 'pages/NoPage'
import 'template/index.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes?.map((item) => (
            <Route path={item._path} element={item._component()} key={item._id}>
              {item._name}
            </Route>
          ))}
          <Route path="*" element={<NoPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
