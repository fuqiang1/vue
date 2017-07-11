import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/about.vue'
import UserCenter from '../components/user-center/UserCenter.vue'
import ProjectDetail from '../components/ProjectDetail.vue'
import Invite from '../components/activity/invite.vue'
import ActivityReward from '../components/activity/reward.vue'
import Lottery from '../components/activity/lottery.vue'
import LotteryRecord from '../components/activity/lotteryRecord.vue'
import HelpCenter from '../components/user-center/helpCenter.vue'
import Help from '../components/user-center/help.vue'
import Question from '../components/user-center/question.vue'
import NoticeDetail from '../components/user-center/noticeDetail.vue'
import bankCardLimit from '../components/user-center/bankCardLimit.vue'
import RegisterAgree from '../components/registerAgree.vue'
import AssignmentAgree from '../components/assignmentAgree.vue'
import ServiceAgreeAssignment from '../components/serviceAgreeAssignment.vue'
import ServiceAgree from '../components/serviceAgree.vue'
import AssignmentQuestion from '../components/assignmentQuestion.vue'
import BusinessSuccess from '../components/businessSuccess.vue'
import BankCustody from '../components/bank-custody.vue'
import Safe from '../components/safe.vue'
import BindWechat from '../components/bind-wechat.vue'
import Test from '../components/test.vue'
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/businessSuccess',
    name: 'BusinessSuccess',
    component: BusinessSuccess
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {title: '走进宏财'}
  },
  {
    path: '/user-center',
    name: 'UserCenter',
    component: UserCenter
  },
  {
    path: '/user-center/help-center',
    name: 'HelpCenter',
    component: HelpCenter,
    meta: {title: '帮助中心'}
  },
  {
    path: '/user-center/help/:type',
    name: 'Help',
    component: Help
  },
  {
    path: '/user-center/questionnaire',
    name: 'Question',
    component: Question,
    meta: {title: '风险测评'}
  },
  {
    path: '/project/:number',
    name: 'ProjectDetail',
    component: ProjectDetail
  },
  {
    path: '/activity/invite',
    name: 'Invite',
    component: Invite,
    meta: {title: '邀请好友'}
  },
  {
    path: '/activity/reward/:token',
    name: 'ActivityReward',
    component: ActivityReward,
    meta: {title: '我的奖励'}
  },
  {
    path: '/activity/lottery',
    name: 'Lottery',
    component: Lottery,
    meta: {title: '幸运大抽奖'}
  },
  {
    path: '/activity/user-lottery-record/:token',
    name: 'LotteryRecord',
    component: LotteryRecord,
    meta: {title: '我的奖励'}
  },
  {
    path: '/register-agree',
    name: 'RegisterAgree',
    component: RegisterAgree,
    meta: {title: '注册服务协议'}
  },
  {
    path: '/assignment-agree',
    name: 'AssignmentAgree',
    component: AssignmentAgree,
    meta: {title: '债权转让协议'}
  },
  {
    path: '/service-agree/:number',
    name: 'ServiceAgree',
    component: ServiceAgree,
    meta: {title: '宏财网服务协议'}
  },
  {
    path: '/service-agree-assignment/:number',
    name: 'ServiceAgreeAssignment',
    component: ServiceAgreeAssignment,
    meta: {title: '宏财网服务协议'}
  },
  {
    path: '/assignment-question',
    name: 'AssignmentQuestion',
    component: AssignmentQuestion,
    meta: {title: '常见问题'}
  },
  {
    path: '/bank-custody',
    name: 'BankCustody',
    component: BankCustody,
    meta: {title: '银行存管介绍'}
  },
  {
    path: '/safe',
    name: 'Safe',
    component: Safe,
    meta: {title: '安全保障'}
  },
  {
    path: '/user-center/messages/:id',
    name: 'NoticeDetail',
    component: NoticeDetail,
    meta: {title: '公告详情'}
  },
  {
    path: '/bind-wechat',
    name: 'BindWechat',
    component: BindWechat,
    meta: {title: '绑定微信有钱领'}
  },
  {
    path: '/user-center/bankcard-limit',
    name: 'bankCardLimit',
    component: bankCardLimit,
    meta: {title: '银行卡限额'}
  },
  {
    path: '*',
    redirect: {name: 'Home'}
  }
]
const router = new Router({
  hashbang: true, // 将路径格式化为#!开头
  history: true, // use history=false when testing
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'v-link-active',
  routes // （缩写）相当于 routes: routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title === undefined) {
    document.title = '宏财网'
  } else {
    document.title = to.meta.title
  }
  next()
})
export default router

