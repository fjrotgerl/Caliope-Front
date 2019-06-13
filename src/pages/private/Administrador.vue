<template>
  <q-page class="flex column">
    <h2 class="text-align-center">Panel de control de administrador</h2>
    <h3 class="text-align-center">{{user.username}}</h3>
    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-3"
            align="justify"
            narrow-indicator
          >
            <q-tab name="users" label="Usuarios" />
            <q-tab name="songs" label="Canciones" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="users">
              <div class="text-h6">Lista de usuarios</div>
              <div>
                <div class="row flex justify-between usuario" v-for="usuario in user">
                  <div class="column flex">
                    <span class="text-weight-bold">{{usuario.username}}</span>
                    <span>Seguidores: {{usuario.numeroSeguidores}}</span>
                    <span>Usuarios seguidos: {{usuario.numeroSeguidos}}</span>
                  </div>
                  <div class="column flex">
                    <q-button class="expulsar" style="margin-bottom: 10px;">EXPULSAR</q-button>
                    <q-button class="modificar">MODIFICAR</q-button>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="songs">
              <div class="text-h6">Lista de canciones</div>
              <div>
                <div class="row flex cancion" v-for="cancion in mySongs">
                  <a  class="playButton"  @click="toogleSong(cancion.id)">
                    <i class="material-icons underlineHover font-size55">
                      {{isSongPlaying ? 'pause' : 'play_arrow'}}
                    </i>
                  </a>
                  <div class="flex column justify-between">
                    <div class="cancion-info">
                      <a class="m-20 underlineHover"  @click="$router.push('/user/cancion/' + cancion.id)" color="primary">{{cancion.nombre}}</a>
                      <a class="m-20 underlineHover"  @click="$router.push('/user/perfil/' + cancion.autor.username)" color="primary">{{cancion.autor.username}}</a>
                    </div>
                    <div class="cancion-opciones">

                      <a class="underlineHover" @click="openDialog(cancion.id)">Comentar</a>

                      <a @click="doLike(cancion.id)">
                        <i class="material-icons likeHover font-size25">
                          favorite
                        </i>
                      </a>

                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
  import constants from '../../statics/js/configuration'
  export default {
    name: 'Administrador',
    data () {
      return {
        mySongs: {},
        user: {},
        tab: 'users',
        getUserSongs: async () => {
          await this.$axios.get(constants.REST_API_URL + "/getCanciones/")
            .then(response => {
              this.mySongs = response.data;
            })
            .catch(error => console.error(error))
        },
        getUserData: async () => {
        let userId = this.$route.params.userId;
        await this.$axios.get(constants.REST_API_URL + "/getUsuarios/")
          .then(response => {
            console.log(response);
            this.user = response.data;
          });
      }
      }
    },
  async beforeMount(){
    await this.getUserData();
    await this.getUserSongs();
  }
  }
</script>

<style scoped>

</style>
