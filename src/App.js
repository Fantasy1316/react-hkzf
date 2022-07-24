import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import CustomLoading from './components/CustomLoading'

export default function App() {
  const element = useRoutes(routes)

  return (
    <div>
      <Suspense fallback={<CustomLoading />}>{element}</Suspense>
    </div>
  )
}
