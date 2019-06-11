<template>
  <q-page class="flex column">
    <div class="flex flex-center"><h1>Buscador</h1></div>
    <div class="row justify-around" style="padding: 0 20px;padding-bottom:20px;">
      <div class="col-9">
        <h2>Búsqueda</h2>
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
      <div class="col-3">
        <h3 class="menu-lateral">Filtro</h3>
        <div class="flex column menu-lateral">
          <span id="todo">Todo</span>
          <span id="usuario">Usuario</span>
          <span id="cancion">Cancion</span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
  export default {
    name: 'Buscador',
    data () {
      return {
        isSongPlaying: false,
        songVolume: constants.DEFAULT_SONG_VOLUME,
        canciones: {},
        user: {},
        comentario: "",
        comentarioDialog: false,
        actualSongId: ""
      }
    }
  }

</script>
