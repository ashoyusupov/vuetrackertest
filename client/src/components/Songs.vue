<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout column>
      <v-flex xs10 offset-xs1>
        <panel title="Songs">
            <v-btn class="pink accent-2"
                @click="navigateTo({name: 'songs-create'})"
                slot="action"
                dark
                small
                absolute
                right
                middle
                fab>
                <v-icon>add</v-icon>
            </v-btn>
            <div
                class="song"
                v-for="song in songs"
                :key="song.id">
                <v-layout>
                  <v-flex xs6>
                    <div v-for="list in songlist" :key="list" :class="'song-' + [list]">
                        {{song[list]}}
                    </div>
                    <div class="song-artist">
                        {{song.artist}}
                    </div>
                    <div class="song-genre">
                        {{song.genre}}
                    </div>
                    <v-btn
                        dark
                        class="purple darken-3"
                        @click="navigateTo({
                            name: 'song',
                            params: {
                                songId: song.id
                            }
                        })">
                        View
                    </v-btn>
                  </v-flex>
                  <v-flex xs6>
                    <img class="album-image" :src="song.albumImageUrl" />
                  </v-flex>
                </v-layout>
            </div>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'

export default {
  components: {
    Panel
  },
  data () {
    return {
      songs: null,
      songlist: ['title', 'artist', 'genre', 'album', 'albumImageUrl', 'youtubeId', 'lyrics', 'tab']
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
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
