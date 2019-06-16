<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="flex column" :style="color">

    <div class="row justify-around" style="padding: 0 20px;padding-bottom:20px;">
      <div class="col-9">
        <h2>Canciones del momento</h2>
        <div class="flex column justify-between">
          <div class="row flex cancion" v-for="cancion in canciones">
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
        </div>
      </div>
      <div class="col-3" style="margin-top: 3%;">
        <h2 class="menu-lateral">Playlists para ti</h2>
        <div class="flex column menu-lateral">
          <div class="flex flex-center row justify-around" v-for="playlist in playlists" style="margin-right: 5%;margin-bottom:5%;">
            <q-btn icon="play_arrow" color="primary"></q-btn>
            <div class="flex column">
              <p>{{playlist.nombre}}</p>
              <p>{{playlist.dueño.username}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </q-page>
</template>

<style>
</style>

<script>
  export default {
    name: 'Descubrir',
    data () {
      return {
        canciones: {},
        user:{},
        playlists:{},
        color:""
      }
    },
    async beforeMount(){
      this.user = await this.$tools.getUserData(localStorage.getItem("user"), this);
      this.canciones = await this.$tools.getAllSongs(this);
      this.playlists = await this.$tools.getPlaylists(this);
      this.color = this.$tools.randomColor();
    }
  }
</script>
