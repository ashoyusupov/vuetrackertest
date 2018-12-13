import ApiX from '@/services/ApiX'

export default {
  list () {
    return ApiX().get('api/tables')
  },
  async describe (table) {
    let dscrb = (await ApiX().get(`api/${table}/describe`)).data
    let newDsc = []
    for (let i in dscrb) {
      newDsc.push({ name: dscrb[i].Field, label: dscrb[i].Field, index: dscrb[i].Field, width: 100, type: dscrb[i].Type })
    }
    return newDsc
  },
  async dscrb (table, id) {
    let values = (await ApiX().get(`api/${table}/describe`)).data
    return values
  },
  create (table, danniy) {
    return ApiX().post(`api/${table}`, danniy)
  },
  createBulk (table, danniy) {
    return ApiX().post(`api/${table}/bulk`, danniy)
  },
  update (table, id, danniy) {
    return ApiX().patch(`api/${table}/${id}`, danniy)
  },
  delete (table, id) {
    return ApiX().delete(`api/${table}/${id}`)
  },
  async get (table, id) {
    return (await ApiX().get(`api/${table}/${id}`)).data[0]
  },
  async view (table, id) {
    let values = (await ApiX().get(`api/${table}/${id}`)).data[0]
    let dscrb = (await ApiX().get(`api/${table}/describe`)).data
    let newDsc = []
    for (let i in dscrb) {
      let retval
      if (dscrb[i].Type === 'datetime') {
        retval = (values[dscrb[i].Field])
      } else {
        retval = values[dscrb[i].Field]
      }
      newDsc.push({name: dscrb[i].Field, label: dscrb[i].Field, index: dscrb[i].Field, width: 100, type: dscrb[i].Type, val: retval})
    }
    return newDsc
  }
}
