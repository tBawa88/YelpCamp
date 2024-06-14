import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  RootLayout,
  Campgrounds,
  CampgroundDetails,
  NewCampground,
  EditCampground,
  ErrorPage
} from './pages/index'

import { loader as loadAllCamps } from './pages/Campgrounds'
import { loader as loadCampDetails } from './pages/CampgroundDetails'
import { action as updateCamp } from './components/CampgroundForm'
import { action as deleteCamp } from './components/Campground'

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, errorElement: <ErrorPage />,
    children: [
      {
        path: 'campgrounds',
        children: [
          { index: true, element: <Campgrounds />, loader: loadAllCamps, },
          {
            path: ':id', loader: loadCampDetails, id: 'campDetail',
            children: [
              { index: true, element: <CampgroundDetails />, action: deleteCamp },
              { path: 'edit', element: <EditCampground />, action: updateCamp }
            ]
          },
          { path: 'new', element: <NewCampground />, action: updateCamp }
        ]
      },
    ]
  },
]);


function App() {

  return (
    <>
      <RouterProvider router={ router } />
    </>
  )
}

export default App
