<template>
  <v-layout column>
    <v-flex xs10 fill-height>
      <panel-wide :title=this.$route.params.tbl>
        <table id='grid1'></table>
        <div id="gridpager"/>
      </panel-wide>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductService from '@/services/ProductService'
import PanelWide from '@/components/PanelWide'
import 'css/jquery-ui.min.css'
import 'css/ui.jqgrid.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'css/jquery-ui.structure.min.css'
import 'css/jquery-ui.theme.min.css'
import $ from 'jquery'
import 'css/jquery-ui.min.js'
import 'css/jquery.jqgrid.min.js'

function gridTableAfterLoad () {
  const gridRowCount = $('#grid').jqGrid('getGridParam', 'records')
  $('#find_rows_count').html(gridRowCount)
}
function resizeElements () {
  const windowHeight = $(window).height()

  const headerHeight = $('header').height()

  const pagerHeight = 25

  const gridTitleHeight = 22 + 150

  const gridTableHeight =
    windowHeight - headerHeight - pagerHeight - gridTitleHeight
  return gridTableHeight
}

export default {
  components: {
    PanelWide
  },
  data () {
    return {
      songs: null,
      songlist: [
        'title',
        'artist',
        'genre',
        'album',
        'albumImageUrl',
        'youtubeId',
        'lyrics',
        'tab'
      ]
    }
  },
  watch: {
    '$route.params.tbl': function (tbl) {
      this.doStuff(tbl)
    }
  },
  created: function () {
    this.doStuff(this.$route.params.tbl)
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async doStuff (tbl) {
      $('#grid1').jqGrid('GridUnload')
      const windowHeight = $(window).height()
      const headerHeight = $('header').height()
      const pagerHeight = 25
      const gridTitleHeight = 22 + 150
      const gridTableHeight = windowHeight - headerHeight - pagerHeight - gridTitleHeight
      const jsFieldsX = await ProductService.describe(tbl)

      await $('#grid1').jqGrid({
        colModel: jsFieldsX,
        url: 'http://localhost:3000/api/' + tbl,
        mtype: 'get',
        datatype: 'json',
        sortname: 'SITE_ID',
        id: 'SITE_ID',
        sortorder: 'asc',
        threeStateSort: true,
        sortIconsBeforeText: true,
        headertitles: true,
        pager: $('#gridpager'),
        rowNum: 25,
        rownumWidth: 40,
        rowList: [25, 50, 100, 200, 500, 1000, 10000],
        viewrecords: true,
        gridview: true,
        autoencode: true,
        rownumbers: true,
        shrinkToFit: false,
        autowidth: true,
        height: gridTableHeight,
        postData: {
          '_sort': function () {
            return (($('#grid1').jqGrid('getGridParam', 'postData')['sord'] === 'desc') ? '-' : '') + $('#grid1').jqGrid('getGridParam', 'postData')['sidx']
          },
          '_where': function () {
            let pstData = $('#grid1').jqGrid('getGridParam', 'postData')
            let cFilter = []
            jsFieldsX.forEach(function (rowdata, index) {
              if (typeof pstData[rowdata.name] !== 'undefined') {
                cFilter.push('(' + rowdata.name + ',like,~' + pstData[rowdata.name] + '~)')
              }
            })
            return cFilter.join('~and')
          }
        },
        prmNames: {page: '_p', rows: '_size', order: 'sord', search: '_search', nd: 'nd', id: 'id', oper: 'oper', editoper: 'edit', addoper: 'add', deloper: 'del', subgridid: 'id', npage: null, totalrows: 'totalrows'},
        loadComplete: function () {
          resizeElements()
          gridTableAfterLoad()
          $($('#grid1 tr').find('td:gt(1)')).addClass('ASFJKL')
          const grid = $('.ui-jqgrid-btable:visible')
          if (grid) {
            grid.each(function (index) {
              const gridId = $(this).attr('id')
              const gridParentWidth = $('#gbox_' + gridId)
                .parent()
                .width()
              $('#' + gridId).setGridWidth(gridParentWidth)
            })
          }
        }
      }).jqGrid('filterToolbar')
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
