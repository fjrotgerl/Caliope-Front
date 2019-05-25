<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout view="hHh lpR fFf">

    <q-header reveal bordered class="bg-primary text-accent">
      <q-toolbar>
        <q-toolbar-title id="home-publica">
          <p @click="$router.push('/user/home')">Inicio</p>
        </q-toolbar-title>

        <q-input style="margin-right: 5px;" dark dense standout v-model="text" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>

        <q-btn flat rounded color="accent" label="descubrir" @click="$router.push('/user/descubrir')"/>

        <q-btn-dropdown color="primary" label="*nombre_de_usuario*">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-btn flat rounded outline label="Perfil" @click="$router.push('/user/perfil')"/>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-btn flat rounded outline label="Opciones" @click="$router.push('/user/opciones')"/>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup>
              <q-item-section>
                <q-btn flat rounded outline label="Cerrar sesión" @click="$router.push('/')"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>


      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="isSongPlaying" reveal bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
  import audioPlayer from '../statics/js/audioPlayer'

  export default {
    data () {
      return {
        text: "",
        username: "",
        isSongPlaying: false,
        toogleFooter: (status) => {
          this.isSongPlaying = status;
        }
      }
    }
  }
</script>
