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
          :ref="uploaderRef"
        />
        <q-input
          ref="cancion.nombre"
          filled
          v-model="cancion.nombre"
          label="Nombre de la canción"
        />
        <q-select v-model="cancion.genero" :options="generos" label="Escoge genero" />
        <q-btn @click="" label="Subir"></q-btn>
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
        cancion: {
          nombre: "",
          genero: "Seleccione un genero"
        },
        uploaderRef: "",
        generos: [],
        fileUpload: (files) => {
          let moment = require('moment');
          let now = moment().format("YYYY-MM-DD");
          let fileName = files.name.replace(".mp3", "");
          console.log(files);
          let bodyFormdata = new FormData();
          bodyFormdata.append("file", files);
          bodyFormdata.set("nombre", this.cancion.nombre);
          bodyFormdata.set("duracion", "50");
          bodyFormdata.set("cancion_path", fileName);
          bodyFormdata.set("userId", this.user.username);
          bodyFormdata.set("genero", this.cancion.genero);
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
              this.user = response.data;
            });
        },
        getGeneros: () => {
          this.$axios.get(constants.REST_API_URL + "/getGeneros")
            .then(response => {
              for (let item in response.data) {
                this.generos.push(response.data[item].nombre);
              }
            })
            .catch(error => console.error(error));
        }
      }
    },
    beforeMount() {
      this.getUserData();
      this.getGeneros();
    }

  }
</script>
