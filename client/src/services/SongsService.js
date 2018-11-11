import Api from '@/services/Api'

export default {
  index () {
    return Api().get('songs')
  },
  post (post) {
    return Api().post('songs', post)
  }
}
