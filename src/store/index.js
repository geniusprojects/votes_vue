import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: false,
    isAuthenticated: false,
    token: '',
    user: {
      id: 0,
      username: '',
      is_author: false,
      is_verify: false,
      is_promo: false,
    },
    team: {
      id: 0,
      name: '',
      plan: '',
      max_leads: 0,
      max_clients: 0
    }
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
        state.user.username = localStorage.getItem('username')
        state.user.id = localStorage.getItem('userid')
        if(localStorage.getItem('cols')){
          if(localStorage.getItem('cols')[0] + localStorage.getItem('cols').slice(-1) == '55'){
            state.user.is_verify = true
          }
          if(localStorage.getItem('cols')[0] + localStorage.getItem('cols').slice(-1) == '33'){
            state.user.is_author = true
          }
          if(localStorage.getItem('cols')[0] + localStorage.getItem('cols').slice(-1) == '77'){
            state.user.is_promo = true
          }
        }
        //state.user.is_author = localStorage.getItem('is_author')
        //state.user.is_verify = localStorage.getItem('is_verify')
        //state.user.is_promo = localStorage.getItem('is_promo')
        state.team.name = localStorage.getItem('team_name')
        state.team.id = localStorage.getItem('team_id')
        state.team.plan = localStorage.getItem('team_plan')
        state.team.max_leads = localStorage.getItem('team_max_leads')
        state.team.max_clients = localStorage.getItem('team_max_clients')
      } else {
        state.token = ''
        state.isAuthenticated = false
        state.user.id = 0
        state.user.username = ''
        state.user.is_author = false
        state.user.is_verify = false
        state.user.is_promo = false
        state.team.id = 0
        state.team.name = ''
        state.team.plan = ''
        state.team.max_leads = 0
        state.team.max_clients = 0
      }
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
    setUser(state, user) {
      state.user = user
    },
    setTeam(state, team) {
      state.team = team

      localStorage.setItem('team_id', team.id)
      localStorage.setItem('team_name', team.name)
      localStorage.setItem('team_plan', team.plan)
      localStorage.setItem('team_max_leads', team.max_leads)
      localStorage.setItem('team_max_clients', team.max_clients)
    }
  },
  actions: {
  },
  modules: {
  }
})