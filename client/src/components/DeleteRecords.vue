<template>
    <v-layout>
        <v-flex xs4>
        </v-flex>

        <v-flex xs8>
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
      viewData: null,
      error: null,
      required: (value) => !!value || 'Required.',
      menu2: false
    }
  },
  async mounted () {
    const res = await this.$confirm('Do you really want to delete it?', {
      title: 'Warning',
      color: 'red',
      icon: 'warning'
    })
    if (res) {
      try {
        await ProductService.delete(this.$route.params.tbl, this.$route.params.id)
        this.$router.push({name: `products`, params: {tbl: this.$route.params.tbl}})
      } catch (err) {
        console.log(err)
      }
    } else {
      this.$router.push({name: `products`, params: {tbl: this.$route.params.tbl}})
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
</style>
