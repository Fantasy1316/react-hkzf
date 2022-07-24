import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { areaMap, housesList } from '../..//api'
import NavHeader from '../../components/NavHeader'
import './index.scss'

const Map = (props) => {
  let map = null
  const [houses, setHouses] = useState([])
  const [show, setShow] = useState(false)

  // 初始化地图
  const handleInitMap = () => {
    const { lat, lng } = props.currentCity
    const newMap = new window.BMapGL.Map('container')
    const point = new window.BMapGL.Point(lng, lat)
    newMap.centerAndZoom(point, 11)

    // 设置控件
    newMap.addControl(new window.BMapGL.ZoomControl())
    newMap.addControl(new window.BMapGL.ScaleControl())

    // 监听地图移动，隐藏房源列表
    newMap.addEventListener('movestart', () => {
      setShow(false)
    })

    map = newMap
    renderOverlay(props.currentCity.value)
  }

  // 获取地图覆盖物数据
  const renderOverlay = async (id) => {
    const result = await areaMap({ id })

    const { nextZoom, type } = getTypeAndZoom()
    result.body.forEach((item) => {
      createOverlay(item, nextZoom, type)
    })
  }

  // 获取地图缩放值和行政
  const getTypeAndZoom = () => {
    let nextZoom, type
    const zoom = map.getZoom()

    if (zoom >= 10 && zoom < 12) {
      nextZoom = 13
      type = 'circle'
    } else if (zoom >= 12 && zoom < 14) {
      nextZoom = 15
      type = 'circle'
    } else if (zoom >= 14 && zoom < 16) {
      type = 'rect'
    }

    return {
      nextZoom,
      type
    }
  }

  // 创建覆盖物
  const createOverlay = (data, zoom, type) => {
    const {
      coord: { latitude, longitude },
      label: areaName,
      count,
      value
    } = data
    const point = new window.BMapGL.Point(longitude, latitude)
    if (type === 'circle') {
      createCircleOverlay(point, areaName, count, value, zoom)
    } else {
      createRectOverlay(point, areaName, count, value)
    }
  }

  // 创建圆形覆盖物
  const createCircleOverlay = (point, name, count, id, zoom) => {
    // 设置文本覆盖物
    const opts = {
      position: point,
      offset: new window.BMapGL.Size(-35, -35)
    }
    const label = new window.BMapGL.Label('', opts)
    label.id = id
    label.setContent(`
    <div class='bubble'>
      <p class='name'>${name}</p>
      <p class='num'>${count}套</p>
    </div>`)
    const labelStyle = {
      cursor: 'pointer',
      border: '0px solid rgb(255, 0, 0)',
      padding: '0px',
      whiteSpace: 'nowarp',
      fontSize: '12px',
      color: 'rgba(255, 255, 255)',
      textAlign: 'center'
    }
    label.setStyle(labelStyle)
    label.addEventListener('click', () => {
      renderOverlay(id)
      map.centerAndZoom(point, zoom)
      map.clearOverlays()
    })
    map.addOverlay(label)
  }

  // 创建方形覆盖物
  const createRectOverlay = (point, name, count, id) => {
    // 设置文本覆盖物
    const opts = {
      position: point,
      offset: new window.BMapGL.Size(-50, -28)
    }
    const label = new window.BMapGL.Label('', opts)
    label.id = id
    label.setContent(`
    <div class='rect'>
      <span class='housename'>${name}</span>
      <span class='housenum'>${count}</span>
      <svg class='downarrow' t="1658557926524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2419" width="16" height="16"><path d="M325.456471 862.280661" p-id="2420" fill="#2bbb7f"></path><path d="M882.057788 862.280661" p-id="2421" fill="#2bbb7f"></path><path d="M236.028491 877.160382" p-id="2422" fill="#2bbb7f"></path><path d="M960.132455 877.160382" p-id="2423" fill="#2bbb7f"></path><path d="M63.683483 788.736998" p-id="2424" fill="#2bbb7f"></path><path d="M958.469023 788.736998" p-id="2425" fill="#2bbb7f"></path><path d="M64.77753 858.792098" p-id="2426" fill="#2bbb7f"></path><path d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z" p-id="2427" fill="#2bbb7f"></path><path d="M959.523505 858.792098" p-id="2428" fill="#2bbb7f"></path></svg>
    </div>`)
    const labelStyle = {
      cursor: 'pointer',
      border: '0px solid rgb(255, 0, 0)',
      padding: '0px',
      whiteSpace: 'nowarp',
      fontSize: '12px',
      color: 'rgba(255, 255, 255)',
      textAlign: 'center'
    }
    label.setStyle(labelStyle)
    label.addEventListener('click', (e) => {
      renderOverlay(id)
      map.centerAndZoom(point, 16)
      getHousesList(id)

      // 获取地图移动偏移量
      const { clientX, clientY } = e.domEvent.changedTouches[0]
      map.panBy(window.innerWidth / 2 - clientX, (window.innerHeight - 300) / 2 - clientY)
    })
    map.addOverlay(label)
  }

  // 获取房屋列表
  const getHousesList = async (id) => {
    const result = await housesList({ cityId: id })
    const list = result.body.list || []
    setHouses(list)
    setShow(true)
  }

  useEffect(() => {
    handleInitMap()
  }, [])

  return (
    <div className='map-container'>
      <NavHeader>地图找房</NavHeader>
      <div className='container' id='container'></div>
      <div className={show ? 'houses houses_show' : 'houses'}>
        <p className='houses-title'>
          <span className='houses-title--text'>房屋列表</span>
          <span className='houses-title--more'>更多房源</span>
        </p>
        <div className='houses-list'>
          {houses.map((item) => {
            return (
              <div className='houses-list--item' key={item.houseCode}>
                <img className='item-img' src={`http://192.168.31.148:8080${item.houseImg}`} alt='' />
                <div className='item-info'>
                  <p className='item-info--title'>{item.title}</p>
                  <p className='item-info--desc'>{item.desc}</p>
                  <p className='item-info--tags'>
                    {item.tags.map((tag, index) => {
                      return (
                        <span className={`tag-item tag-item_${index}`} key={tag}>
                          {tag}
                        </span>
                      )
                    })}
                  </p>
                  <p className='item-info--price'>
                    {item.price}
                    <span className='price-unit'>元/月</span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({ currentCity: state.city }))(Map)
