<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout view="hHh lpR fFf">

    <q-header reveal bordered class="bg-primary text-accent">
      <q-toolbar>
        <q-toolbar-title>
          <img style="margin-top: 2px" src="/assets/logo.svg" @click="$router.push('/')">
        </q-toolbar-title>

        <q-btn flat rounded color="accent" label="Ir a la parte publica (solo dev)" @click="$router.push('/')"/>

        <q-btn flat rounded color="accent" label="Preguntas frecuentes" @click="$router.push('/hello/faq')"/>

        <q-btn flat rounded color="accent" label="Iniciar sesión" @click="$router.push('/hello/login')"/>

        <q-btn flat rounded color="accent" label="Registrarse" @click="$router.push('/hello/registro')"/>

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
      }
    }
  }
</script>
