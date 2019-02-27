<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal bordered class="bg-primary text-accent">
      <q-toolbar>
        <q-toolbar-title>
          <img style="margin-top: 2px" src="/assets/logo.svg" @click="$router.push('/')">
        </q-toolbar-title>


        <q-input style="margin-right: 5px;" dark dense standout v-model="text" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>

        <q-btn flat rounded color="accent" label="Iniciar sesión" @click="$router.push('/login')"/>

        <q-btn flat rounded color="accent" label="Registrarse" @click="$router.push('/registro')"/>
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
