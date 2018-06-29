import axios from 'axios'
// 活动信息查询
export const getActivity = (act) => axios('/hongcai/rest/activitys/' + act)
