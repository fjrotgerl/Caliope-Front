<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="flex column bg-official">
    <p class="heading">Seguidores de {{this.otherUserId}}</p>

    <div class="row justify-around" style="padding: 0 20px;padding-bottom:20px;">
      <div class="col-12" style="max-width: 1200px;">
        <div v-if="!seguidores[0]">
          <h6>¡Ups! Este usuario aún no tiene ningún seguidor.</h6>
        </div>
        <div v-else class="flex justify-center">
            <div v-for="seguidor in seguidores" class="q-pa-md float-left " style="width: 200px;">

              <q-card @click="$router.push('/user/perfil/' + seguidor.username)" class="my-card usuarioHover container" style="width: max-content; min-width: 180px; background: rgba(255,255,255,0.2)">
                <img src="../../assets/usuario_icono.png" style="height: 100px;width:auto;margin:0 auto;padding: 5px 0">

                <q-card-section style="background-color: #1c1c1c; color: white;">
                  <div class="text-h6 text-align-center">{{seguidor.username}}</div>
                  <div class="text-align-center">{{seguidor.nombre + " " + seguidor.apellidos}}</div>
                </q-card-section>
                <div class="overlay">
                  <i class="icon material-icons underlineHover font-size55">visibility</i>
                </div>
              </q-card>

            </div>
        </div>
      </div>
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
      color:"",
      otherUserId: "",

      getUserData: async () => {
        let userId = localStorage.getItem("user");
        await this.$axios.get(constants.REST_API_URL + "/getUsuarioById/" + userId)
          .then(response => {
            console.log(response);
            this.usuario = response.data;
          });
      },
      getSeguidores: async () => {
        console.log(this.otherUserId);
        await this.$axios.get(constants.REST_API_URL + "/getSeguidores/" + this.otherUserId)
          .then(response => {
            this.seguidores = response.data;
            console.log(this.seguidores)
          });
      }
    }
  },
  async beforeMount(){
    this.otherUserId = this.$route.params.userId;
    await this.getUserData();
    await this.getSeguidores();
    this.color = this.$tools.randomColor();
    this.color = this.$tools.randomColor();

  },
  watch: {
    async '$route' (to, from) {
      // react to route changes...
      this.otherUserId = to.params.userId;
      this.user = await this.$tools.getUserData(this.otherUserId, this);
      this.color = this.$tools.randomColor();
    }
  }

}
</script>
