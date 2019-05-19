<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout view="hHh lpR fFf">

    <q-header reveal bordered class="bg-primary text-accent">
      <q-toolbar>
        <q-toolbar-title>
          <p>PARTE PRIVADA</p>
        </q-toolbar-title>

        <q-btn flat rounded color="accent" label="Ir a la parte publica (solo dev)" @click="$router.push('/')"/>

        <q-input style="margin-right: 5px;" dark dense standout v-model="text" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>

        <q-btn flat rounded color="accent" label="Subir canción" @click="$router.push('/user/subircancion')"/>

        <q-btn flat rounded color="accent" label="Perfil" @click=""/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
  export default {
    data () {
      return {
        text: ""
      }
    }
  }
</script>
