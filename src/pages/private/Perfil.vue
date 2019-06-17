<template>
  <q-page class="q-pa-md" :style="color">

    <q-btn style="margin: 20px;" color="primary" @click="$router.push('/user/playlists/' + otherUserId)" label="Playlists" />

    <q-btn style="margin: 20px;" color="primary" @click="$router.push('/user/seguidores/' + otherUserId)" label="Seguidores" />

    <q-btn style="margin: 20px;" color="primary" @click="$router.push('/user/seguidos/' + otherUserId)" label="Seguidos" />

    <q-btn v-if="otherUserId !== you" style="margin: 20px;" color="primary" @click="followUser" :label="'Seguir a ' + otherUserId " />


    <h3>Canciones de {{this.user.username}}</h3>
    <div v-if="!mySongs[0]">
      <h6>¡Ups! Este usuario aún no ha subido ninguna canción.</h6>
    </div>
    <!-- ---------------------------------------- -->
    <div class="row flex cancion" v-for="cancion in mySongs">
      <a  class="playButton"  @click="toogleSong(cancion.id)">
        <i class="material-icons underlineHover font-size55">
          {{isSongPlaying ? 'pause' : 'play_arrow'}}
        </i>
      </a>
      <div class="flex column justify-between">
        <div class="cancion-info">
          <a class="m-20 underlineHover"  @click="$router.push('/user/cancion/' + cancion.id)" color="primary">{{cancion.nombre}}</a>
          <a class="m-20 underlineHover"  @click="$router.push('/user/perfil/' + cancion.autor.username)" color="primary">{{cancion.autor.username}}</a>
        </div>
        <div class="cancion-opciones">

          <a class="underlineHover" @click="openDialog(cancion.id)">Comentar</a>

          <a @click="doLike(cancion.id)">
            <i class="material-icons likeHover font-size25">
              favorite
            </i>
          </a>

        </div>
      </div>
    </div>
    <!-- ---------------------------------------- -->

    <h3>Canciones favoritas</h3>
    <!-- ---------------------------------------- -->
    <div v-if="!likedSongs[0]">
      <h6>¡Ups! Aún no le gusta ninguna canción a este usuario.</h6>
    </div>
    <!-- ---------------------------------------- -->
    <div class="row flex cancion" v-for="cancion in likedSongs">
      <a  class="playButton"  @click="toogleSong(cancion.id)">
        <i class="material-icons underlineHover font-size55">
          {{isSongPlaying ? 'pause' : 'play_arrow'}}
        </i>
      </a>
      <div class="flex column justify-between">
        <div class="cancion-info">
          <a class="m-20 underlineHover"  @click="$router.push('/user/cancion/' + cancion.id)" color="primary">{{cancion.nombre}}</a>
          <a class="m-20 underlineHover"  @click="$router.push('/user/perfil/' + cancion.autor.username)" color="primary">{{cancion.autor.username}}</a>
        </div>
        <div class="cancion-opciones">

          <a class="underlineHover" @click="openDialog(cancion.id)">Comentar</a>

          <a style="color: red;" @click="doUnLike(cancion.id)">
            <i class="material-icons likeHover font-size25">
              favorite
            </i>
          </a>

        </div>
      </div>
    </div>
    <!-- ---------------------------------------- -->

    <!-- ---------------------------------------- -->
    <!-- INFO -->
    <!-- ---------------------------------------- -->
    <q-dialog v-model="seamless" seamless position="bottom">
      <q-card>

        <q-card-section class="row items-center no-wrap">
          <div class="text-weight-bold">{{infoText}}</div>
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>

      </q-card>
    </q-dialog>

  </q-page>
</template>

<style>
</style>

<script>
  import constants from '../../statics/js/configuration'


export default {
  name: 'Perfil',
  components: {},

  data () {
    return{
      isSongPlaying: false,
      songVolume: constants.DEFAULT_SONG_VOLUME,
      likedSongs: {},
      mySongs: {},
      user: {},
      color:"",
      comentario: "",
      comentarioDialog: false,
      actualSongId: "",
      otherUserId: "",
      you: "",
      seamless: false,
      infoText: "",

      toogleSong: (cancionId) => {
        this.$tools.toogleSong(cancionId, this.isSongPlaying, this);
        if (!this.isSongPlaying) {
          this.addOneRepro(cancionId);
        }
      },
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
      },
      addOneRepro: () => {
        this.$axios.put(constants.REST_API_URL + "/addNewRepro/" + this.actualSongId)
          .catch(error => console.error(error))
      },
      doUnLike: (cancionId) => {
        this.$tools.doUnLike(cancionId, this.user.username, this);
        this.seamless = true;
        this.infoText = "Ya no te gusta la canción.";
        setTimeout(() => this.seamless = false, 5000);
      },
    }
  },
  async beforeMount(){
    this.otherUserId = this.$route.params.userId;
    this.user = await this.$tools.getUserData(this.otherUserId, this);
    this.likedSongs = await this.$tools.getLikedSongs(this.user.username, this);
    this.mySongs = await this.$tools.getUserSongs(this.user.username, this);
    this.you = window.localStorage.getItem("user");
    this.color = this.$tools.randomColor();
  },
  watch: {
    async '$route' (to, from) {
      // react to route changes...
      this.otherUserId = to.params.userId;
      this.user = await this.$tools.getUserData(this.otherUserId, this);
      this.likedSongs = await this.$tools.getLikedSongs(this.user.username, this);
      this.mySongs = await this.$tools.getUserSongs(this.user.username, this);
      this.color = this.$tools.randomColor();
    }
  }
}
</script>
