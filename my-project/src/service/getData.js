import axios from './Utils'
// 活动信息查询
export const getActivity = (act) => axios.get('/hongcai/rest/activitys/' + act);
export const getArea = () => axios.get('http://localhost:8888/api/areas');
