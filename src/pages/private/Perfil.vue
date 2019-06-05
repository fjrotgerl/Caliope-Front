<template>
  <q-page class="q-pa-md">

    <q-btn style="margin: 20px;" color="primary" @click="$router.push('/user/seguidores')" label="Seguidores" />

    <q-btn style="margin: 20px;" color="primary" @click="$router.push('/user/seguidos')" label="Seguidos" />

    <q-btn v-if="otherUserId !== you" style="margin: 20px;" color="primary" @click="followUser" :label="'Seguir a ' + otherUserId " />


    <h3>Canciones de {{this.user.username}}</h3>
    <!-- ---------------------------------------- -->
    <div class="row flex cancion" v-for="cancion in mySongs">
      <q-btn @click="toogleSong(cancion.id)" :icon="isSongPlaying ? 'pause' : 'play_arrow'" color="primary" style="margin-right: 20px;"></q-btn>
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
      <q-btn @click="toogleSong(cancion.id)" :icon="isSongPlaying ? 'pause' : 'play_arrow'" color="primary" style="margin-right: 20px;"></q-btn>
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
      comentario: "",
      comentarioDialog: false,
      actualSongId: "",
      otherUserId: "",
      you: "",

      toogleSong: (cancionId) => this.$tools.toogleSong(cancionId, this.isSongPlaying, this),
      stopSong: () => this.$tools.stopSong(this.isSongPlaying),
      doLike: (cancionId) => this.$tools.doLike(cancionId, this.user.username, this),
      doComment: () => this.$tools.doComment(this.comentarioDialog, this.user.username, this.actualSongId, this.comentario, this),
      openDialog: (cancionId) => {
        this.comentarioDialog = true;
        this.comentario = "";
        this.actualSongId = cancionId;
      },
      followUser: () => {
        this.$axios.put(constants.REST_API_URL + "/followUser/" + this.user.username + "/" + this.you)
          .catch(error => console.error(error));
      }
    }
  },
  async beforeMount(){
    this.otherUserId = this.$route.params.userId;
    this.user = await this.$tools.getUserData(this.otherUserId, this);
    this.likedSongs = await this.$tools.getLikedSongs(this.user.username, this);
    this.mySongs = await this.$tools.getUserSongs(this.user.username, this);
    this.you = window.localStorage.getItem("user");
  },
  watch: {
    async '$route' (to, from) {
      // react to route changes...
      this.otherUserId = to.params.userId;
      this.user = await this.$tools.getUserData(this.otherUserId, this);
      this.likedSongs = await this.$tools.getLikedSongs(this.user.username, this);
      this.mySongs = await this.$tools.getUserSongs(this.user.username, this);
    }
  }
}
</script>
