import Requset from '../utils/request'

// 获取轮播图数据
export const swiperList = (data) => {
  return Requset('get', '/home/swiper', data)
}

// 获取租房小组数据
export const groupsData = (data) => {
  return Requset('get', '/home/groups', data)
}

// 获取最新资讯数据
export const newsList = (data) => {
  return Requset('get', '/home/news', data)
}

// 获取城市信息
export const cityInfo = (data) => {
  return Requset('get', '/area/info', data)
}

// 获取城市列表信息
export const cityList = (data) => {
  return Requset('get', '/area/city', data)
}

// 获取热门城市列表信息
export const hotCityList = (data) => {
  return Requset('get', '/area/hot', data)
}

// 获取房源数据
export const areaMap = (data) => {
  return Requset('get', '/area/map', data)
}

// 获取房屋列表
export const housesList = (data) => {
  return Requset('get', '/houses', data)
}
