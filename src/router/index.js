import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import mHomeView from '../views/main/HomeView.vue'
import HomeView from '../views/HomeView.vue'
import Group from '../views/main/Group.vue'
import Category from '../views/main/Category.vue'
import Poll from '../views/main/Poll.vue'
import LogIn from '../views/main/LogIn.vue'
import SignUp from '../views/main/SignUp.vue'
import AccountActivation from '../views/main/AccountActivation.vue'
import AddPoll from '../views/main/AddPoll.vue'

import CRMSignUp from '../views/SignUp.vue'
import CRMLogIn from '../views/LogIn.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import MyAccount from '../views/dashboard/MyAccount.vue'
import Leads from '../views/dashboard/Leads.vue'
import Lead from '../views/dashboard/Lead.vue'
import AddLead from '../views/dashboard/AddLead.vue'
import EditLead from '../views/dashboard/EditLead.vue'
import AddTeam from '../views/dashboard/AddTeam.vue'
import Team from '../views/dashboard/Team.vue'
import AddMember from '../views/dashboard/AddMember.vue'
import Clients from '../views/dashboard/Clients.vue'
import AddClient from '../views/dashboard/AddClient.vue'
import Client from '../views/dashboard/Client.vue'
import EditClient from '../views/dashboard/EditClient.vue'
import AddNote from '../views/dashboard/AddNote.vue'
import EditNote from '../views/dashboard/EditNote.vue'
import EditMember from '../views/dashboard/EditMember.vue'
import Plans from '../views/dashboard/Plans.vue'
import PlansThankyou from '../views/dashboard/PlansThankyou.vue'

const routes = [
  {
    path: '/',
    name: 'mHomeView',
    component: mHomeView
  },
  {
    path: '/polls/:id',
    name: 'Poll',
    component: Poll
  },
  {
    path: '/groups/:id',
    name: 'Group',
    component: Group
  },
  {
    path: '/categories/:id',
    name: 'Category',
    component: Category
  },
  {
    path: '/polls/add',
    name: 'AddPoll',
    component: AddPoll,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/crm/sign-up',
    name: 'CRMSignUp',
    component: CRMSignUp
  },
  {
    path: '/crm/log-in',
    name: 'CRMLogIn',
    component: CRMLogIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/activate/:uid/:token',
    name: 'AccountActivation',
    component: AccountActivation
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/crm/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/team',
    name: 'Team',
    component: Team,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/team/plans',
    name: 'Plans',
    component: Plans,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/team/plans/thankyou',
    name: 'PlansThankyou',
    component: PlansThankyou,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/edit-member/:id',
    name: 'EditMember',
    component: EditMember,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/team/add-member',
    name: 'AddMember',
    component: AddMember,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/add-team',
    name: 'AddTeam',
    component: AddTeam,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/leads',
    name: 'Leads',
    component: Leads,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/leads/add',
    name: 'AddLead',
    component: AddLead,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/leads/:id',
    name: 'Lead',
    component: Lead,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/leads/:id/edit',
    name: 'EditLead',
    component: EditLead,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/clients',
    name: 'Clients',
    component: Clients,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/clients/add',
    name: 'AddClient',
    component: AddClient,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/clients/:id',
    name: 'Client',
    component: Client,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/clients/:id/edit',
    name: 'EditClient',
    component: EditClient,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/clients/:id/add-note',
    name: 'AddNote',
    component: AddNote,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/crm/dashboard/clients/:id/edit-note/:note_id',
    name: 'EditNote',
    component: EditNote,
    meta: {
      requireLogin: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
