<template>
  <q-page class="flex column" style="background: linear-gradient(to bottom, #BA5370, #F4E2D8); background-attachment: fixed;">
    <div class="row justify-around" style="padding: 0 20px;padding-bottom:20px;">
      <div class="col-12" style="max-width: 1200px;">
        <div class="flex flex-center">
          <p class="heading">Buscador</p>
        </div>
        <div class="row justify-around" style="padding: 0 20px;padding-bottom:20px;">
          <div class="col-9">
            <div class="flex column justify-between">

              <div v-if="usuariosEncontrados === '' && canciones === ''">
                <h4 class="text-primary">No se han obtenido resultados</h4>
              </div>

              <!-- ---------------------------------------- -->
              <!-- CANCIONES -->
              <!-- ---------------------------------------- -->
              <div v-if="finderSong">
                <h4>{{canciones === "" ? 'No se han encontrado canciones' : 'Canciones'}}</h4>
                <div class="flex cancion" style="height: 90px;" v-for="cancion in canciones">
                  <a  class="playButton"  @click="toogleSong(cancion.id, songPlaying)">
                    <i class="material-icons underlineHover font-size55" :ref="cancion.id">play_arrow</i>
                  </a>
                  <div class="flex column justify-between">
                    <div class="cancion-info">

                      <div>
                        <div>
                          <a class="m-20 text-grey-9 underlineHover"  @click="$router.push('/user/perfil/' + cancion.autor.username)">{{cancion.autor.username}}</a>
                        </div>
                        <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 350px;">
                          <a class="m-20 underlineHover" style="font-size: 1.4em;" @click="$router.push('/user/cancion/' + cancion.id)" color="primary">{{cancion.nombre}}</a>
                        </div>
                      </div>
                    </div>

                    <div class="cancion-opciones">

                      <q-chip icon="music_note" size="10px" color="primary" text-color="white">{{cancion.genero.nombre}}</q-chip>

                      <q-btn-group outline>
                        <q-btn class="underlineHover" @click="addSongToPlaylistDialog = true; songSelected = cancion.id;">
                          <a>
                            <i class="material-icons underlineHover font-size25">
                              playlist_add
                            </i>
                          </a>
                        </q-btn>
                        <q-btn class="underlineHover" @click="openDialog(cancion.id)" >
                          <a class="underlineHover" >
                            <i class="material-icons underlineHover font-size25" >
                              insert_comment
                            </i>
                          </a>
                        </q-btn>
                        <q-btn class="underlineHover" @click="doLike(cancion.id)">
                          <a>
                            <i  class="material-icons likeHover font-size25">
                              favorite
                            </i>
                          </a>
                        </q-btn>
                      </q-btn-group>


                    </div>
                  </div>
                </div>
              </div>
              <!-- ---------------------------------------- -->

              <!-- ---------------------------------------- -->
              <!-- MODAL AÑADIR COMENTARIO -->
              <!-- ---------------------------------------- -->
              <q-dialog v-model="comentarioDialog" persistent>
                <q-card style="min-width: 400px">
                  <q-card-section>
                    <div class="text-h6">Escribe tu comentario</div>
                  </q-card-section>

                  <q-card-section>
                    <q-input dense v-model="comentario" autofocus @keyup.enter="doComment" />
                  </q-card-section>

                  <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn flat label="Añadir comentario" @click="doComment" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <!-- ---------------------------------------- -->

              <!-- ---------------------------------------- -->
              <!-- MODAL AÑADIR CANCION A PLAYLIST -->
              <!-- ---------------------------------------- -->
              <q-dialog v-model="addSongToPlaylistDialog" persistent>
                <q-card style="min-width: 400px;" >
                  <q-card-section>
                    <div class="text-h6" >Añadir canción a la playlist</div>
                  </q-card-section>

                  <q-card-section>

                    <q-select style="z-index: 50;" v-model="myPlaylistsModal" :options="myPlaylistsNombre" label="Escoge tu playlist" />

                  </q-card-section>

                  <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancelar" v-close-popup />
                    <q-btn flat label="Añadir" @click="addSongToPlaylist(myPlaylistsModal.id)" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <!-- ---------------------------------------- -->

              <!-- ---------------------------------------- -->
              <!-- INFO -->
              <!-- ---------------------------------------- -->
              <q-dialog v-model="seamless" seamless position="bottom">
                <q-card>

                  <q-card-section class="row items-center no-wrap">
                    <div class="text-weight-bold">{{infoText}}</div>
                    <q-btn flat round icon="close" v-close-popup />
                  </q-card-section>

                </q-card>
              </q-dialog>



              <!-- Usuarios-->
              <div v-if="finderUser">
                <h4>{{usuariosEncontrados === "" ? 'No se han encontrado usuarios' : 'Usuarios'}}</h4>

                <div v-for="seguidor in usuariosEncontrados" class="q-pa-md float-left " style="width: 200px;">

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

          <!-- ---------------------------------------- -->
          <!-- PLAYLISTS -->
          <!-- ---------------------------------------- -->
          <div class="col-3" >
            <template>
              <div style="margin-left: 20px; background: rgba(255,255,255,0.8); margin-top: 50px; max-width: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px;">
                <q-toolbar style="border-top-left-radius: 5px; border-top-right-radius: 5px;" class="bg-primary text-white shadow-2">
                  <q-toolbar-title class="text-align-center">Filtro</q-toolbar-title>
                </q-toolbar>

                <q-list bordered>
                  <q-item class="q-my-sm" clickable v-ripple @click="finderUser = true; finderSong = true;">
                    <q-item-section avatar>
                      <q-avatar style="background: rgba(0,0,0,0.2)" icon="search" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Todo</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="q-my-sm" clickable v-ripple @click="finderUser = true; finderSong = false;">
                    <q-item-section avatar>
                      <q-avatar style="background: rgba(0,0,0,0.2)" icon="person" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Usuario</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="q-my-sm" clickable v-ripple @click="finderUser = false; finderSong = true;">
                    <q-item-section avatar>
                      <q-avatar style="background: rgba(0,0,0,0.2)" icon="music_note" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Canción</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                </q-list>
              </div>
            </template>
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
  import audioPlayer from "../../statics/js/audioPlayer";

  export default {
    name: 'Buscador',
    data () {
      return {
        isSongPlaying: false,
        songVolume: constants.DEFAULT_SONG_VOLUME,
        canciones: "",
        usuariosEncontrados: "",
        user: {},
        color:"",
        comentario: "",
        comentarioDialog: false,
        actualSongId: "",
        // Activa / desactiva que estas buscando
        finderUser: true,
        finderSong: true,
        finderData: "",

        /* Reproductor cancion */
        songPlaying: "",
        actualIcon: "play_arrow",
        addSongToPlaylistDialog: false,
        myPlaylists: [],
        myPlaylistsModal: null,
        myPlaylistsNombre: [],
        songSelected: "",
        seamless: false,
        infoText: "",
        userLikedSongs: [],

        finder: async () => {
          console.log(1);
          console.log(this.finderData);
          await this.$axios.get(constants.REST_API_URL + "/getSongsThatContains/" + this.finderData)
            .then(response => {
              if (response.data === "" || response.data.length === 0) { return; }
              this.canciones = response.data;
            });
          await this.$axios.get(constants.REST_API_URL + "/getUserThatContains/" + this.finderData)
            .then(response => {
              if (response.data === "" || response.data.length === 0) { return; }
              this.usuariosEncontrados = response.data;
            });
        },
        checkData: () => {
          if (this.canciones === "" ) {
            this.finderSong = false;
          } else { this.finderSong = true; }
          if (this.usuariosEncontrados === "") {
            this.finderUser = false;
          } else { this.finderUser = true; }
        },
        /* Reproductor functions */
        toogleSong: async (cancionId, songPlaying) => {

          // Entra si ya hay una cancion reproduciendose y es diferente a la que este sonando actualmente
          if (this.isSongPlaying && songPlaying !== cancionId) {
            // Paramos la cancion anterior y cambiamos el icono
            let refs = this.$refs;
            let oldSong = refs[this.songPlaying];
            oldSong[0].innerHTML = 'play_arrow';
            this.isSongPlaying = false;
            await audioPlayer.setSongStatus(false);
            await audioPlayer.stop();
          }


          this.songPlaying = cancionId;
          let refs = this.$refs;
          let actualSong = refs[cancionId];
          actualSong[0].innerHTML = this.isSongPlaying ? 'play_arrow' : 'pause';

          this.isSongPlaying = await !audioPlayer.getSongStatus();
          await this.$tools.toogleSong(cancionId, this.isSongPlaying, this);
          if (!this.isSongPlaying) {
            await this.addOneRepro(cancionId);
          }

        },
        stopSong: () => this.$tools.stopSong(this.isSongPlaying),
        doLike: (cancionId) => {
          this.$tools.doLike(cancionId, this.user.username, this);
          this.seamless = true;
          this.infoText = "Te gusta una nueva canción.";
          setTimeout(() => this.seamless = false, 5000);
        },
        openDialog: (cancionId) => {
          this.comentarioDialog = true;
          this.comentario = "";
          this.actualSongId = cancionId;
        },
        doComment: () => {
          this.$tools.doComment(this.comentarioDialog, this.user.username, this.actualSongId, this.comentario, this);
          this.comentarioDialog = false;
          this.seamless = true;
          this.infoText = "¡Comentario añadido correctamente!";
          setTimeout(() => this.seamless = false, 5000);

        },
        addOneRepro: (cancionId) => {
          this.$axios.put(constants.REST_API_URL + "/addNewRepro/" + cancionId)
            .catch(error => console.error(error))
        },
        addSongToPlaylist: (playlistId) => {
          console.log(playlistId);
          this.$axios.put(constants.REST_API_URL + "/addSongToPlaylist/" + playlistId + "/" + this.songSelected)
            .then (() => {
              this.seamless = true;
              this.infoText = "¡Canción añadida correctamente!";
              setTimeout(() => this.seamless = false, 5000);
            })
            .catch(error => console.error(error));
        },
      }
    },
    async beforeMount(){
      this.canciones = "";
      this.finderUser = "";
      this.finderData = await this.$route.params.data;
      await this.finder();
      await this.checkData();
      this.color = this.$tools.randomColor();
      this.user = await this.$tools.getUserData(this.otherUserId, this);
      this.myPlaylists = await this.$tools.getPlaylistsFromUser(this.user.username, this);

      for (let item of this.myPlaylists) {
        this.myPlaylistsNombre.push({
          label: item.nombre,
          value: item.nombre,
          id: item.id
        });
      }

    },
    watch: {
      async '$route'(to, from) {
        this.canciones = "";
        this.finderUser = "";
        this.finderData = await to.params.data;
        await this.finder();
        await this.checkData();
        this.color = this.$tools.randomColor();
        this.user = await this.$tools.getUserData(this.otherUserId, this);
        this.myPlaylists = await this.$tools.getPlaylistsFromUser(this.user.username, this);

        for (let item of this.myPlaylists) {
          this.myPlaylistsNombre.push({
            label: item.nombre,
            value: item.nombre,
            id: item.id
          });
        }
      }
    }
  }

</script>
