export const initStatus = () => {
    return {
      loading: true,
      login: false,
      ready: false
    }
  }
  
  export const state = () => (initStatus())
  
  export const mutations = {
    SET_LOADING: (state, payload) => {
      console.log('store value:', payload)
      state.loading = payload
      console.log(state)
    }
  }
  
  export const actions = {
    setLoading({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_LOADING', data)
      })
    }
  }