<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout column>
      <v-flex xs10 offset-xs1>
        <panel title="Login">
          <v-text-field
            label="Email"
            v-model="email"
          ></v-text-field>
        <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
          ></v-text-field>
        <br>
        <div class="error" v-html="error" />
        <br>
        <v-btn
            dark
            class="purple darken-3"
            @click="login">
            Login
        </v-btn>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setGroup', response.data.group.id)
        this.$store.dispatch('setPerm', response.data.group.permissions)
        this.$router.push({name: 'root'})
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
  .error {
    color:red;
  }
</style>
