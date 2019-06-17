<template>
  <q-page class="flex column" :style="color">
    <div class="flex flex-center"><h1>Buscador</h1></div>
    <div class="row justify-around" style="padding: 0 20px;padding-bottom:20px;">
      <div class="col-9">
        <h2>Búsqueda</h2>
        <div class="flex column justify-between">

          <!-- Canciones-->
          <div v-if="finderSong">
            <h3>Canciones</h3>
            <div  class="row flex cancion" v-for="cancion in canciones">
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

          <!-- Usuarios-->
          <div v-if="finderUser">
            <h3>Usuarios</h3>

            <div v-for="usuario in usuariosEncontrados" class="q-pa-md float-left" style="width: 300px;">
              <q-card @click="$router.push('/user/perfil/' + usuario.username)" class="my-card usuarioHover container">
                <img src="../../assets/usuario_icono.png" style="height: 150px;width:auto;margin:0 auto;padding: 5px 0">

                <q-card-section style="background-color: mediumslateblue;">
                  <div class="text-h5 text-align-center">{{usuario.username}}</div>
                  <div class="text-h6 text-align-center">{{usuario.nombre + " " + usuario.apellidos}}</div>
                </q-card-section>
                <div class="overlay">
                  <i class="icon material-icons underlineHover font-size55">visibility</i>
                </div>
              </q-card>
            </div>

          </div>



        </div>
      </div>
      <div class="col-3">
        <h3 class="menu-lateral">Filtro</h3>
        <div class="flex column menu-lateral">
          <span id="todo" @click="finderUser = true; finderSong = true;">Todo</span>
          <span id="usuario" @click="finderUser = true; finderSong = false;">Usuario</span>
          <span id="cancion" @click="finderUser = false; finderSong = true;">Cancion</span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>

  import constants from '../../statics/js/configuration'

  export default {
    name: 'Buscador',
    data () {
      return {
        isSongPlaying: false,
        songVolume: constants.DEFAULT_SONG_VOLUME,
        canciones: "",
        usuariosEncontrados: "",
        user: {},
        color:"",
        comentario: "",
        comentarioDialog: false,
        actualSongId: "",
        // Activa / desactiva que estas buscando
        finderUser: true,
        finderSong: true,
        finderData: "",
        finder: async () => {
          console.log(1);
          console.log(this.finderData);
          await this.$axios.get(constants.REST_API_URL + "/getSongsThatContains/" + this.finderData)
            .then(response => {
              if (response.data === "" || response.data.length === 0) { return; }
              this.canciones = response.data;
            });
          await this.$axios.get(constants.REST_API_URL + "/getUserThatContains/" + this.finderData)
            .then(response => {
              if (response.data === "" || response.data.length === 0) { return; }
              this.usuariosEncontrados = response.data;
            });
        },
        checkData: () => {
          if (this.canciones === "" ) {
            this.finderSong = false;
          } else { this.finderSong = true; }
          if (this.usuariosEncontrados === "") {
            this.finderUser = false;
          } else { this.finderUser = true; }
        }
      }
    },
    async beforeMount(){
      this.finderData = this.$route.params.data;
      await this.finder();
      await this.checkData();
      this.color = this.$tools.randomColor();

    },
    watch: {
      async '$route'(to, from) {
        this.canciones = "";
        this.finderUser = "";
        this.finderData = await to.params.data;
        await this.finder();
        await this.checkData();
        this.color = this.$tools.randomColor();
      }
    }
  }

</script>
