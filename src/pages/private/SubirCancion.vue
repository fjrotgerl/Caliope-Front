<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="">

    <h2>Sube tu canción</h2>

    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-uploader
          :factory="factoryFn"
          label="Solo .mp3"
          accept=".mp3"
          style="max-width: 300px"
        />
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
  methods : {
    async factoryFn (files) {
      let file = new FormData();
      file.append("file",files);
      await this.$axios.post(constants.REST_API_URL + "/subirCancion", {
        file: file,
        username: "fjrotgerl"
      }, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
        .then(response => {
          console.log(response);
          console.log("CANCION SUBIDA");
        })
        .catch(error => console.error(error))

    }
  }
}
</script>
