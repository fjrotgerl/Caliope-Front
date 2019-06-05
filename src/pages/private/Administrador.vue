<template>
  <q-page class="flex column">
    <h2>Username</h2>
    <h3>Administrador</h3>
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
                    <span>{{usuario.username}}</span>
                    <span>{{usuario.numeroSeguidores}}</span>
                    <span>{{usuario.numeroSeguidos}}</span>
                  </div>
                  <div class="row flex">
                    <button class="expulsar">EXPULSAR</button>
                    <button class="modificar">MODIFICAR</button>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="songs">
              <div class="text-h6">Lista de canciones</div>
              <div>
                <div class="row flex cancion" v-for="cancion in mySongs">
                  <q-btn @click="toogleSong(cancion.id)" :icon="isSongPlaying ? 'pause' : 'play_arrow'" color="primary" style="margin-right: 20px;"></q-btn>
                  <div class="flex column justify-between" style="width:90%;">
                    <div class="flex row justify-around">
                      <span>{{cancion.nombre}}</span>
                      <span>{{cancion.autor.username}}</span>
                    </div>
                    <div>
                      <q-btn @click="doComment" label="Comentar" color="primary" style="margin-right: 20px;"></q-btn>
                      <q-btn @click="doLike(cancion.id)" icon="favorite" color="primary" style="margin-right: 20px;"></q-btn>
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
          await this.$axios.get(constants.REST_API_URL + "/getSongsFromUser/" + this.user.username)
            .then(response => {
              this.mySongs = response.data;
            })
            .catch(error => console.error(error))
        },
        getUserData: async () => {
        let userId = this.$route.params.userId;
        await this.$axios.get(constants.REST_API_URL + "/getUsuarioById/" + userId)
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
