// 百度IP定位获取用户地理位置
export const getUserLocaltionCity = () => {
  return new Promise((resolve, reject) => {
    try {
      const localCity = new window.BMapGL.LocalCity()
      localCity.get((res) => {
        resolve(res)
      })
    } catch (error) {
      reject(error)
    }
  })
}

// 百度地图更具城市名称获取经纬度
export const getCityGeographical = (name) => {
  return new Promise((resolve, reject) => {
    try {
      let city = ''
      if (name.indexOf('市') <= -1) {
        city = `${name}市`
      }
      const info = new window.BMapGL.Geocoder()
      info.getPoint(city, (res) => {
        resolve(res)
      })
    } catch (error) {
      reject(error)
    }
  })
}
