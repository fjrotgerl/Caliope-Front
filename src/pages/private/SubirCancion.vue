<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="column" style="background: linear-gradient(to bottom, #BA5370, #F4E2D8); background-attachment: fixed;">

    <p class="heading text-align-center">Sube tu canción</p>

    <div class="flex justify-center">
      <div class="flex column " style="width: 500px; padding:30px; border-radius: 8px; background: rgba(0, 0, 0, 0.2)">
        <q-uploader
          :factory="fileUpload"
          label="Solo .mp3"
          accept=".mp3"
          style="margin: 0 auto 25px auto; width: 100%;"
          ref="uploaderRef"
          bordered

        />
        <q-input
          ref="cancion.nombre"
          filled
          v-model="cancion.nombre"
          label="Nombre de la canción"
          maxlength="32"
          counter
          color="primary"
          bg-color="grey-1"
          style="margin: 10px 0 0 0"
        />
        <q-select style="margin: 10px 0 20px 0" v-model="cancion.genero" :options="generos" label="Escoge genero" color="primary" bg-color="grey-1" filled/>
        <q-btn @click="$refs.uploaderRef.upload()" label="Subir" color="primary"></q-btn>
      </div>
    </div>


    <!-- ---------------------------------------- -->
    <!-- INFO -->
    <!-- ---------------------------------------- -->
    <q-dialog v-model="seamless" seamless position="bottom">
      <q-card>

        <q-card-section class="row items-center no-wrap">
          <div class="text-weight-bold">{{infoText}}</div>
          <q-btn flat round icon="close" v-close-popup />
          <q-btn flat round icon="home" @click="$router.push('/user/home')" />
        </q-card-section>

      </q-card>
    </q-dialog>

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
        multiple: false,
        user: {},
        color:"",
        cancion: {
          nombre: "",
          genero: "Seleccione un genero"
        },
        infoText: "",
        uploaderRef: "",
        seamless: false,
        generos: [],
        fileUpload: (files) => {
          let moment = require('moment');
          let now = moment().format("YYYY-MM-DD");
          let fileName = files.name.replace(".mp3", "");
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
            .then(() => {
              this.seamless = true;
              this.infoText = "Canción subida correctamente";
              setTimeout(() => this.seamless = false, 5000);
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
      this.color = this.$tools.randomColor();
    }

  }
</script>
