<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="flex column">


    <div class="row justify-around" style="padding: 0 20px;padding-bottom:20px;">
      <div class="col-9">
        <h2 >Feed</h2>
        <div class="flex column justify-between">

          <!-- ---------------------------------------- -->
          <!-- CANCIONES -->
          <!-- ---------------------------------------- -->
          <div class="row flex cancion" v-for="cancion in canciones">
            <q-btn @click="toogleSong(cancion.id)" :icon="isSongPlaying ? 'pause' : 'play_arrow'" color="primary" style="margin-right: 20px;"></q-btn>
            <div class="flex column justify-between" style="width:90%;">
              <div class="flex row justify-around">
                <q-btn color="primary" :label="cancion.nombre" />
                <q-btn color="primary" :label="cancion.autor.username" />
              </div>
              <div>
                <q-btn @click="openDialog(cancion.id)" label="Comentar" color="primary" style="margin-right: 20px;"></q-btn>
                <q-btn @click="doLike(cancion.id)" icon="favorite" color="primary" style="margin-right: 20px;"></q-btn>
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

      toogleSong: (cancionId) => this.$tools.toogleSong(cancionId, this.isSongPlaying, this),
      stopSong: () => this.$tools.stopSong(this.isSongPlaying),
      doLike: (cancionId) => this.$tools.doLike(cancionId, this.user.username, this),
      openDialog: (cancionId) => {
        this.comentarioDialog = true;
        this.comentario = "";
        this.actualSongId = cancionId;
      },
      doComment: () => this.$tools.doComment(this.comentarioDialog, this.user.username, this.actualSongId, this.comentario, this),
    }
  },
  methods: {


  },
  async beforeMount(){
    this.user = await this.$tools.getUserData(localStorage.getItem("user"), this);
    this.canciones = await this.$tools.getAllSongs(this);
  },
}
</script>
