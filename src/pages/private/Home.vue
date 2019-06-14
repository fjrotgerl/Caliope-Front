<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <q-page class="flex column bg-blue-gradient">

    <div class="row justify-around" style="padding: 0 20px;padding-bottom:20px;">
      <div class="col-9">
        <h2 >Feed</h2>
        <div class="flex column justify-between">

          <!-- ---------------------------------------- -->
          <!-- CANCIONES -->
          <!-- ---------------------------------------- -->
          <div class="row flex cancion" v-for="cancion in canciones">
            <a  class="playButton"  @click="toogleSong(cancion.id, songPlaying)">
              <i class="material-icons underlineHover font-size55" :ref="cancion.id">play_arrow</i>
            </a>
            <div class="flex column justify-between">
              <div class="cancion-info">
                <a class="m-20 underlineHover"  @click="$router.push('/user/cancion/' + cancion.id)" color="primary">{{cancion.nombre}}</a>
                <p> - </p>
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




          <!-- ---------------------------------------- -->
          <!-- MODAL AÑADIR COMENTARIO -->
          <!-- ---------------------------------------- -->
          <q-dialog v-model="comentarioDialog" persistent>
            <q-card style="min-width: 400px">
              <q-card-section>
                <div class="text-h6">Escribe tu comentario</div>
              </q-card-section>

              <q-card-section>
                <q-input dense v-model="comentario" autofocus @keyup.enter="comentarioDialog = false" />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancelar" v-close-popup />
                <q-btn flat label="Añadir comentario" @click="doComment" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- ---------------------------------------- -->

        </div>
      </div>
    </div>

  </q-page>
</template>

<style>
</style>

<script>
  import constants from '../../statics/js/configuration'
  import audioPlayer from "../../statics/js/audioPlayer";

export default {
  name: 'Home',
  data () {
    return {
      isSongPlaying: false,
      songVolume: constants.DEFAULT_SONG_VOLUME,
      canciones: {},
      user: {},
      comentario: "",
      comentarioDialog: false,
      actualSongId: "",
      actualIcon: "play_arrow",
      // Aquí se guarda la referencia a la cancion que este sonando
      // Para que cuando se haga play en otra, esta se pare
      songPlaying: "",

      toogleSong: async (cancionId, songPlaying) => {

        // Entra si ya hay una cancion reproduciendose y es diferente a la que este sonando actualmente
        if (this.isSongPlaying && songPlaying !== cancionId) {
          // Paramos la cancion anterior y cambiamos el icono
          let refs = this.$refs;
          let oldSong = refs[this.songPlaying];
          oldSong[0].innerHTML = 'play_arrow';
          this.isSongPlaying = false;
          await audioPlayer.setSongStatus(false);
          await audioPlayer.stop();
        }


        this.songPlaying = cancionId;
        let refs = this.$refs;
        let actualSong = refs[cancionId];
        actualSong[0].innerHTML = this.isSongPlaying ? 'play_arrow' : 'pause';

        this.isSongPlaying = await !audioPlayer.getSongStatus();
        await this.$tools.toogleSong(cancionId, this.isSongPlaying, this);
        if (!this.isSongPlaying) {
          await this.addOneRepro(cancionId);
        }

      },
      stopSong: () => this.$tools.stopSong(this.isSongPlaying),
      doLike: (cancionId) => this.$tools.doLike(cancionId, this.user.username, this),
      openDialog: (cancionId) => {
        this.comentarioDialog = true;
        this.comentario = "";
        this.actualSongId = cancionId;
      },
      doComment: () => this.$tools.doComment(this.comentarioDialog, this.user.username, this.actualSongId, this.comentario, this),
      addOneRepro: (cancionId) => {
        this.$axios.put(constants.REST_API_URL + "/addNewRepro/" + cancionId)
          .catch(error => console.error(error))
      }
    }
  },
  async beforeMount(){
    this.user = await this.$tools.getUserData(localStorage.getItem("user"), this);
    this.canciones = await this.$tools.getAllSongs(this);
  },
}
</script>
