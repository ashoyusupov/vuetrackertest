<template>
  <div>
  <v-navigation-drawer
    stateless
    value="true"
    dark
    class="purple darken-3"
    persistent
    clipped
    app
    v-model="drawer"
    enable-resize-watcher
    v-if="$store.state.isUserLoggedIn"
  >
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>
      <v-list-tile
        v-for="(table, key) in JSON.parse(this.$store.state.permissions)"
        :key="key"
        @click="navigateTo({name: `products`, params: { tbl: key}})"
      >
        <v-list-tile-action>
          <v-icon>table</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{key}}</v-list-tile-title>
      </v-list-tile>
      <v-list-group
        prepend-icon="account_circle"
        value="true"
        v-if="$store.state.groupId===1"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Users</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="(admin, i) in admins"
            :key="i">
            <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Actions</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="(crud, i) in cruds"
            :key="i">
            <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar
    fixed
    dark
    class="purple darken-3"
    app
    clipped-left
  >
    <v-toolbar-title  class="mr-4">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span
          class="home"
          @click="navigateTo({name: 'root'})">
            VueTracker
        </span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        flat
        dark
        @click="navigateTo({name: 'songs'})">
        Browse
      </v-btn>
      <v-btn
        v-for="(table, key) in JSON.parse(this.$store.state.permissions)"
        :key="key"
        flat
        dark
        @click="navigateTo({name: `products`, params: { tbl: key}})">
        {{key}}
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        flat
        dark
        v-if="!$store.state.isUserLoggedIn"
        @click="navigateTo({name: 'login'})">
          Login
      </v-btn>

      <v-btn
        flat
        dark
        v-if="!$store.state.isUserLoggedIn"
        @click="navigateTo({name: 'register'})">
          Register
      </v-btn>

      <v-btn
        flat
        dark
        v-if="$store.state.isUserLoggedIn"
        @click="logout">
          Sign Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  </div>
</template>

<script>
// import ProductService from '@/services/ProductService'

export default {
  data () {
    return {
      drawer: true,
      tables: null,
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ]
    }
  },
  props: {
    source: String
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setGroup', null)
      this.$store.dispatch('setPerm', null)
      this.$router.push({name: 'root'})
    }
  },
  async mounted () {
    console.log(this.$store.state.permissions)
    this.tables = JSON.parse(this.$store.state.permissions)
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>
