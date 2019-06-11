<template>
  <q-page class="flex column">
    <div style="width: 80%;margin: 0 auto;">
      <q-card class="my-card bg-purple text-white text-align-center">
        <q-card-section>
          <div class="text-h2">{{this.cancionActual.nombre}}</div>
          <div class="text-subtitle2">{{this.cancionActual.autor.username}}</div>
        </q-card-section>

        <q-card-actions class="flex-center">
          <q-btn @click="toogleSong(idCancionActual)" icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
          <q-btn flat>Comentar</q-btn>
          <q-btn flat>Me gusta</q-btn>
        </q-card-actions>
      </q-card>
        <div class="flex row justify-between">
            <span>Genero: {{this.cancionActual.genero.nombre}}</span>
            <span>Reproducciones: 0</span>
            <span>Duracion: 0:00</span>
            <span>Fecha subida: XX/XX/XXXX</span>
        </div>
    </div>
    <div style="width: 80%;margin: 0 auto;" class="flex column justify-between">
      <h2 style="background-color: cornflowerblue">COMENTARIOS</h2>

      <!-- ---------------------------------------- -->
      <!-- COMENTARIOS -->
      <!-- ---------------------------------------- -->
      <div v-for="comentario in comentarios"  class="flex row" style="margin-bottom: 5%">
        <q-btn @click="$router.push('/user/perfil/' + comentario.usuario.username)" icon="person" color="primary" style="margin-right: 20px;"></q-btn>
        <div class="flex column justify-between" style="width:90%;">
          <span>{{comentario.usuario.username}}</span>
          <p>{{comentario.mensaje}}</p>
        </div>
      </div>
      <!-- ---------------------------------------- -->

    </div>
  </q-page>
</template>

<script>
  import constants from '../../statics/js/configuration'

  export default {
    name: 'Cancion',
    data () {
      return {
        idCancionActual: "",
        cancionActual: {
          autor: { }
        },
        comentarios: {},
        getCancion: () => {
          this.$axios.get(constants.REST_API_URL + "/getCancionById/" + this.idCancionActual)
            .then(response => {
              this.cancionActual = response.data;
            })
            .catch(error => console.error(error))
        },
        getComentarios: () => {
          console.log(this.idCancionActual);
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
