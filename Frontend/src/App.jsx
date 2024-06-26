import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  RootLayout,
  Campgrounds,
  CampgroundDetails,
  NewCampground,
  EditCampground,
  ErrorPage,
  AuthenticationPage
} from './pages/index'

import { loader as loadAllCamps } from './pages/Campgrounds'
import { loader as loadCampAndReviews } from './pages/CampgroundDetails'
import { action as deleteCamp } from './pages/CampgroundDetails'
import { action as updateCamp } from './components/CampgroundForm'
import { action as authAction } from './pages/Authentication'
import { action as logoutAction } from './pages/Logout'
import { tokenLoader, checkAuthLoader } from './utils/auth'

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: 'root',
    children: [
      {
        path: 'campgrounds',
        children: [
          { index: true, element: <Campgrounds />, loader: loadAllCamps, },
          {
            path: ':id', loader: loadCampAndReviews, id: 'campDetail',
            children: [
              { index: true, element: <CampgroundDetails />, action: deleteCamp },
              { path: 'edit', element: <EditCampground />, loader: checkAuthLoader, action: updateCamp }
            ]
          },
          { path: 'new', element: <NewCampground />, loader: checkAuthLoader, action: updateCamp }
        ]
      },
      { path: 'auth', element: <AuthenticationPage />, action: authAction },
      { path: 'logout', action: logoutAction }
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
