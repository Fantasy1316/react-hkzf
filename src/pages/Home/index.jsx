import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import CustomTabBar from '../../components/CustomTabBar'
import CustomLoading from '../../components/CustomLoading'

import './index.scss'

export default function Home() {
  return (
    <div className='home-container'>
      <div className='home-container--content'>
        <Suspense fallback={<CustomLoading />}>
          <Outlet />
        </Suspense>
      </div>
      <div className='home-conatainer--tabs'>
        <CustomTabBar />
      </div>
    </div>
  )
}
