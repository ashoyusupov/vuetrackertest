<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout column>
      <v-flex xs10 offset-xs1>
        <panel title="Register">
          <form
            name="vue-tracker-form"
            autocomplete="off">
            <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
          <br>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              autocomplete="new-password"
            ></v-text-field>
          <br>
          <v-select
            item-text="name"
            item-value="id"
            v-model="group"
            :items="groups"
            label="Group"
          ></v-select>
          </form>
          <br>
          <div class="error" v-html="error" />
          <br>
          <v-btn
            dark
            class="purple darken-3"
            @click="register">
            Register
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
      group: '',
      groups: null,
      error: null,
      notification: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          group: this.group
        })
        this.notification = response.data.token
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  async mounted () {
    this.groups = (await AuthenticationService.getAll()).data
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
