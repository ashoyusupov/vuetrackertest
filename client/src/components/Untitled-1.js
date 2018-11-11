<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout column>
      <v-flex xs10 offset-xs1>
        <panel title='Grid'>
          <table id='grid1'></table>
          <div id="pager"></div>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import 'css/jquery-ui.min.css'
import 'css/ui.jqgrid.min.css'
import $ from 'jquery'
import 'free-jqgrid'
import Panel from '@/components/Panel'

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
    Panel
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
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  mounted: function () {
    const windowHeight = $(window).height()

    const headerHeight = $('header').height()

    const pagerHeight = 25

    const gridTitleHeight = 22 + 150

    const gridTableHeight =
      windowHeight - headerHeight - pagerHeight - gridTitleHeight

    const jsFields = [
      { name: 'SITE_ID', label: 'SITE_ID', index: 'SITE_ID', width: 90 },
      { name: 'status', label: 'status', index: 'status', width: 90 },
      { name: 'ADDRESS', label: 'ADDRESS', index: 'ADDRESS', width: 90 },
      { name: 'ONAIRDATE', label: 'ONAIRDATE', index: 'ONAIRDATE', width: 90 },
      {
        name: 'INTEGRATION_DATE',
        label: 'INTEGRATION_DATE',
        index: 'INTEGRATION_DATE',
        width: 90
      },
      { name: 'SITEGTYPE', label: 'SITEGTYPE', index: 'SITEGTYPE', width: 90 },
      { name: 'BSC', label: 'BSC', index: 'BSC', width: 90 },
      { name: 'VENDOR', label: 'VENDOR', index: 'VENDOR', width: 90 },
      { name: 'SWS_SUBCO', label: 'SWS_SUBCO', index: 'SWS_SUBCO', width: 90 },
      { name: 'REGION', label: 'REGION', index: 'REGION', width: 90 },
      { name: 'PHASE', label: 'PHASE', index: 'PHASE', width: 90 },
      { name: 'LONGITUDE', label: 'LONGITUDE', index: 'LONGITUDE', width: 90 },
      { name: 'LATITUDE', label: 'LATITUDE', index: 'LATITUDE', width: 90 },
      { name: 'CITY', label: 'CITY', index: 'CITY', width: 90 },
      {
        name: 'COLOCATION',
        label: 'COLOCATION',
        index: 'COLOCATION',
        width: 90
      },
      {
        name: 'REGION_ADDRESS',
        label: 'REGION_ADDRESS',
        index: 'REGION_ADDRESS',
        width: 90
      },
      {
        name: 'CITY_ADDRESS',
        label: 'CITY_ADDRESS',
        index: 'CITY_ADDRESS',
        width: 90
      },
      { name: 'DISTRICT', label: 'DISTRICT', index: 'DISTRICT', width: 90 },
      { name: 'VILLAGE', label: 'VILLAGE', index: 'VILLAGE', width: 90 },
      { name: 'STREET', label: 'STREET', index: 'STREET', width: 90 },
      {
        name: 'LOCATION_TYPE',
        label: 'LOCATION_TYPE',
        index: 'LOCATION_TYPE',
        width: 90
      },
      {
        name: 'STATUS_DATE',
        label: 'STATUS_DATE',
        index: 'STATUS_DATE',
        width: 90
      },
      {
        name: 'PA_by_UCELL',
        label: 'PA_by_UCELL',
        index: 'PA_by_UCELL',
        width: 90
      },
      {
        name: 'Technical_FA',
        label: 'Technical_FA',
        index: 'Technical_FA',
        width: 90
      }
    ]

    $('#grid1')
      .jqGrid({
        url: 'http://localhost:3000/api/statustable',

        mtype: 'get',

        datatype: 'json',

        colModel: jsFields,

        page: 1,

        loadonce: true,

        forceClientSorting: true,

        rownumbers: true,

        rowList: [100, 200, 300],

        sortname: 'SITE_ID',

        autowidth: true,

        height: gridTableHeight,

        sortorder: 'asc',

        jsonReader: { repeatitems: false, _primary_column_name: '0' },

        shrinkToFit: false,

        scroll: 'true',

        emptyrecords: 'Scroll to bottom to retrieve new page',

        scrollPopUp: true,

        scrollLeftOffset: '83%',

        gridview: true,

        autoencode: false,

        cellLayout: 0,

        toppager: true,

        pager: true,

        rowNum: 5,

        viewrecords: true,

        prmNames: {page: '_p', rows: '_size', sort: 'sidx', order: 'sord', search: '_search', nd: 'nd', id: 'id', oper: 'oper', editoper: 'edit', addoper: 'add', deloper: 'del', subgridid: 'id', npage: null, totalrows: 'totalrows'},

        loadui: 'block',

        loadComplete: function () {
          resizeElements()

          gridTableAfterLoad()

          $($('#grid tr').find('td:gt(2)')).addClass('cell')

          $($('table.ui-search-table').find('td.ui-search-input')).addClass(
            'md-input-wrapper'
          )

          $(
            $('table.ui-search-table').find('input.ui-widget-content')
          ).addClass('md-form-control')

          $($('table.ui-search-table').find('td.ui-search-input')).each(
            function () {
              $(this).append('<span class="md-line"></span>')
            }
          )

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
        },

        caption: 'table'
      })
      .jqGrid('filterToolbar')

    $('#grid1').jqGrid(
      'navGrid',
      '#pager',
      {add: false, edit: false, del: false, search: true, refresh: true},
      {},
      {},
      {},
      {multipleSearch: true, multipleGroup: true, showQuery: true})
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
