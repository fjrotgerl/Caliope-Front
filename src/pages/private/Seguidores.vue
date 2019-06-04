<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="">
    <h3>Tus seguidores</h3>

    <div v-for="seguidor in seguidores" class="q-pa-md float-left" style="width: 300px;">
      <q-card class="my-card">
        <q-item>
          <q-item-section avatar>
            <q-avatar icon="account_circle" >
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{seguidor.username}}</q-item-label>
            <q-item-label caption>{{seguidor.nombre + " " + seguidor.apellidos}}</q-item-label>
          </q-item-section>
        </q-item>

        <img src="https://cdn.quasar.dev/img/parallax2.jpg">
      </q-card>
    </div>



  </q-page>
</template>

<style>
</style>

<script>
  import constants from '../../statics/js/configuration'

export default {
  name: 'Seguidores',
  data () {
    return {
      seguidores: { },
      usuario: { },

      getUserData: async () => {
        let userId = localStorage.getItem("user");
        await this.$axios.get(constants.REST_API_URL + "/getUsuarioById/" + userId)
          .then(response => {
            console.log(response);
            this.usuario = response.data;
          });
      },
      getSeguidores: async () => {
        await this.$axios.get(constants.REST_API_URL + "/getSeguidores/" + this.usuario.username)
          .then(response => {
            this.seguidores = response.data;
            console.log(this.seguidores)
          });
      }
    }
  },
  async beforeMount(){
    await this.getUserData();
    await this.getSeguidores();

  },
}
</script>
