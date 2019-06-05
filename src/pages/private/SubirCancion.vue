<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="">

    <h2>Sube tu canción</h2>

    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-uploader
          :factory="fileUpload"
          label="Solo .mp3"
          accept=".mp3"
          style="max-width: 300px"
        />
        <q-input
          ref="cancion.nombre"
          filled
          v-model="cancion.nombre"
          label="Nombre de la canción"
        />
        <q-select v-model="cancion.genero" :options="generos" label="Escoge genero" />
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
        user: {},
        cancion:{},
        generos: [
          'Blues', 'Country', 'Pop', 'Rock', 'Electrónica', 'Disco', 'Heavy Metal', 'Hip hop', 'Ranchera'
        ],
        fileUpload: (files) => {
          let moment = require('moment');
          let now = moment().format("YYYY-MM-DD");
          let fileName = files.name.replace(".mp3", "");
          let bodyFormdata = new FormData();
          bodyFormdata.append("file", files);
          bodyFormdata.set("nombre", "nombre_cancion");
          bodyFormdata.set("duracion", "50");
          bodyFormdata.set("cancion_path", fileName);
          bodyFormdata.set("userId", this.user.username);
          bodyFormdata.set("genero", "Flamenco");
          bodyFormdata.set("fechaRegistro", now);

          console.log(bodyFormdata);

          this.$axios.post(constants.REST_API_URL + "/subirCancion", bodyFormdata, {
            headers: {
              "content-type": "multipart/form-data"
            }
          })
            .then(response => {
              console.log(response);
              console.log("CANCION SUBIDA");
            })
            .catch(error => console.error(error))
        },
        getUserData: () => {
          let userId = localStorage.getItem("user");
          this.$axios.get(constants.REST_API_URL + "/getUsuarioById/" + userId)
            .then(response => {
              console.log(response);
              this.user = response.data;
            });
        }
      }
    },
    beforeMount() {
      this.getUserData();
    }

  }
</script>
