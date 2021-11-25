export const state = () => ({
  rawData: '',
  data:{}
})

export const mutations = {
  load(state,value){
    state.rawData=value
    const lines= value.data.split('\n')
    for (let line of lines){
      // jump comment
      if (line.startsWith('#')){
        continue
      }

      const cells = line.split(' ')
      if(cells.length <4){
        continue
      }
      const entryCode=cells[0]
      const ivsCode =cells[1].substring(0,5)
      const collection = cells[2]
      // jump adobe-japan
      if(collection.startsWith('Adobe')){
        continue
      }
      if (entryCode in state.data){
        if (!(state.data[entryCode].includes(ivsCode) )){
          state.data[entryCode].push(ivsCode)
        }else{
          continue
        }
      }else{
        state.data[entryCode]=[]
      }
    }
  },
}