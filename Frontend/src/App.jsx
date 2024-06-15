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
import { loader as loadCampAndReviews } from './pages/CampgroundDetails'
import { action as deleteCamp } from './pages/CampgroundDetails'
import { action as updateCamp } from './components/CampgroundForm'

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, errorElement: <ErrorPage />,
    children: [
      {
        path: 'campgrounds',
        children: [
          { index: true, element: <Campgrounds />, loader: loadAllCamps, },
          {
            path: ':id', loader: loadCampAndReviews, id: 'campDetail',
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
