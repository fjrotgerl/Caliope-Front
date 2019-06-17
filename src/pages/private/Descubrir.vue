<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="flex column" :style="color">

    <div class="column justify-center" style="padding: 100px;padding-bottom:20px;">


      <q-tabs
        v-model="tab"
        dense
        class="text-black"
        style="background-color: gray"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="canciones" label="Canciones" />
        <q-tab name="playlists" label="Playlists" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="canciones">
          <div class="text-h6">Canciones</div>
          <div class="flex column justify-between">
            <div class="row flex cancion" v-for="cancion in canciones">
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

        <q-tab-panel name="playlists">
          <div class="text-h6">Playlists</div>
          <div v-for="playlist in playlists" class="q-pa-md float-left " style="width: auto;">

            <q-card @click="$router.push('/user/playlists/' + otherUserId + '/' + playlist.id)" class="my-card playlistHover container" style="width: max-content;min-width: 300px;">
              <img src="../../assets/playlist.png" style="height: 150px;width:auto;margin:0 auto;padding: 5px 0">

              <q-card-section style="background-color: cornflowerblue;">
                <div class="text-h5 text-align-center">{{playlist.nombre}}</div>
              </q-card-section>
              <div class="overlay">
                <i class="icon material-icons underlineHover font-size55">hearing</i>
              </div>
            </q-card>

          </div>
        </q-tab-panel>
      </q-tab-panels>


<!--        <div class="col-9">-->
<!--        <h2>Canciones del momento</h2>-->
<!--        <div class="flex column justify-between">-->
<!--          <div class="row flex cancion" v-for="cancion in canciones">-->
<!--            <a  class="playButton"  @click="toogleSong(cancion.id)">-->
<!--              <i class="material-icons underlineHover font-size55">-->
<!--                {{isSongPlaying ? 'pause' : 'play_arrow'}}-->
<!--              </i>-->
<!--            </a>-->
<!--            <div class="flex column justify-between">-->
<!--              <div class="cancion-info">-->
<!--                <a class="m-20 underlineHover"  @click="$router.push('/user/cancion/' + cancion.id)" color="primary">{{cancion.nombre}}</a>-->
<!--                <a class="m-20 underlineHover"  @click="$router.push('/user/perfil/' + cancion.autor.username)" color="primary">{{cancion.autor.username}}</a>-->
<!--              </div>-->
<!--              <div class="cancion-opciones">-->

<!--                <a class="underlineHover" @click="openDialog(cancion.id)">Comentar</a>-->

<!--                <a @click="doLike(cancion.id)">-->
<!--                  <i class="material-icons likeHover font-size25">-->
<!--                    favorite-->
<!--                  </i>-->
<!--                </a>-->

<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col-3" style="margin-top: 3%;">-->
<!--        <h2 class="menu-lateral">Playlists para ti</h2>-->
<!--        <div class="flex column menu-lateral">-->
<!--          <div class="flex flex-center row justify-around" v-for="playlist in playlists" style="margin-right: 5%;margin-bottom:5%;">-->
<!--            <q-btn icon="play_arrow" color="primary"></q-btn>-->
<!--            <div class="flex column">-->
<!--              <p>{{playlist.nombre}}</p>-->
<!--              <p>{{playlist.dueño.username}}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>

  </q-page>
</template>

<style>
</style>

<script>
  export default {
    name: 'Descubrir',
    data () {
      return {
        canciones: {},
        user:{},
        playlists:{},
        color:"",
        tab:'canciones',
        isSongPlaying: false,

        /* Funciones */
      }
    },
    async beforeMount(){
      this.user = await this.$tools.getUserData(localStorage.getItem("user"), this);
      this.canciones = await this.$tools.getRandomSongs(5, this);
      this.playlists = await this.$tools.getRandomPlaylists(5, this);
      this.color = this.$tools.randomColor();
    },
  }
</script>
