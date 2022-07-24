import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { AppOutline, MailOutline, SearchOutline, UserOutline } from 'antd-mobile-icons'

const tabs = [
  {
    key: '',
    title: '首页',
    icon: <AppOutline />
  },
  {
    key: 'houselist',
    title: '搜房',
    icon: <SearchOutline />
  },
  {
    key: 'news',
    title: '资讯',
    icon: <MailOutline />
  },
  {
    key: 'profile',
    title: '我的',
    icon: <UserOutline />
  }
]

export default function CustomTabBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [activeKey, setActiveKey] = useState('')

  useEffect(() => {
    const { pathname } = location
    if (pathname === '/home') {
      setActiveKey('')
    } else if (pathname === '/home/houselist') {
      setActiveKey('houselist')
    } else if (pathname === '/home/news') {
      setActiveKey('news')
    } else if (pathname === '/home/profile') {
      setActiveKey('profile')
    }
  }, [location])

  // 处理 tabbar 改变，切换对应路由
  const handleTabBarChange = (path) => {
    navigate(path)
  }
  return (
    <TabBar activeKey={activeKey} onChange={(tab) => handleTabBarChange(tab)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}
