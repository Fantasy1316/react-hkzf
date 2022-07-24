import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Home = lazy(() => import('../pages/Home'))
const CityList = lazy(() => import('../pages/CityList'))
const Index = lazy(() => import('../pages/Index'))
const HouseList = lazy(() => import('../pages/HouseList'))
const News = lazy(() => import('../pages/News'))
const Profile = lazy(() => import('../pages/Profile'))
const Map = lazy(() => import('../pages/Map'))

const routes = [
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '',
        element: <Index />
      },
      {
        path: 'houselist',
        element: <HouseList />
      },
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  },
  {
    path: '/citylist',
    element: <CityList />
  },
  {
    path: '/map',
    element: <Map />
  },
  {
    path: '/',
    element: <Navigate to='/home' />
  }
]

export default routes
