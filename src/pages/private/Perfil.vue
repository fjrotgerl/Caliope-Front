<template>
  <q-page class="q-pa-md">

    <q-btn style="margin: 20px;" color="primary" @click="$router.push('/user/seguidores')" label="Seguidores" />

    <q-btn style="margin: 20px;" color="primary" @click="$router.push('/user/seguidos')" label="Seguidos" />

    <h3>Tus canciones</h3>
    <!-- ---------------------------------------- -->
    <div class="row flex cancion" v-for="cancion in mySongs">
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

    <h3>Canciones que te gustan</h3>
    <!-- ---------------------------------------- -->
    <div class="row flex cancion" v-for="cancion in likedSongs">
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

  </q-page>
</template>

<style>
</style>

<script>
  import audioPlayer from '../../statics/js/audioPlayer'
  import constants from '../../statics/js/configuration'


export default {
  name: 'Perfil',
  data () {
    return{
      isSongPlaying: false,
      songVolume: constants.DEFAULT_SONG_VOLUME,
      likedSongs: {},
      mySongs: {},
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
      getLikedSongs: async () => {
        await this.$axios.get(constants.REST_API_URL + "/getLikedSongsByUserId/" + this.user.username)
          .then(response => {
            this.likedSongs = response.data;
          })
          .catch(error => console.error(error))
      },
      getUserSongs: async () => {
        await this.$axios.get(constants.REST_API_URL + "/getSongsFromUser/" + this.user.username)
          .then(response => {
            this.mySongs = response.data;
          })
          .catch(error => console.error(error))
      },
      getUserData: async () => {
        let userId = localStorage.getItem("user");
        await this.$axios.get(constants.REST_API_URL + "/getUsuarioById/" + userId)
          .then(response => {
            console.log(response);
            this.user = response.data;
          });
      }
    }
  },
  async beforeMount(){
    await this.getUserData();
    await this.getLikedSongs();
    await this.getUserSongs();

  },
}
</script>
