<template>
  <q-page class="flex column">
    <div class="flex flex-center"><h1>Playlists de {{user.username}}</h1></div>

    <q-btn v-if="you === otherUserId" style="margin: 20px; width: 150px;" color="primary" @click="createPlaylistDialog = true" label="Crear playlist"></q-btn>

    <div class="col-12">



      <!-- Playlists -->
      <div v-for="playlist in myPlaylists" class="q-pa-md float-left " style="width: 300px;">
        <q-card @click="$router.push('/user/playlists/' + otherUserId + '/' + playlist.id)" class="my-card playlistHover container">

          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" >
            <div class="absolute-bottom text-subtitle2 text-center">
              {{playlist.nombre}}
            </div>

            <div class="overlay">
                <i class="icon material-icons underlineHover font-size55">remove_red_eye</i>
            </div>

          </q-img>

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
