import {getActivity} from '../service/getData'
import {bridgeUtil, Utils} from '../service/Utils'
const actions = {
  getActivityInfo ({commit}, act) {
    getActivity(act).then((res) => {
      commit('GET_ACTIVITY_INFO', {start: res.data.startTime, end: res.data.endTime, stutas: res.data.stutas})
    })
  },
  getToken ({commit}) {
    bridgeUtil.webConnectNative('HCNative_GetToken', '', {}, function (res) {
      let t = Utils.isAndroid() ? JSON.parse(res).token : res.token
      commit('SET_TOKEN', {token: t})
    }, null)
    bridgeUtil.webConnectNative('', 'HCWeb_LoginSuccess', {}, function (res) {}, function (data) {
      let t = Utils.isAndroid() ? JSON.parse(data).token : data.token
      commit('SET_TOKEN', {token: t})
    })
  }
}
export default actions
