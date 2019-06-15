<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="">
    <h3>Gente a la que sigues</h3>

    <div v-for="seguido in seguidos" class="q-pa-md float-left " style="width: 300px;">

      <q-card @click="$router.push('/user/perfil/' + seguido.username)" class="my-card usuarioHover container">
        <img src="../../assets/usuario_icono.png" style="height: 150px;width:auto;margin:0 auto;padding: 5px 0">

        <q-card-section style="background-color: mediumslateblue;">
          <div class="text-h5 text-align-center">{{seguido.username}}</div>
          <div class="text-h6 text-align-center">{{seguido.nombre + " " + seguido.apellidos}}</div>
        </q-card-section>
        <div class="overlay">
          <i class="icon material-icons underlineHover font-size55">visibility</i>
        </div>
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
