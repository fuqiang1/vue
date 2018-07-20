const mutations = {
  GET_ACTIVITY_INFO (state, {start, end, status}) { // 拿到活动信息
    if (start) state.activityInfo.startTime = start
    if (end) state.activityInfo.endTime = end
    if (status) state.activityInfo.status = status
  },
  SET_TOKEN (state, token) { // 写入token
    if (token) state.token = token
  },
  SET_AREA (state, {areaList}) {
    if (areaList) state.areaList = areaList
  }
}
export default mutations
