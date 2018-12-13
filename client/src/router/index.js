import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs'
import CreateSong from '@/components/CreateSong'
import ViewSong from '@/components/ViewSong'
import Products from '@/components/Products'
import CreateRecords from '@/components/CreateRecords'
import EditRecords from '@/components/EditRecords'
import DeleteRecords from '@/components/DeleteRecords'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'songs-create',
      component: CreateSong
    },
    {
      path: '/songs/:songId',
      name: 'song',
      component: ViewSong
    },
    {
      path: '/products/:tbl',
      name: 'products',
      component: Products
    },
    {
      path: '/create/:tbl',
      name: 'create',
      component: CreateRecords
    },
    {
      path: '/edit/:tbl/:id',
      name: 'edit',
      component: EditRecords
    },
    {
      path: '/delete/:tbl/:id',
      name: 'delete',
      component: DeleteRecords
    }
  ]
})
