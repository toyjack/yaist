export const state = () => ({
  data: ''
})

export const mutations = {
  load(state,data){
    state.data=data
  },
}