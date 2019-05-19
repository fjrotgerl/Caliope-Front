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
export default {
  name: 'Home',
  methods : {
    factoryFn (files) {
      let formData = new FormData();
      formData.append("file",files);
      return {
        url: "http://localhost:8080/subirCancion",
        method: 'POST',
        fieldValues: [{
          name: "file",
          value: formData
        }, {
          name:"username",
          value: "fjrotgerl"
        }],



      }

      /*console.log(files);
      await fetch("http://localhost:8080/subirCancion", {
        method: 'PUT',
        headers: "",
        body: {
          file: new byte[2],
          username: "fjrotgerl"
        }
      })
        .then(response => console.log(response))
        .catch(error => console.log(error) )*/
    }
  }
}
</script>
