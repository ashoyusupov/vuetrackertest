import ApiX from '@/services/ApiX'

export default {
  list () {
    return ApiX().get('api/tables')
  },
  async describe (table) {
    let dscrb = (await ApiX().get(`api/${table}/describe`)).data
    let newDsc = []
    for (let i in dscrb) {
      newDsc.push({ name: dscrb[i].Field, label: dscrb[i].Field, index: dscrb[i].Field, width: 90 })
    }
    return newDsc
  }
}
