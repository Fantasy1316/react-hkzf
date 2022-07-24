import React from 'react'
import { Divider } from 'antd-mobile'

export default function BottomDivider(props) {
  return (
    <div className='bottom-divider' style={{ padding: props.padding }}>
      <Divider style={{ color: props.color }}>{props.children}</Divider>
    </div>
  )
}
