<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          (logo)
          Calíope
        </q-toolbar-title>


        <a style="margin-right: 10px" href="/login">
          Iniciar sesión
        </a>
        <a href="">
          Registrarse
        </a>
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
