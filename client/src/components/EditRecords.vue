<template>
    <v-layout>
        <v-flex xs6>
            <panel :title=this.$route.params.tbl>
            <v-btn class="green accent-0"
                @click="update"
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
            v-for="(vals, key) in viewData"
            :key="key">
                <v-text-field
                required
                :rules="[required]"
                :label="vals.name"
                v-model="vals.val"
                v-if="vals.type!=='datetime'"
                ></v-text-field>
                <v-menu
                    v-if="vals.type==='datetime'"
                    :close-on-content-click="false"
                    v-model="menu2"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <v-text-field
                    slot="activator"
                    v-model="vals.val"
                    :label="vals.name"
                    prepend-icon="event"
                    readonly
                    ></v-text-field>
                    <v-date-picker
                    v-model="vals.val"
                    @input="menu2 = false"></v-date-picker>
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

function formatDate (date) {
  let d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export default {
  data () {
    return {
      song: null,
      viewData: null,
      error: null,
      required: (value) => !!value || 'Required.',
      menu2: false
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async update () {
      let table = this.$route.params.tbl
      let rowId = this.$route.params.id
      let user = this.$store.state.user
      let oldValues = await ProductService.get(table, rowId)
      let datas = {}
      let diff = []
      this.viewData.forEach(function (item, index, array) {
        datas[item.name] = item.val
        if (item.type === 'datetime') {
          if (formatDate(oldValues[item.name]) !== item.val) {
            diff.push({
              tbl: table,
              fld: item.name,
              indexvalue: rowId,
              value: formatDate(oldValues[item.name]),
              timestamp: Date.now() / 1000 | 0,
              userid: user.id
            })
          }
        } else {
          if (oldValues[item.name] !== item.val) {
            diff.push({
              tbl: table,
              fld: item.name,
              indexvalue: rowId,
              value: oldValues[item.name],
              timestamp: Date.now() / 1000 | 0,
              userid: user.id
            })
          }
        }
      })
      console.log(datas)
      console.log(diff)
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(datas)
        .every(key => !!datas[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill all the required fields!!!'
        return
      }
      try {
        await ProductService.update(this.$route.params.tbl, this.$route.params.id, datas)
        await ProductService.createBulk(`cellrevisions`, diff)
        this.$router.push({name: `products`, params: {tbl: this.$route.params.tbl}})
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted () {
    let values = await ProductService.get(this.$route.params.tbl, this.$route.params.id)
    let dscrb = await ProductService.dscrb(this.$route.params.tbl, this.$route.params.id)
    let newDsc = []
    for (let i in dscrb) {
      let retval
      if (dscrb[i].Type === 'datetime') {
        retval = formatDate(values[dscrb[i].Field])
      } else {
        retval = values[dscrb[i].Field]
      }
      newDsc.push({name: dscrb[i].Field, label: dscrb[i].Field, index: dscrb[i].Field, width: 100, type: dscrb[i].Type, val: retval})
    }

    this.viewData = newDsc
    let datas = {}
    this.viewData.forEach(function (item, index, array) {
      datas[item.name] = item.val
    })
    console.log(datas)
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
</style>
