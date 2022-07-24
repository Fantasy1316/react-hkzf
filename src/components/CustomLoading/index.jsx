import React from 'react'
import { DotLoading } from 'antd-mobile'
import './index.scss'

export default function CustomLoading() {
  return (
    <div className='custom-loading'>
      <div className='custom-loading--content'>
        <span className='content-text'>加载中</span>
        <span style={{ fontSize: 28 }}>
          <DotLoading color='currentColor' />
        </span>
      </div>
    </div>
  )
}
