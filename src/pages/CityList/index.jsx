import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'
import { List, AutoSizer } from 'react-virtualized'
import { cityList, hotCityList } from '../../api'
import { getCityGeographical } from '../../utils'
import { setCity } from '../../redux/action/city'
import './index.scss'
import NavHeader from '../../components/NavHeader'

const TITLE_HEIGHT = 36
const NAMR_HEIGHT = 50
const HOUSE_LIST = ['北京', '广州', '上海', '深圳']

// 格式化城市数据
const formatCityData = (list) => {
  const cityFormatList = {}
  list.forEach((item) => {
    const index = item.short.substr(0, 1)
    if (cityFormatList[index]) {
      cityFormatList[index].push(item)
    } else {
      cityFormatList[index] = [item]
    }
  })

  const cityFormatIndex = Object.keys(cityFormatList).sort()

  return {
    cityFormatList,
    cityFormatIndex
  }
}

// 格式化letter
const formatLetter = (letter) => {
  switch (letter) {
    case '#':
      return '当前城市'
    case 'hot':
      return '热门城市'

    default:
      return letter.toUpperCase()
  }
}

const CityList = (props) => {
  const [cityData, setCityData] = useState([])
  const [cityIndexData, setCityIndexData] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const listComponentRef = useRef(null)

  // 获取城市数据
  const getCityList = async () => {
    const result = await cityList({
      level: 1
    })
    const hotResult = await hotCityList()

    const { cityFormatList, cityFormatIndex } = formatCityData(result.body)
    // 插入热门城市数据
    cityFormatList['hot'] = hotResult.body
    cityFormatIndex.unshift('hot')
    // 插入当前城市数据
    cityFormatList['#'] = [props.currentCity]
    cityFormatIndex.unshift('#')

    setCityData(cityFormatList)
    setCityIndexData(cityFormatIndex)
  }

  // 渲染List数据
  const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const letter = cityIndexData[index]
    const cityRow = cityData[cityIndexData[index]]
    return (
      <div className='city' key={key} style={style}>
        <p className='city-title'>{formatLetter(letter)}</p>
        {cityRow.map((item) => {
          return (
            <p className='city-name' key={item.value} onClick={() => handleChangeCity(item)}>
              {item.label}
            </p>
          )
        })}
      </div>
    )
  }

  // 切换城市
  const handleChangeCity = async (data) => {
    if (!HOUSE_LIST.includes(data.label)) {
      Toast.show({ content: '该城市暂无房源信息' })
      return
    }

    const { label, value } = data
    const result = await getCityGeographical(label)
    props.setCity({
      label,
      value,
      default: false,
      ...result
    })

    Toast.show({ content: `城市已切换为 ${label}` })
  }

  // 获取每一行信息
  const onRowsRendered = ({ startIndex }) => {
    if (startIndex !== activeIndex) {
      setActiveIndex(startIndex)
    }
  }

  // 获取每行高度
  const getRowHeight = ({ index }) => {
    return TITLE_HEIGHT + NAMR_HEIGHT * cityData[cityIndexData[index]].length
  }

  useEffect(() => {
    const initData = async () => {
      await getCityList()
      setTimeout(() => {
        listComponentRef.current.measureAllRows()
      })
    }

    initData()
  }, [])

  return (
    <div className='citylist-container'>
      <NavHeader style={{ marginTop: '-45px', backgroundColor: '#f6f5f6' }}>城市选择</NavHeader>
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={listComponentRef}
            width={width}
            height={height}
            rowCount={cityIndexData.length}
            rowHeight={getRowHeight}
            rowRenderer={rowRenderer}
            onRowsRendered={onRowsRendered}
            scrollToAlignment='start'
          />
        )}
      </AutoSizer>
      <ul className='city-index'>
        {cityIndexData.map((item, index) => {
          return (
            <li
              className='city-index--item'
              key={item}
              onClick={() => {
                listComponentRef.current.scrollToRow(index)
              }}
            >
              <span className={activeIndex === index ? 'item item_active' : 'item '}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default connect((state) => ({ currentCity: state.city }), { setCity })(CityList)
