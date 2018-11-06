<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout column>
      <v-flex xs10 offset-xs1>
        <div class="white elevation-2">
          <v-toolbar flat dense class="purple darken-3" dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
              <h1>Register</h1>
              <input
                type="text"
                name="email"
                v-model="email"
                placeholder="email" />
            <br>
              <input
                type="password"
                name="password"
                v-model="password"
                placeholder="password" />
            <br>
            <div class="error" v-html="error" />
            <br>
            <v-btn
                class="purple darken-3"
                @click="register">
                Register
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
  .error {
    color:red;
  }
</style>
