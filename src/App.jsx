import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from "./components/Homepage"
import Meal from "./components/Meal"
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" >
        <Route index element={<Home />} />
        <Route path='/meal' element={<Meal />} />
      </Route>
    )
  )
  return (
    <> 
        <div className="app">
          <RouterProvider router={router} />
        </div>
    </>
  )
}


export default App
