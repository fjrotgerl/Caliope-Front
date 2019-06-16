<template>
  <q-page class="flex column" :style="color">
    <div style="width: 80%;margin: 0 auto;">
      <q-card class="my-card bg-purple text-white text-align-center">
        <q-card-section>
          <div class="text-h2">{{cancionActual.nombre}}</div>
          <div class="text-subtitle2">{{cancionActual.autor.username}}</div>
        </q-card-section>

        <q-card-actions class="flex-center">
          <q-btn @click="toogleSong(idCancionActual)" icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
          <q-btn flat>Comentar</q-btn>
          <q-btn flat>Me gusta</q-btn>
        </q-card-actions>
      </q-card>
        <div class="flex row justify-between">
            <span>Genero: {{cancionActual.genero.nombre}}</span>
            <span>Reproducciones: {{cancionActual.reproducciones}}</span>
            <span>Duracion: 0</span>
            <span>Fecha subida: {{moment(cancionActual.fechaRegistro)}}</span>
        </div>
    </div>
    <div style="width: 80%;margin: 0 auto;" class="flex column justify-between">
      <h2 style="color:white;" class="text-align-center">COMENTARIOS</h2>

      <!-- ---------------------------------------- -->
      <!-- COMENTARIOS -->
      <!-- ---------------------------------------- -->
      <div v-for="comentario in comentarios"  class="flex row" style="margin-bottom: 5%">
        <q-btn @click="$router.push('/user/perfil/' + comentario.usuario.username)" icon="person" color="primary" style="margin-right: 20px;"></q-btn>
        <div class="flex column justify-between" style="width:90%;">
          <h5 style="margin:0;">{{comentario.usuario.username}}</h5>
          <p>{{comentario.mensaje}}</p>
        </div>
      </div>
      <!-- ---------------------------------------- -->
    </div>
  </q-page>
</template>

<script>
  import constants from '../../statics/js/configuration'
  import moment from 'moment'

  export default {
    name: 'Cancion',
    data () {
      return {
        color:"",
        idCancionActual: "",
        cancionActual: {
          nombre: "",
          autor: { },
          genero: { },

        },
        moment: (fecha) => { return moment(fecha).format(constants.DATE_FORMAT) },
        comentarios: {},
        getCancion: () => {
          this.$axios.get(constants.REST_API_URL + "/getCancionById/" + this.idCancionActual)
            .then(response => {
              this.cancionActual = response.data;

            })
            .catch(error => console.error(error))
        },
        getComentarios: () => {
          this.$axios.get(constants.REST_API_URL + "/getComentariosFromCancion/" + this.idCancionActual)
            .then(response => {
              this.comentarios = response.data;

            })
            .catch(error => console.error(error));
        },
        toogleSong: (cancionId) => this.$tools.toogleSong(cancionId, this.isSongPlaying, this),
      }
    },
    async beforeMount(){
      this.idCancionActual = this.$route.params.cancionId;
      await this.getComentarios();
      await this.getCancion();
      this.color = this.$tools.randomColor();
    },
    watch: {
      async '$route'(to, from) {
        // react to route changes...
        this.idCancionActual = to.params.cancionId;
      }
    }
  }
</script>

<style scoped>

</style>
