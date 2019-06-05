<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="">
    <h3>Gente a la que sigues</h3>

    <div v-for="seguido in seguidos" class="q-pa-md float-left" style="width: 300px;">
      <q-card class="my-card">
        <q-item>
          <q-item-section avatar>
            <q-avatar icon="account_circle" >
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label @click="$router.push('/user/perfil/' + seguido.username)">{{seguido.username}}</q-item-label>
            <q-item-label @click="$router.push('/user/perfil/' + seguido.username)" caption>{{seguido.nombre + " " + seguido.apellidos}}</q-item-label>
          </q-item-section>
        </q-item>

        <img @click="$router.push('/user/perfil/' + seguido.username)" src="https://cdn.quasar.dev/img/parallax2.jpg">
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
      seguidos: { },
      usuario: { },

      getUserData: async () => {
        let userId = localStorage.getItem("user");
        await this.$axios.get(constants.REST_API_URL + "/getUsuarioById/" + userId)
          .then(response => {
            this.usuario = response.data;
          });
      },
      getSeguidos: async () => {
        await this.$axios.get(constants.REST_API_URL + "/getSeguidos/" + this.usuario.username)
          .then(response => {
            this.seguidos = response.data;
            console.log()
          });
      }
    }
  },
  async beforeMount(){
    await this.getUserData();
    await this.getSeguidos();

  },
}
</script>
