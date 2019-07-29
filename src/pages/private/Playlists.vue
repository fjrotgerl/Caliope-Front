<template>
  <q-page class="flex column bg-official">
    <div class="flex flex-center"><p class="heading">Playlists de {{user.username}}</p></div>

    <div class="full-width flex flex-center">
      <q-btn v-if="you === otherUserId" style="margin: 20px; width: 150px;" color="primary" @click="createPlaylistDialog = true" label="Crear playlist"></q-btn>
    </div>

    <div class="col-12 flex justify-center">

      <div v-if="!myPlaylists[0]">
        <h6>¡Ups! Este usuario aún tiene ninguna playlists creada.</h6>
      </div>

      <!-- Playlists -->
      <div v-for="playlist in myPlaylists" class="q-pa-md float-left " style="width: auto;">

        <q-card @click="$router.push('/user/playlists/' + playlist.dueño.username + '/' + playlist.id)" class="playlistHover container" style="width: max-content; min-width: 250px; background: rgba(255,255,255,0.2)">
          <img src="../../assets/playlist.png" style="height: 100px; width: 100px; margin: 0 auto; padding: 10px;">

          <q-card-section style="background-color: #1c1c1c; color: white; height: 50px;">
            <div class="text-align-center" style="padding-bottom: 30px;">{{playlist.nombre}}</div>
          </q-card-section>
          <div class="overlay">
            <i class="icon material-icons underlineHover font-size55">hearing</i>
          </div>
        </q-card>

      </div>

      <!--  CREATE PLAYLIST DIALOG  -->
      <q-dialog v-model="createPlaylistDialog" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Crear playlist</div>
          </q-card-section>

          <q-card-section>
            <q-input style="min-width: 500px;" dense label="Nombre " v-model="newPlaylistName" autofocus @keyup.enter="createPlaylist" />
          </q-card-section>

          <q-card-actions align="center">
            <q-btn flat label="Crear" color="primary" @click="createPlaylist" v-close-popup />
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </q-page>
</template>

<style>
</style>

<script>
  import constants from '../../statics/js/configuration'


  export default {
    name: 'Playlists',
    data() {
      return {
        /* DIALOGS VARIABLES */
        createPlaylistDialog: false,
        /* VARIABLES */
        myPlaylists: [],
        user: {},
        otherUserId: "",
        color:"",
        newPlaylistName: "",
        you: "",
        /* FUNCTIONS */
        createPlaylist: () => {
          this.$axios.post(constants.REST_API_URL + "/createPlaylist/" + this.newPlaylistName + "/" + this.otherUserId)
            .catch(error => console.error("createPlaylist, " + error));
        }
      }
    },
    async beforeMount(){
      this.otherUserId = this.$route.params.userId;
      this.user = await this.$tools.getUserData(this.otherUserId, this);
      this.myPlaylists = await this.$tools.getPlaylistsFromUser(this.user.username, this);
      this.you = window.localStorage.getItem("user");
      this.color = this.$tools.randomColor();
    },
    watch: {
      async '$route' (to, from) {
        this.otherUserId = to.params.userId;
        this.user = await this.$tools.getUserData(this.otherUserId, this);
        this.myPlaylists = await this.$tools.getPlaylistsFromUser(this.user.username, this);
        this.you = window.localStorage.getItem("user");

      }
    }
  }


</script>
