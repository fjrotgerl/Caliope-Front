<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page class="flex column">


    <q-knob
      show-value
      class="text-white q-ma-md"
      v-model="songVolume"
      size="60px"
      @drag-value="test"
      :thickness="0.2"
      color="orange"
      center-color="black"
      track-color="transparent"
    ><q-icon name="volume_up" />
    </q-knob>


    <div class="row justify-around" style="padding: 0 20px;padding-bottom:20px;">
      <div class="col-9">
        <h2>Feed</h2>
        <div class="flex column justify-between">
          <div class="row flex cancion">
          <q-btn @click="toogleSong" :icon="isSongPlaying ? 'pause' : 'play_arrow'" color="primary" style="margin-right: 20px;"></q-btn>
            <q-btn @click="stopSong" icon="stop" color="primary" style="margin-right: 20px;"></q-btn>
          <div class="flex column justify-between" style="width:90%;">
            <div class="flex row justify-around">
              <span>Nombre Canción</span>
              <span>Nombre Autor</span>
            </div>
            <div class="flex row justify-around">
              <span>Comentar</span>
              <span>Me gusta</span>
              <span>...</span>
            </div>
          </div>
        </div>
          <div class="row flex cancion">
            <q-btn icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
            <div class="flex column justify-between" style="width:90%;">
              <div class="flex row justify-around">
                <span>Nombre Canción</span>
                <span>Nombre Autor</span>
              </div>
              <div class="flex row justify-around">
                <span>Comentar</span>
                <span>Me gusta</span>
                <span>...</span>
              </div>
            </div>
          </div>
          <div class="row flex cancion">
            <q-btn icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
            <div class="flex column justify-between" style="width:90%;">
              <div class="flex row justify-around">
                <span>Nombre Canción</span>
                <span>Nombre Autor</span>
              </div>
              <div class="flex row justify-around">
                <span>Comentar</span>
                <span>Me gusta</span>
                <span>...</span>
              </div>
            </div>
          </div>
          <div class="row flex cancion">
            <q-btn icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
            <div class="flex column justify-between" style="width:90%;">
              <div class="flex row justify-around">
                <span>Nombre Canción</span>
                <span>Nombre Autor</span>
              </div>
              <div class="flex row justify-around">
                <span>Comentar</span>
                <span>Me gusta</span>
                <span>...</span>
              </div>
            </div>
          </div>
          <div class="row flex cancion">
            <q-btn icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
            <div class="flex column justify-between" style="width:90%;">
              <div class="flex row justify-around">
                <span>Nombre Canción</span>
                <span>Nombre Autor</span>
              </div>
              <div class="flex row justify-around">
                <span>Comentar</span>
                <span>Me gusta</span>
                <span>...</span>
              </div>
            </div>
          </div>
          <div class="row flex cancion">
            <q-btn icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
            <div class="flex column justify-between" style="width:90%;">
              <div class="flex row justify-around">
                <span>Nombre Canción</span>
                <span>Nombre Autor</span>
              </div>
              <div class="flex row justify-around">
                <span>Comentar</span>
                <span>Me gusta</span>
                <span>...</span>
              </div>
            </div>
          </div>
          <div class="row flex cancion">
            <q-btn icon="play_arrow" color="primary" style="margin-right: 20px;"></q-btn>
            <div class="flex column justify-between" style="width:90%;">
              <div class="flex row justify-around">
                <span>Nombre Canción</span>
                <span>Nombre Autor</span>
              </div>
              <div class="flex row justify-around">
                <span>Comentar</span>
                <span>Me gusta</span>
                <span>...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <h2>Tus playlists</h2>
        <div class="flex row flex-lg-inline justify-between" style="width: 80%;margin: 0 auto;border: 1px solid;padding: 20px;">
          <div class="flex flex-center column" style="margin-right: 5%;margin-bottom:5%;">
            <p>Nombre</p>
            <q-btn icon="play_arrow" color="primary"></q-btn>
          </div>
          <div class="flex flex-center column" style="margin-right: 5%;margin-bottom:5%;">
            <p>Nombre</p>
            <q-btn icon="play_arrow" color="primary"></q-btn>
          </div>
          <div class="flex flex-center column" style="margin-right: 5%;margin-bottom:5%;">
            <p>Nombre</p>
            <q-btn icon="play_arrow" color="primary"></q-btn>
          </div>
          <div class="flex flex-center column" style="margin-right: 5%;margin-bottom:5%;">
            <p>Nombre</p>
            <q-btn icon="play_arrow" color="primary"></q-btn>
          </div>
        </div>
      </div>
    </div>

  </q-page>
</template>

<style>
</style>

<script>
  import audioPlayer from '../../statics/js/audioPlayer'
  import constants from '../../statics/js/configuration'

export default {
  name: 'Home',
  data () {
    return {
      isSongPlaying: false,
      songVolume: constants.DEFAULT_SONG_VOLUME,

      toogleSong: () => {
        audioPlayer.toogle();
        this.isSongPlaying = audioPlayer.getSongStatus();
      },
      stopSong: () => {
        audioPlayer.stop();
      },
      test: () => {
        if (this.songVolume < 10) {
          audioPlayer.changeVolume("0.0" + this.songVolume);
        } else {
          audioPlayer.changeVolume("0." + this.songVolume);
        }
      }
    }
  }
}
</script>
