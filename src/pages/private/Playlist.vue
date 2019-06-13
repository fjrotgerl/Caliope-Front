<template>
  <q-page class="flex column">
    <div class="flex flex-center"><h1>Nombre Playlist</h1></div>
    <div class="col-12">
      <h2 class="text-align-center">Canciones</h2>
      <div class="flex column justify-between">
        <div class="row flex cancion">
          <q-btn icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
          <div class="flex column justify-between" style="width:90%;">
            <div class="flex row justify-around">
              <span>Nombre Canción</span>
              <span>Nombre Autor</span>
            </div>
            <div class="flex row justify-around">
              <span>Comentar</span>
              <span>Me gusta</span>
              <span>...</span>
            </div>
          </div>
        </div>
        <div class="row flex cancion" v-for="cancion in canciones_playlist">
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
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Playlist',
  data () {
    return {
      canciones_playlist: {}
    }
  },
  async beforeMount(){
    this.canciones_playlist = await this.$tools.getCancionesPlaylists(this);
  }
}
</script>
