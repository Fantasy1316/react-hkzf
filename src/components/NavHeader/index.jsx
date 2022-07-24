import React from 'react'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import './index.scss'

export default function NavHeader(props) {
  const navigate = useNavigate()

  return (
    <NavBar style={props.style} onBack={() => navigate(-1)}>
      {props.children}
    </NavBar>
  )
}
