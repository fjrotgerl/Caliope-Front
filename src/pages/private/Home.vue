<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="flex column">


    <div class="row justify-around" style="padding: 0 20px;padding-bottom:20px;">
      <div class="col-9">
        <h2>Feed</h2>
        <div class="flex column justify-between">

          <!-- ---------------------------------------- -->
          <div class="row flex cancion" v-for="cancion in canciones">
            <q-btn @click="toogleSong" :icon="isSongPlaying ? 'pause' : 'play_arrow'" color="primary" style="margin-right: 20px;"></q-btn>
            <div class="flex column justify-between" style="width:90%;">
              <div class="flex row justify-around">
                <span>{{cancion.nombre}}</span>
                <span>{{cancion.autor.username}}</span>
              </div>
              <div>
                <q-btn @click="doComment" label="Comentar" color="primary" style="margin-right: 20px;"></q-btn>
                <q-btn @click="doLike(cancion.id)" icon="favorite" color="primary" style="margin-right: 20px;"></q-btn>
              </div>
            </div>
          </div>
          <!-- ---------------------------------------- -->

        </div>
      </div>
    </div>

  </q-page>
</template>

<style>
</style>

<script>
  import audioPlayer from '../../statics/js/audioPlayer'
  import constants from '../../statics/js/configuration'

export default {
  name: 'Home',
  data () {
    return {
      isSongPlaying: false,
      songVolume: constants.DEFAULT_SONG_VOLUME,
      canciones: {},
      user: {},

      toogleSong: () => {
        audioPlayer.toogle();
        this.isSongPlaying = audioPlayer.getSongStatus();
      },
      stopSong: () => {
        if (audioPlayer.getSongStatus()) {
          audioPlayer.stop();
          this.isSongPlaying = false;
          audioPlayer.setSongStatus(false);
        }
      },
      doLike: (cancionId) => {
        this.$axios.put(constants.REST_API_URL + "/addSongToLikedList/" + cancionId + "/" + this.user.username)
          .then(response => {
            console.log(response);
            console.log("HAS DADO LIEK!");
          })
          .catch(error => console.error(error))
      },
      doComment: () => {
        console.log("Acabas de comentar tal!");
      },
      getAllSongs: () => {
        this.$axios.get(constants.REST_API_URL + "/getCanciones")
          .then(response => {
            this.canciones = response.data;
            console.log(this.canciones);
          })
          .catch(error => console.error(error))
      },
      getUserData: () => {
        let userId = localStorage.getItem("user");
        this.$axios.get(constants.REST_API_URL + "/getUsuarioById/" + userId)
          .then(response => {
            console.log(response);
            this.user = response.data;
          });
      }
    }
  },
  methods: {


  },
  beforeMount(){
    this.getAllSongs();
    this.getUserData();
  },
}
</script>
