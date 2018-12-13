<template>
    <v-layout>
        <v-flex xs6>
            <panel :title=this.$route.params.tbl>
            <v-btn class="green accent-0"
                @click="create"
                slot="action"
                dark
                small
                absolute
                right
                middle
                fab>
                <v-icon>save</v-icon>
            </v-btn>
            <div
            v-for="(fld, key) in song"
            :key="key">
                <v-text-field
                required
                :rules="[required]"
                :label="fld.name"
                v-model="fld.Field"
                v-if="fld.type!=='datetime'"
                ></v-text-field>
                <v-menu
                    v-if="fld.type==='datetime'"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <v-text-field
                    slot="activator"
                    v-model="fld.Field"
                    :label="fld.name"
                    prepend-icon="event"
                    readonly
                    ></v-text-field>
                    <v-date-picker v-model="fld.Field"></v-date-picker>
                </v-menu>
            </div>
            </panel>
        </v-flex>

        <v-flex xs6>
            <div class="danger-alert" v-if="error">
                {{error}}
            </div>
            <v-btn
                dark
                class="purple darken-3"
                @click="navigateTo({name: `products`, params: { tbl: $route.params.tbl}})">
                Back
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
// import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
import ProductService from '@/services/ProductService'

export default {
  data () {
    return {
      song: null,
      error: null,
      required: (value) => !!value || 'Required.',
      menu2: false
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async create () {
      let datas = {}
      this.song.forEach(function (item, index, array) {
        datas[item.name] = item.Field
        // console.log(item)
      })

      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(datas)
        .every(key => !!datas[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill all the required fields!!!'
        return
      }
      try {
        await ProductService.create(this.$route.params.tbl, datas)
        this.$router.push({name: `products`, params: {tbl: this.$route.params.tbl}})
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted () {
    this.song = await ProductService.describe(this.$route.params.tbl)
    console.log(JSON.stringify(this.song))
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
</style>
