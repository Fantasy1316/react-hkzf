import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, Divider } from 'antd-mobile'
import { CompassOutline, DownFill, SearchOutline } from 'antd-mobile-icons'
import { setCity } from '../../redux/action/city'
import { swiperList, groupsData, newsList, cityInfo } from '../../api'
import BottomDivider from '../../components/BottomDivider'
import './index.scss'

import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

const navList = [
  {
    icon: Nav1,
    title: '整租',
    path: '/home/houselist'
  },
  {
    icon: Nav2,
    title: '合租',
    path: '/home/houselist'
  },
  {
    icon: Nav3,
    title: '地图找房',
    path: '/home/houselist'
  },
  {
    icon: Nav4,
    title: '去出租',
    path: '/home/houselist'
  }
]

const Index = () => {
  const [swiper, setSwiper] = useState([{ id: '0', imgSrc: '', alt: '' }])
  const [groups, setGroups] = useState([])
  const [news, setNews] = useState([])
  const navigate = useNavigate()

  const currentCity = useSelector((state) => {
    console.log(state)
    return state.city
  })
  const dispatch = useDispatch()

  // 获取当前城市信息
  const getCurrentCity = async () => {
    if (!currentCity.default) return
    const city = new window.BMapGL.LocalCity()
    city.get(async (res) => {
      const { name, center } = res
      const result = await cityInfo({ name })
      dispatch(
        setCity({
          ...result.body,
          ...center,
          default: false
        })
      )
    })
  }

  // 获取轮播图数据
  const getSwiperList = async () => {
    const result = await swiperList({})
    setSwiper(result.body)
  }

  // 获取租房小组数据
  const getGroupsData = async () => {
    const result = await groupsData({})
    setGroups(result.body)
  }

  // 获取最新资讯信息数据
  const getNewsList = async () => {
    const result = await newsList({})
    setNews(result.body)
  }

  // 导航菜单点击
  const handleNavigateChange = (path) => {
    navigate(path)
  }

  useEffect(() => {
    getCurrentCity()
    getSwiperList()
    getGroupsData()
    getNewsList()
  }, [])

  return (
    <div className='index-container'>
      {/* 轮播图 */}
      <div className='index-container--swiper'>
        <div className='search'>
          <div className='search-left'>
            <p className='search-left--place' onClick={() => handleNavigateChange('/citylist')}>
              {currentCity.label} <DownFill style={{ position: 'relative', top: '-1px', fontSize: 12, color: '#ccc', fontWeight: 'lighter' }} />
            </p>
            <Divider direction='vertical' />
            <p className='search-left--input'>
              <SearchOutline style={{ marginRight: 4, fontSize: 16, color: '#ccc', fontWeight: 'lighter' }} />
              请输入小区或地址
            </p>
          </div>
          <CompassOutline style={{ fontSize: 30, color: '#fff', fontWeight: 'lighter' }} onClick={() => handleNavigateChange('/map')} />
        </div>
        <Swiper autoplay loop>
          {swiper.map((item) => (
            <Swiper.Item key={item.id}>
              <div className='content'>
                <img src={`http://172.16.0.112:8080${item.imgSrc}`} alt='' />
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </div>
      {/* 导航菜单 */}
      <div className='index-container--nav'>
        {navList.map((nav) => {
          return (
            <div className='nav-item' key={nav.title} onClick={() => handleNavigateChange(nav.path)}>
              <img className='nav-item--icon' src={nav.icon} alt={nav.title} />
              <p className='nav-item--title'>{nav.title}</p>
            </div>
          )
        })}
      </div>
      {/* 租房小组 */}
      <div className='index-container--groups'>
        <p className='groups-title'>
          <span className='groups-title--text'>租房小组</span>
          <span className='groups-title--more'>更多</span>
        </p>
        <div className='groups-items'>
          {groups.map((item) => {
            return (
              <div className='item' key={item.id}>
                <div className='item-left'>
                  <p className='item-left--title'>{item.title}</p>
                  <p className='item-left--desc'>{item.desc}</p>
                </div>
                <img className='item-right' src={`http://172.16.0.112:8080${item.imgSrc}`} alt={item.title} />
              </div>
            )
          })}
        </div>
      </div>
      {/* 咨询 */}
      <div className='index-container--news'>
        <p className='news-title'>最新资讯</p>
        <div className='news-items'>
          {news.map((item) => {
            return (
              <div className='item' key={item.id}>
                <img className='item-img' src={`http://172.16.0.112:8080${item.imgSrc}`} alt='' />
                <div className='item-info'>
                  <p className='item-info--title'>{item.title}</p>
                  <p className='item-info--footer'>
                    <span className='footer-from'>{item.from}</span>
                    <span className='footer-date'>{item.date}</span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <BottomDivider padding='0 14px' color='#dadada'>
        我是有底线的
      </BottomDivider>
    </div>
  )
}

export default Index
