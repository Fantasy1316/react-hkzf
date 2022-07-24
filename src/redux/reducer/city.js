import { SET_CURRENT_CITY } from '../constance'

const initState = { label: '北京', value: 'AREA|88cff55c-aaa4-e2e0', lat: 39.925, lng: 116.404, default: true }

function city(preState = initState, action) {
  const { type, data } = action

  switch (type) {
    case SET_CURRENT_CITY:
      return data

    default:
      return preState
  }
}

export default city
